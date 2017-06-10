interface Resize {
  width: number
  height: number
  force: boolean
}

interface Crop {
  x: number
  y: number
  width: number
  height: number
}

interface ThumborConfig {
  resize: Resize
  crop: Crop | null
}

interface Params {
  projectId: string
  fileSecret: string
  resize: string | null
  crop: string | null
}

// valid paths:
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200
// /v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200/20x20
export function parseParams(path: string): Params {
  const [,,...parts] = path.split('/')

  if (parts.length < 2) {
    throw new Error(`Invalid path: ${path}`)
***REMOVED***

  const projectId = parts[0]
  const fileSecret = parts[1]
  let resize: (string | null) = null
  let crop: (string | null) = null

  if (parts.length === 3) {
    resize = parts[2]
***REMOVED*** else if (parts.length === 4) {
    crop = parts[2]
    resize = parts[3]
***REMOVED***

***REMOVED*** projectId, fileSecret, resize, crop }
}

export function getConfig(resize: string, crop: string | null): ThumborConfig {
  if (crop) {
***REMOVED***
      resize: extractResize(resize),
      crop: extractCrop(crop),
***REMOVED***
***REMOVED*** else {
***REMOVED***
      resize: extractResize(resize),
      crop: null,
***REMOVED***
***REMOVED***
}

function extractResize(str: string): Resize {
  const [, widthStr, heightStr, forceStr] = str.match(/^(\d*)x(\d*)(!?)$/)!

  const width = parseInt(widthStr, 10) || 0
  const height = parseInt(heightStr, 10) || 0
  const force = forceStr === '!'

  if (width === 0 && height === 0) {
    throw new Error(`At least width or height must be != 0`)
***REMOVED***

  if (width < 0 || height < 0) {
    throw new Error(`Width (${width***REMOVED*** or height (${height***REMOVED*** is < 0`)
***REMOVED***

  if (width > 10000 || height > 10000) {
    throw new Error(`Width (${width***REMOVED*** or height (${height***REMOVED*** is > 10000`)
***REMOVED***

***REMOVED***width, height, force}
}

function extractCrop(str: string): Crop {
  const [, xStr, yStr, widthStr, heightStr] = str.match(/^(\d*)x(\d*):(\d*)x(\d*)$/)!

  const x = parseInt(xStr, 10) || 0
  const y = parseInt(yStr, 10) || 0
  const width = parseInt(widthStr, 10) || 0
  const height = parseInt(heightStr, 10) || 0

  // TODO test for errors

***REMOVED***width, height, x, y}
}
