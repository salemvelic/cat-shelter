import cats from '../../api/index.js'

export default{
  state: {
    cats: [],
  },
  getters: {
    allCats: state => state.cats
  },
  mutations: {
    SET_CATS(state, cats) {
      state.cats = cats
    }
  },
  actions: {
    async fetchCats ({ commit }) {
      const catsRes = await cats.fetchCats();

      commit('SET_CATS', catsRes)
    }
  },
}
