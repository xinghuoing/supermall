

export default  {
  // context = {state, commit}
  addCart(context, payload) {
   return new Promise((resolve, reject) => {
     // payload = product
     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
     if(oldProduct) {
       // 相同商品数量加一
       // oldProduct.count += 1
       context.commit('addCounter',oldProduct)
       resolve('当前商品数量加一')
     } else {
       // 新的商品，新建count为1，在加入cartList数组里
       payload.count = 1 
       // state.cartList.push(payload)
       // 想要修改state去mutations里修改，commit发送一个方法去
       context.commit('addToCart',payload)
       resolve('添加了新的商品')

     }
   })
  }
}