import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let WishContext=createContext()
export function WishContextProvider(props)
{
    const [wishNum,setWishNum]=useState(null)

//   Get Logged user wish list
  async function getUserDataList()
  {

    let response=await getUserWishData()
    console.log(response)
    if(response?.data?.status=="success")
    {
        console.log(response)
        setWishNum(response.data.count)
    }

  }
useEffect(()=>{
    getUserDataList()

},[])

// token of user
    let headers=
    {
        token:localStorage.getItem("UserToken")
    }

// add to cart
   function addToWishList(productId) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`
    ,
    {productId}
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
// get user data in cart
function getUserWishData() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 
// remove product from wishlist
function removefromWish(productID) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productID}`
    ,
    {headers}
    ).then((response)=>response).catch((err)=>err)
   } 






    return <WishContext.Provider value={{addToWishList,getUserWishData,removefromWish,wishNum,setWishNum,getUserDataList}}>
        {props.children}
    </WishContext.Provider>
}



