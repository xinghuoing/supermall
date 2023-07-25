export default {
  // mutations是为了修改state里的状态
  // 尽量功能单一，if循环就不可以放在这了
  // addCart(state, payload) {
  //   // payload = product
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   if(oldProduct) {
  //     // 相同商品数量加一
  //     oldProduct.count += 1
  //   } else {
  //     // 新的商品，新建count为1，在加入cartList数组里
  //     payload.count = 1 
  //     state.cartList.push(payload)
  //   }
  // }
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}