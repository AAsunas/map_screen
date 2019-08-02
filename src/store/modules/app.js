const app = {
  state:{
    map: Object
  },
  mutations:{
    SET_MAP: (state, map) => {
      state.map = map;
    }
  },
  actions:{
    setMapAction({ commit }, map) {
      commit('SET_MAP', map);
    }
  }
}

export default app;
