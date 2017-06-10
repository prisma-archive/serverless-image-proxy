import test from 'ava'
import { getConfig } from './parser'

test('resize: normal', t => {
  t.deepEqual(getConfig('500x300'), {
    resize: {
      width: 500,
      height: 300,
      force: false,
    },
    crop: null,
  })
})

test('resize: height - keep ratio', t => {
  t.deepEqual(getConfig('x300'), {
    resize: {
      width: 0,
      height: 300,
      force: false,
    },
    crop: null,
  })
})

test('resize: height - keep ratio', t => {
  t.deepEqual(getConfig('500x'), {
    resize: {
      width: 500,
      height: 0,
      force: false,
    },
    crop: null,
  })
})

test('resize: force', t => {
  t.deepEqual(getConfig('500x300!'), {
    resize: {
      width: 500,
      height: 300,
      force: true,
    },
    crop: null,
  })
})

test('resize: throws error for negative height', t => {
  t.throws(() => getConfig('500x-1'))
})

test('resize: throws error for negative width', t => {
  t.throws(() => getConfig('-1x300'))
})

test('resize: throws error for no dimenson', t => {
  t.throws(() => getConfig('x'))
})

test('resize: throws error for too big height', t => {
  t.throws(() => getConfig('500x10001'))
})

test('resize: throws error for too big width', t => {
  t.throws(() => getConfig('10001x300'))
})

test('crop: left top 600x400', t => {
  t.deepEqual(getConfig('0x0:600x400', '500x300'), {
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
