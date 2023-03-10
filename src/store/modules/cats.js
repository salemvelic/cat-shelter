import cats from '../../api/index.js'

export default{
  state: {
    cats: [],
  },
  getters: {
    allCats: state => state.cats,
    firstFourCats: state => state.cats.length >= 4 ? state.cats.slice(0, 4) : state.cats,
  },
  mutations: {
    SET_CATS(state, cats) {
      state.cats = cats.map(cat => {
        const image = `../assets/img/${cat.name.toLowerCase()}.jpg`;
        return { ...cat, image };
      }).sort((a, b) => a.months - b.months);
    },
    REMOVE_CAT_BY_ID(state, id) {
      state.cats = state.cats.filter(cat => cat.id !== id);
    },
  },
  actions: {
    async fetchCats ({ commit }) {
      const catsRes = await cats.fetchCats();

      commit('SET_CATS', catsRes)
    },
    removeCatById({ commit, state }, id) {
      const catToRemove = state.cats.find(cat => cat.id === id);

      if (catToRemove) {
        commit('REMOVE_CAT_BY_ID', id);
      }
    },
  },
}
