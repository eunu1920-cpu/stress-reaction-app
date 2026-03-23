/**
 * Export pattern-lens questions to markdown files
 * Run: node scripts/export-pattern-lens-to-md.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const root = join(__dirname, '..')

// Dynamic import of TS - we need to use a different approach
// Use eval to get the exported arrays from the compiled/bundled context
// Simpler: parse the TS file as text and extract the structure
// Or use ts-node/tsx - but might not be installed

// Alternative: use require with tsconfig paths - Next.js projects typically have .next
// Let's try importing the source - we need to handle TypeScript
const tsconfig = JSON.parse(readFileSync(join(root, 'tsconfig.json'), 'utf-8'))
const contentPaths = [
  join(root, 'content', 'pattern-lens', 'stress.ts'),
  join(root, 'content', 'pattern-lens', 'relation.ts'),
  join(root, 'content', 'pattern-lens', 'self.ts'),
]

function extractQuestionsFromTs(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  // Extract the array - find the export const X: PatternLensQuestion[] = [
  const match = content.match(/export const \w+Questions: PatternLensQuestion\[\] = (\[[\s\S]*\]);?\s*$/)
  if (!match) return null

  const arrayStr = match[1]
  // Use a safe eval - we're parsing our own source
  // Replace single quotes with double quotes for JSON.parse compatibility
  // Actually the TS format uses single quotes for strings - we need to handle that
  // JSON.parse won't work with 'id': 'stress_001',
  // Let's use Function constructor to evaluate - it's our own source
  try {
    const fn = new Function(`return ${arrayStr}`)
    return fn()
  } catch (e) {
    console.error('Parse error:', e.message)
    return null
  }
}

function questionToMarkdown(q, category) {
  const lines = []
  lines.push(`## ${q.id}`)
  lines.push('')
  lines.push(`**상황:** ${q.scenario}`)
  lines.push('')
  lines.push(`**질문:** ${q.prompt}`)
  lines.push('')
  lines.push('### 보기')
  lines.push('')
  for (const opt of q.options) {
    lines.push(`- **${opt.id}** (${opt.patternCode} ${opt.interpretation.title}) ${opt.label}`)
  }
  lines.push('')
  lines.push('### 해석')
  lines.push('')
  for (const opt of q.options) {
    lines.push(`#### ${opt.id}. ${opt.interpretation.title} (${opt.patternCode})`)
    lines.push('')
    lines.push(`- **해석:** ${opt.interpretation.summary}`)
    if (opt.interpretation.insight) {
      lines.push(`- **통찰:** ${opt.interpretation.insight}`)
    }
    if (opt.interpretation.reflectionQuestion) {
      lines.push(`- **질문:** ${opt.interpretation.reflectionQuestion}`)
    }
    if (opt.interpretation.points?.length) {
      lines.push(`- **포인트:** ${opt.interpretation.points.join(', ')}`)
    }
    lines.push('')
  }
  lines.push('---')
  lines.push('')
  return lines.join('\n')
}

function exportCategory(name, filePath, outputPath) {
  const questions = extractQuestionsFromTs(filePath)
  if (!questions || !Array.isArray(questions)) {
    console.error(`Failed to parse ${name}`)
    return
  }

  const lines = []
  lines.push(`# ${name === 'stress' ? '스트레스' : name === 'relation' ? '인간관계' : '셀프'} 패턴 질문풀`)
  lines.push('')
  lines.push(`총 ${questions.length}개 문항`)
  lines.push('')
  lines.push('---')
  lines.push('')

  for (const q of questions) {
    lines.push(questionToMarkdown(q, name))
  }

  const md = lines.join('\n')
  writeFileSync(outputPath, md, 'utf-8')
  console.log(`Exported ${questions.length} questions to ${outputPath}`)
}

const outputDir = join(root, 'content', 'pattern-lens', 'exports')
try {
  require('fs').mkdirSync(outputDir, { recursive: true })
} catch (_) {}

exportCategory('stress', contentPaths[0], join(outputDir, 'stress.md'))
exportCategory('relation', contentPaths[1], join(outputDir, 'relation.md'))
exportCategory('self', contentPaths[2], join(outputDir, 'self.md'))

console.log('Done.')
