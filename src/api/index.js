import catsInfo from './data/catsInfo'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}
export default {
  fetchCats () {
    return fetch(catsInfo, 1000) // wait 1s before returning cats
  }
}