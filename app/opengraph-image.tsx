import { ImageResponse } from 'next/og'

/** 공유·검색 미리보기: 탭 아이콘과 같은 “밖은 임팩트” 톤 */
export const alt = 'MyView'
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
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(155deg, #121014 0%, #1e1c26 45%, #16141a 100%)',
          paddingLeft: 72,
          paddingRight: 72,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <div
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              background: 'radial-gradient(circle at 35% 30%, #3d3a4a 0%, #222028 55%, #0e0d12 100%)',
              border: '4px solid rgba(142, 124, 255, 0.42)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(142, 124, 255, 0.22)',
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: '#e8e4ff',
                fontFamily:
                  'ui-sans-serif, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
              }}
            >
              M
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              maxWidth: 900,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                fontFamily:
                  'ui-sans-serif, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
              }}
            >
              MyView
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#b8a8ff',
                lineHeight: 1.35,
                fontFamily:
                  'ui-sans-serif, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
              }}
            >
              지금 내 상태, 빠르게 확인해보기
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
