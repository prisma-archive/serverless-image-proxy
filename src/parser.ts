interface Resize {
  width: number | undefined
  height: number | undefined
  force: boolean
}

interface Crop {
  x: number
  y: number
  width: number
  height: number
}

interface Config {
  resize: Resize | undefined
  crop: Crop | undefined
}

export interface Params {
  projectId: string
  fileSecret: string
  resize: string | undefined
  crop: string | undefined
}

const resizePattern = /^(\d*)x(\d*)(!?)$/
const cropPattern = /^(\d*)x(\d*):(\d*)x(\d*)$/
const namePattern = /^(\w+)(.(png|jpg|jpeg|svg|gif|bmp|webp))?$/

// valid paths:
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200/20x20
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200/20x20/Graphcool.jpg
export function parseParams(path: string): [(Error | null), (Params | null)] {
  // also trim trailing slash
  const [, , ...parts] = path.replace(/\/$/, '').split('/')

  if (parts.length < 2) {
    throw new Error(`Invalid path: ${path}`)
  }

  const projectId = parts[0]
  const fileSecret = parts[1]
  let resize: string | undefined = undefined
  let crop: string | undefined = undefined

  if (parts.length >= 3) {
    if (parts[2].match(resizePattern)) {
      resize = parts[2]
    } else if (parts[2].match(cropPattern)) {
      crop = parts[2]
    } else if (!parts[2].match(namePattern)) {
      return [
        new Error(`Invalid resize, crop pattern or name of image: ${parts[2]}`),
        null,
      ]
    }
  }

  if (parts.length >= 4) {
    if (parts[3].match(resizePattern)) {
      resize = parts[3]
    } else if (parts[3].match(cropPattern)) {
      crop = parts[3]
    } else if (!parts[3].match(namePattern)) {
      return [
        new Error(`Invalid resize, crop pattern or name of image: ${parts[3]}`),
        null,
      ]
    }
  }

  if (parts.length >= 5) {
    if (!parts[4].match(namePattern)) {
      return [new Error(`Invalid name of image: ${parts[4]}`), null]
    }
  }

  return [null, { projectId, fileSecret, resize, crop }]
}

interface ConfigProps {
  resize?: string
  crop?: string
}

export function getConfig(props: ConfigProps): Config {
  return {
    resize: props.resize ? extractResize(props.resize) : undefined,
    crop: props.crop ? extractCrop(props.crop) : undefined,
  }
}

function extractResize(str: string): Resize {
  const [, widthStr, heightStr, forceStr] = str.match(resizePattern)!

  if (parseInt(widthStr, 10) <= 0 || parseInt(heightStr, 10) <= 0) {
    throw new Error(`Width or height must be positive`)
  }

  const width = parseInt(widthStr, 10) || undefined
  const height = parseInt(heightStr, 10) || undefined

  if (width === undefined && height === undefined) {
    throw new Error(`At least width or height must be provided`)
  }

  if ((width && width > 10000) || (height && height > 10000)) {
    throw new Error(
      `Limit exceeded. Width (${width}) or height (${height}) must not be bigger than 10000`,
    )
  }

  const force = forceStr === '!'

  return { width, height, force }
}

function extractCrop(str: string): Crop {
  const [, xStr, yStr, widthStr, heightStr] = str.match(cropPattern)!

  const x = parseInt(xStr, 10) || 0
  const y = parseInt(yStr, 10) || 0
  const width = parseInt(widthStr, 10) || 0
  const height = parseInt(heightStr, 10) || 0

  // TODO test for errors

  return { width, height, x, y }
}
