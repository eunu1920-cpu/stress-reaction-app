/**
 * Import relation.md (refactored) back into relation.ts
 * Run: node scripts/import-relation-md-to-ts.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const mdPath = join(root, 'content', 'pattern-lens', 'exports', 'relation.md')
const tsPath = join(root, 'content', 'pattern-lens', 'relation.ts')

function parseRelationMd(content) {
  const flatOptions = []
  const blocks = content.split(/\n## relation_/).filter(Boolean)

  for (const block of blocks) {
    const 해석Match = block.match(/### 해석\n\n([\s\S]*?)(?=\n---|\n## |$)/)
    const 해석Text = 해석Match ? 해석Match[1] : ''
    const 해석Sections = 해석Text.split(/\n#### [A-D]\. /).filter(Boolean)

    for (const h of 해석Sections) {
      const summaryM = h.match(/- \*\*해석:\*\*\s*(.+?)(?=\n- \*\*|\n\n|$)/s)
      const insightM = h.match(/- \*\*통찰:\*\*\s*(.+?)(?=\n- \*\*|\n\n|$)/s)
      const questionM = h.match(/- \*\*질문:\*\*\s*(.+?)(?=\n- \*\*|\n\n|$)/s)
      const pointsM = h.match(/- \*\*포인트:\*\*\s*(.+?)(?=\n\n|$)/s)

      flatOptions.push({
        summary: summaryM ? summaryM[1].trim() : '',
        insight: insightM ? insightM[1].trim() : '',
        reflectionQuestion: questionM ? questionM[1].trim() : '',
        points: pointsM
          ? pointsM[1]
              .split(',')
              .map((p) => p.trim())
              .filter(Boolean)
          : [],
      })
    }
  }
  return flatOptions
}

function escapeTs(str) {
  if (!str) return "''"
  return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'"
}

function main() {
  const mdContent = readFileSync(mdPath, 'utf-8')
  let tsContent = readFileSync(tsPath, 'utf-8')

  const flatOptions = parseRelationMd(mdContent)
  console.log(`Parsed ${flatOptions.length} interpretation blocks from relation.md`)

  const interpretationRegex = /interpretation: \{\s*title: '([^']+)',\s*summary:\s*\n\s*'([^']*(?:\\'[^']*)*)'\s*,\s*body: ''\s*,\s*insight:\s*\n\s*'([^']*(?:\\'[^']*)*)'\s*,\s*reflectionQuestion:\s*\n\s*'([^']*(?:\\'[^']*)*)'\s*,\s*points: (\[[^\]]+\])/g

  let idx = 0
  tsContent = tsContent.replace(interpretationRegex, (full, title) => {
    const opt = flatOptions[idx++]
    if (!opt || !opt.summary) return full

    return `interpretation: {\n          title: '${title}',\n          summary:\n            ${escapeTs(opt.summary)},\n          body: '',\n          insight:\n            ${escapeTs(opt.insight)},\n          reflectionQuestion:\n            ${escapeTs(opt.reflectionQuestion)},\n          points: ['${opt.points.join("', '")}']`
  })

  writeFileSync(tsPath, tsContent, 'utf-8')
  console.log(`Updated ${idx} options in relation.ts`)
}

main()
