import { Jimp } from 'jimp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { writeFile } from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const input = join(__dirname, '..', 'public', 'images', 'hero-jar.jpg')
const output = join(__dirname, '..', 'public', 'images', 'hero-jar.png')

async function removeBg() {
  const image = await Jimp.read(input)
  const { width, height } = image.bitmap

  const bgColor = { r: 245, g: 232, b: 220 }
  const threshold = 45

  image.scan(0, 0, width, height, (x, y, idx) => {
    const r = image.bitmap.data[idx]
    const g = image.bitmap.data[idx + 1]
    const b = image.bitmap.data[idx + 2]
    const a = image.bitmap.data[idx + 3]

    if (a === 0) return

    const dr = r - bgColor.r
    const dg = g - bgColor.g
    const db = b - bgColor.b
    const dist = Math.sqrt(dr * dr + dg * dg + db * db)

    if (dist < threshold) {
      image.bitmap.data[idx + 3] = 0
    }
  })

  const buffer = await image.getBuffer('image/png')
  await writeFile(output, buffer)
  console.log('Background removed, saved to', output)
}

removeBg().catch(console.error)
