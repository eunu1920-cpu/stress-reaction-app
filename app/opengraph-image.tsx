import { ImageResponse } from 'next/og'

const fontStack =
  'ui-sans-serif, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif'

/** 공유 미리보기 이미지 — M 마크 + ‘언제 쓰면 좋은지’ 문구 */
export const alt =
  '결정이 막히는 순간, 지금 할까 말까 — 당신은 보통 어디로 움직이나요'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'linear-gradient(155deg, #0a090c 0%, #16141c 42%, #121016 100%)',
          paddingLeft: 64,
          paddingRight: 64,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 40,
            width: '100%',
          }}
        >
          <div
            style={{
              width: 128,
              height: 128,
              flexShrink: 0,
              borderRadius: 64,
              background: 'radial-gradient(circle at 35% 30%, #3d3a4a 0%, #222028 55%, #0e0d12 100%)',
              border: '4px solid rgba(200, 190, 255, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 48px rgba(142, 124, 255, 0.35)',
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: '#f5f2ff',
                fontFamily: fontStack,
              }}
            >
              M
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                fontFamily: fontStack,
                textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              }}
            >
              결정이 막히는 순간
            </div>
            <div style={{ height: 28 }} />
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: '#f0ebff',
                lineHeight: 1.2,
                fontFamily: fontStack,
                textShadow: '0 1px 16px rgba(0,0,0,0.35)',
              }}
            >
              지금 할까
            </div>
            <div style={{ height: 6 }} />
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: '#f0ebff',
                lineHeight: 1.2,
                fontFamily: fontStack,
                textShadow: '0 1px 16px rgba(0,0,0,0.35)',
              }}
            >
              말까
            </div>
            <div
              style={{
                marginTop: 24,
                marginBottom: 24,
                height: 2,
                width: '100%',
                maxWidth: 420,
                background: 'linear-gradient(90deg, rgba(200,190,255,0.5) 0%, rgba(200,190,255,0.12) 100%)',
                borderRadius: 1,
              }}
            />
            <div
              style={{
                fontSize: 38,
                fontWeight: 600,
                color: '#d8ccff',
                lineHeight: 1.35,
                fontFamily: fontStack,
                textShadow: '0 1px 12px rgba(0,0,0,0.4)',
              }}
            >
              당신은 보통 어디로 움직이나요
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
