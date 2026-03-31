'use client'

import { forwardRef } from 'react'
import {
  SHARE_CARD_HEIGHT,
  SHARE_CARD_WIDTH,
  type MyPickShareCardContent,
} from '@/lib/mypick/share-cards'

type Props = MyPickShareCardContent

const fontStack =
  'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'

const COL = {
  outerBorder: '#CFC2FF',
  innerBorder: '#8E7CFF',
  innerBg: 'rgba(255,255,255,0.55)',
} as const

/** 바깥·안쪽 이중 보라 액자 + html-to-image 안정용 px 타이포 */
export const MyPickShareCardCanvas = forwardRef<HTMLDivElement, Props>(
  function MyPickShareCardCanvas({ patternLabel, line1, line2 }, ref) {
    return (
      <div
        ref={ref}
        lang="ko"
        className="box-border overflow-hidden bg-gradient-to-b from-[#F5F3FA] to-white text-center"
        style={{
          width: SHARE_CARD_WIDTH,
          height: SHARE_CARD_HEIGHT,
          fontFamily: fontStack,
          borderRadius: 28,
          border: `3px solid ${COL.outerBorder}`,
          padding: 28,
          wordBreak: 'keep-all',
          lineBreak: 'strict',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            borderRadius: 20,
            border: `2px solid ${COL.innerBorder}`,
            backgroundColor: COL.innerBg,
            paddingTop: 44,
            paddingBottom: 38,
            paddingLeft: 38,
            paddingRight: 38,
          }}
        >
          <header style={{ flexShrink: 0, width: '100%' }}>
            <p
              style={{
                margin: 0,
                fontSize: 32,
                lineHeight: '44px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#8E7CFF',
              }}
            >
              MyView · MyPick
            </p>
            <p
              style={{
                margin: 0,
                marginTop: 22,
                fontSize: 40,
                lineHeight: '54px',
                fontWeight: 600,
                color: '#444444',
              }}
            >
              오늘의 나
            </p>
          </header>

          <div
            style={{
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: 0,
              paddingTop: 28,
              paddingBottom: 28,
              gap: 36,
            }}
          >
            <p
              style={{
                margin: 0,
                width: '100%',
                maxWidth: '100%',
                fontSize: 50,
                lineHeight: '70px',
                fontWeight: 700,
                color: '#111111',
              }}
            >
              {patternLabel}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 26,
                width: '100%',
              }}
            >
              <p
                style={{
                  margin: 0,
                  width: '100%',
                  fontSize: 54,
                  lineHeight: '80px',
                  fontWeight: 600,
                  color: '#333333',
                }}
              >
                {line1}
              </p>
              <p
                style={{
                  margin: 0,
                  width: '100%',
                  fontSize: 54,
                  lineHeight: '80px',
                  fontWeight: 600,
                  color: '#333333',
                }}
              >
                {line2}
              </p>
            </div>
          </div>

          <footer style={{ flexShrink: 0, width: '100%' }}>
            <p
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: '38px',
                fontWeight: 500,
                color: '#888888',
              }}
            >
              MyView
            </p>
          </footer>
        </div>
      </div>
    )
  },
)

MyPickShareCardCanvas.displayName = 'MyPickShareCardCanvas'
