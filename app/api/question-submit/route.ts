import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const sheetsCreds = process.env.GOOGLE_SHEETS_CREDENTIALS
const sheetsId = process.env.GOOGLE_SHEETS_ID

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace(/^Bearer\s+/i, '')
    if (!token) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    const body = await request.json()
    const content = typeof body?.content === 'string' ? body.content.trim() : ''
    if (!content) {
      return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 400 })
    }

    const supabase = createClient(url, anonKey)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    const dateStr = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    const submitter = (user.email ?? user.id).toString()

    let sheetsOk = false
    if (sheetsCreds && sheetsId) {
      try {
        const creds = JSON.parse(sheetsCreds) as { client_email: string; private_key: string }
        const auth = new google.auth.GoogleAuth({
          credentials: creds,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })
        const sheets = google.sheets({ version: 'v4', auth })
        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetsId,
          range: '시트1!A:C',
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[dateStr, content, submitter]] },
        })
        sheetsOk = true
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e))
        console.error('[question-submit] Sheets:', err.message, err)
      }
    } else {
      console.warn('[question-submit] Sheets 미설정: GOOGLE_SHEETS_CREDENTIALS, GOOGLE_SHEETS_ID 필요')
    }

    let supabaseOk = false
    let supabaseErr: unknown = null
    if (serviceRoleKey) {
      const admin = createClient(url, serviceRoleKey)
      const { error } = await admin.from('user_question_submissions').insert({
        user_id: user.id,
        content,
        status: 'pending',
      })
      supabaseOk = !error
      supabaseErr = error
      if (error) console.error('[question-submit] Supabase(service):', error?.message ?? error?.code ?? error)
    } else {
      const clientWithAuth = createClient(url, anonKey, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      })
      const { error } = await clientWithAuth.from('user_question_submissions').insert({
        user_id: user.id,
        content,
        status: 'pending',
      })
      supabaseOk = !error
      supabaseErr = error
      if (error) console.error('[question-submit] Supabase(anon):', error?.message ?? error?.code ?? error)
    }

    if (sheetsOk || supabaseOk) {
      return NextResponse.json({ ok: true })
    }

    const errParts: string[] = []
    if (!sheetsCreds || !sheetsId) errParts.push('Google 시트 환경변수 미설정')
    else errParts.push('Google 시트(편집자 공유 확인)')
    if (supabaseErr) errParts.push(`Supabase: ${(supabaseErr as { message?: string })?.message ?? '마이그레이션 011 확인'}`)
    else errParts.push('Supabase 마이그레이션 011 확인')
    return NextResponse.json(
      { error: `제출에 실패했습니다. ${errParts.join('. ')}` },
      { status: 500 }
    )
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    console.error('[question-submit]', err)
    const msg = process.env.NODE_ENV === 'development' ? err.message : '제출에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
