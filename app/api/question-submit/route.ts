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
        console.error('[question-submit] Sheets:', e)
      }
    }

    let supabaseOk = false
    if (serviceRoleKey) {
      const admin = createClient(url, serviceRoleKey)
      const { error } = await admin.from('user_question_submissions').insert({
        user_id: user.id,
        content,
        status: 'pending',
      })
      supabaseOk = !error
      if (error) console.error('[question-submit] Supabase:', error)
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
      if (error) console.error('[question-submit] Supabase:', error)
    }

    if (sheetsOk || supabaseOk) {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json(
      { error: '제출에 실패했습니다. 시트 공유(편집자)와 Supabase 마이그레이션을 확인해주세요.' },
      { status: 500 }
    )
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    console.error('[question-submit]', err)
    const msg = process.env.NODE_ENV === 'development' ? err.message : '제출에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
