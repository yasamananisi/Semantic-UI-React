/**
 * Setup
 * This is the bootstrap code that is run before any tests, utils, mocks.
 */
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import * as enzyme from 'enzyme'

// ----------------------------------------
// Enzyme
// ----------------------------------------
global.enzyme = enzyme
global.shallow = enzyme.shallow
global.render = enzyme.render
global.mount = enzyme.mount

// ----------------------------------------
// Mocha
// ----------------------------------------
mocha.setup({
  ui: 'bdd',
})

// ----------------------------------------
// Chai
// ----------------------------------------
global.expect = chai.expect
chai.should()
chai.use(chaiEnzyme())
chai.use(dirtyChai)
chai.use(sinonChai)

// ----------------------------------------
// Console
// ----------------------------------------
// Fail on all activity.
// It is important we overload console here, before consoleUtil.js is loaded and caches it.
let log
let info
let warn
let error

const throwOnConsole = method => (...args) => {
  throw new Error(`console.${method} should never be called but was called with:\n${args.join(' ')}`)
}

/* eslint-disable no-console */
beforeEach(() => {
  log = console.log
  info = console.info
  warn = console.warn
  error = console.error

  console.log = throwOnConsole('log')
  console.info = throwOnConsole('info')
  console.warn = throwOnConsole('warn')
  console.error = throwOnConsole('error')
})
afterEach(() => {
  console.log = log
  console.info = info
  console.warn = warn
  console.error = error
})
/* eslint-enable no-console */
