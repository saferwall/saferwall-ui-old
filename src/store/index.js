import { createStore } from 'vuex'

import globalStates from "./states"
import globalMutations from "./mutations"
import globalActions from "./actions"
import globalModules from "./modules"
import globalGetters from "./getters"

export default createStore({
  state: globalStates,
  mutations: globalMutations,
  actions: globalActions,
  modules: globalModules,
  getters: globalGetters,
});
