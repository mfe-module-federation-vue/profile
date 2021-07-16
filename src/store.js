import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

const userModule = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit("SET_USER", user);
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
  },
};
const store = new Vuex.Store({ modules: { user: userModule } });

export default store;
