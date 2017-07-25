import test from 'ava'
import { getConfig, parseParams } from './parser'

test('resize: normal', t => {
  t.deepEqual(getConfig({ resize: '500x300' }), {
    resize: {
      width: 500,
      height: 300,
      force: false,
    },
    crop: undefined,
  })
})

test('resize: height - keep ratio', t => {
  t.deepEqual(getConfig({ resize: 'x300' }), {
    resize: {
      width: undefined,
      height: 300,
      force: false,
    },
    crop: undefined,
  })
})

test('resize: height - keep ratio', t => {
  t.deepEqual(getConfig({ resize: '500x' }), {
    resize: {
      width: 500,
      height: undefined,
      force: false,
    },
    crop: undefined,
  })
})

test('resize: force', t => {
  t.deepEqual(getConfig({ resize: '500x300!' }), {
    resize: {
      width: 500,
      height: 300,
      force: true,
    },
    crop: undefined,
  })
})

test('resize: throws error for negative height', t => {
  t.throws(() => getConfig({ resize: '500x-1' }))
})

test('resize: throws error for negative width', t => {
  t.throws(() => getConfig({ resize: '-1x300' }))
})

test('resize: throws error for no dimenson', t => {
  t.throws(() => getConfig({ resize: 'x' }))
})

test('resize: throws error for too big height', t => {
  t.throws(() => getConfig({ resize: '500x10001' }))
})

test('resize: throws error for too big width', t => {
  t.throws(() => getConfig({ resize: '10001x300' }))
})

test('crop: left top 600x400', t => {
  t.deepEqual(getConfig({ resize: '500x300', crop: '0x0:600x400' }), {
    resize: {
      width: 500,
      height: 300,
      force: false,
    },
    crop: {
      x: 0,
      y: 0,
      width: 600,
      height: 400,
    },
  })
})

// TODO write more cropping tests

test('name: only name', t => {
  t.deepEqual(
    parseParams(
      '/v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/Graphcool.jpg',
    ),
    [
      null,
      {
        projectId: 'ciwkuhq2s0dbf0131rcb3isiq',
        fileSecret: 'cj37jinmt008o0108zwhax711',
        resize: undefined,
        crop: undefined,
      },
    ],
  )
})

test('name: name with resize', t => {
  t.deepEqual(
    parseParams(
      '/v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200/Graphcool.jpg',
    ),
    [
      null,
      {
        projectId: 'ciwkuhq2s0dbf0131rcb3isiq',
        fileSecret: 'cj37jinmt008o0108zwhax711',
        resize: '600x200',
        crop: undefined,
      },
    ],
  )
})

test('name: name with resize and crop', t => {
  t.deepEqual(
    parseParams(
      '/v1/ciwkuhq2s0dbf0131rcb3isiq/cj37jinmt008o0108zwhax711/600x200/0x0:20x20/Graphcool.jpg',
    ),
    [
      null,
      {
        projectId: 'ciwkuhq2s0dbf0131rcb3isiq',
        fileSecret: 'cj37jinmt008o0108zwhax711',
        resize: '600x200',
        crop: '0x0:20x20',
      },
    ],
  )
})
