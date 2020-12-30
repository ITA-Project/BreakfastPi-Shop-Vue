const mutations = {
  SET_USER_INFO: (state, response) => {
    state.user.id = response.id
    state.user.username = response.username
  },
  SET_SHOP_INFO: (state, response) => {
    state.shop.id = response.id
    state.shop.name = response.name
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

export default mutations
