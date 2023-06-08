import React, { useContext, useEffect } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import { CartContext } from '../Context/CartContext';
import { WishContext } from '../Context/Wishlist';
import { Helmet } from 'react-helmet'

export default function Home({userData}) {
  let {getUserData}=useContext(CartContext)
  let {getUserDataList}=useContext(WishContext)

  useEffect(()=>{
    getUserData()
    getUserDataList()
  },[])
  return <>


  <MainSlider/>
  <CategorySlider/>
  <br />
  {/* <h5 className='text-center text-warning'>welcome {userData.name} </h5> */}
  <Products/>
<Helmet>
 <title>Home</title>
</Helmet>
  </>
}
