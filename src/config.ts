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

export function parseConfig(parts: string[]): ThumborConfig {
  let [cropStr, resizeStr] = parts
  if (!resizeStr) {
    resizeStr = cropStr
    cropStr = undefined
***REMOVED***

***REMOVED***
    resize: extractResize(resizeStr),
    crop: cropStr ? extractCrop(cropStr) : null,
***REMOVED***
}

function extractResize(str: string): Resize {
  const [, widthStr, heightStr, forceStr] = str.match(/^(\d*)x(\d*)(!?)$/)

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
  const [, xStr, yStr, widthStr, heightStr] = str.match(/^(\d*)x(\d*):(\d*)x(\d*)$/)

  const x = parseInt(xStr, 10) || 0
  const y = parseInt(yStr, 10) || 0
  const width = parseInt(widthStr, 10) || 0
  const height = parseInt(heightStr, 10) || 0

  // TODO test for errors

***REMOVED***width, height, x, y}
}
