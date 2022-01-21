import Vuex from 'vuex'
import dispatchActionForAllModules from '@/common/utils/dispatch-action-for-all-modules'

import modules from './modules'
import config from '../common/config'


const store = new Vuex.Store({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: !config.isProd,
})

export default store

// Automatically run the `init` action for every module,
// if one exists.
dispatchActionForAllModules('init')
