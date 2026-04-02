import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcDir =
  process.env.CAROUSEL_SRC ||
  join(
    'C:',
    'Users',
    'VIEW LIFE',
    '.cursor',
    'projects',
    'c-Users-VIEW-LIFE-Downloads-b-e1xglaHTzKK-1771773822210',
    'assets',
  )
const dstDir = join(root, 'public', 'images', 'home-carousel')

mkdirSync(dstDir, { recursive: true })
const isCarouselImage = (f) =>
  f.startsWith('home-carousel-') && /\.(png|jpe?g)$/i.test(f)
const files = readdirSync(srcDir).filter(isCarouselImage)
if (files.length === 0) {
  console.error('No home-carousel-*.(png|jpg|jpeg) in', srcDir)
  process.exit(1)
}
for (const f of files) {
  copyFileSync(join(srcDir, f), join(dstDir, f))
  console.log('copied', f)
}
