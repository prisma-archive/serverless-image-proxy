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

interface ThumborConfig {
  resize: Resize | undefined
  crop: Crop | undefined
}

interface Params {
  projectId: string
  fileSecret: string
  resize: string | undefined
  crop: string | undefined
}

// valid paths:
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200/20x20
export function parseParams(path: string): Params {
  const [,,...parts] = path.split('/')

  if (parts.length < 2) {
    throw new Error(`Invalid path: ${path}`)
  }

  const projectId = parts[0]
  const fileSecret = parts[1]
  let resize: (string | undefined) = undefined
  let crop: (string | undefined) = undefined

  if (parts.length === 3) {
    resize = parts[2]
  } else if (parts.length === 4) {
    crop = parts[2]
    resize = parts[3]
  }

  return { projectId, fileSecret, resize, crop }
}

interface ConfigProps {
  resize?: string
  crop?: string
}

export function getConfig(props: ConfigProps): ThumborConfig {
  return {
    resize: props.resize ? extractResize(props.resize) : undefined,
    crop: props.crop ? extractCrop(props.crop) : undefined,
  }
}

function extractResize(str: string): Resize {
  const matches = str.match(/^(\d*)x(\d*)(!?)$/)!
  if (!matches) {
    throw new Error(`Invalid resize string: ${str}`)
  }

  const [, widthStr, heightStr, forceStr] = matches

  const width = parseInt(widthStr, 10) || undefined
  const height = parseInt(heightStr, 10) || undefined
  const force = forceStr === '!'

  if (width === undefined && height === undefined) {
    throw new Error(`At least width or height must be not undefined`)
  }

  if (width && width < 0 || height && height < 0) {
    throw new Error(`Width (${width}) or height (${height}) is < 0`)
  }

  if (width && width > 10000 || height && height > 10000) {
    throw new Error(`Width (${width}) or height (${height}) is > 10000`)
  }

  return {width, height, force}
}

function extractCrop(str: string): Crop {
  const [, xStr, yStr, widthStr, heightStr] = str.match(/^(\d*)x(\d*):(\d*)x(\d*)$/)!

  const x = parseInt(xStr, 10) || 0
  const y = parseInt(yStr, 10) || 0
  const width = parseInt(widthStr, 10) || 0
  const height = parseInt(heightStr, 10) || 0

  // TODO test for errors

  return {width, height, x, y}
}
