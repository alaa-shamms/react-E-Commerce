import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext=createContext()

export function CartContextProvider(props)
{
    const [cartNum,setCartNum]=useState(null)
    const [cartID,setCartId]=useState(null)
    const [CartOwner,setCartOwner]=useState(null)

  //Get Logged user cart
  async function getUserData()
  {

    let response=await getUserCartData()
    console.log(response)
    if(response?.data?.status=="success")
    {
        console.log(response)
        setCartNum(response.data.numOfCartItems)
        console.log("cart id: "+response.data.data._id)
        console.log("cart owner: "+response.data.data.cartOwner)
        console.log("cartNum:"+cartNum)
        setCartId(response.data.data._id)
    }

  }
useEffect(()=>{
    getUserData()

},[])

// token of user
    let headers=
    {
        token:localStorage.getItem("UserToken")
    }

// add to cart
   function addToCart(productId) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`
    ,
    {productId}
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
// get user data in cart
function getUserCartData() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
// remove product from cart
function removeItem(productId) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
// update product count in cart
function updateItemCount(productId,count) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`
    ,
    {count}
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
// clear cart data
function clearCart() {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
   
//    pay online

function CheckoutOnline(cartId,shippingAddress) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
    ,
    {shippingAddress}
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
   //    get orders cash or card

function getAllOrders() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/`
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
   //    pay cash

   function payCash(cartId,shippingAddress) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartId}`
    ,
    {shippingAddress}
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 


    return <CartContext.Provider 
    value=
    {
    {
    addToCart,getUserCartData,removeItem,updateItemCount,clearCart,
    setCartNum,cartNum,CheckoutOnline,cartID,setCartId,getAllOrders
    ,CartOwner,setCartOwner,getUserData,payCash
    }
    }>
        {props.children}
    </CartContext.Provider>
}



