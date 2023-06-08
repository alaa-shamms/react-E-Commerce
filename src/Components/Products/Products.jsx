import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-hot-toast'
import { WishContext } from '../Context/Wishlist'
import { Helmet } from 'react-helmet'


export default function Products() {

// Share data from cart context to addProduct in Cart
let {addToCart,setCartNum,setCartId,setCartOwner}=useContext(CartContext)
let {addToWishList,setWishNum}=useContext(WishContext)

async function addProduct(productId)
{
  let response= await addToCart(productId)
  console.log(response)
  if(response.data.status=="success")
  {
    setCartNum(response.data.numOfCartItems)
    setCartId(response.data.data._id)
    setCartOwner(response.data.data.cartOwner)

    toast.success(response.data.message, {
      duration: 1000,
      position: 'top-center',
      className: 'bg-warning text-center'})
  }
  else
  {
    toast.error("Error product not added", {
      duration: 1500,
      position: 'top-center',
      className: 'bg-danger text-center text-white'})
  }

}
async function additemTOWishlist(productId)
{
  let response= await addToWishList(productId)
  console.log(response)
  if(response.data.status=="success")
  {
    let wishListLenght=[...response.data.data ]
    console.log(wishListLenght.length)
    setWishNum(wishListLenght.length)
      toast.success(response.data.message, {
      duration: 1500,
      position: 'top-center',
      className: 'bg-info text-white text-center'})
  }
  else
  {
    toast.error("Error product not added", {
      duration: 1500,
      position: 'top-center',
      className: 'bg-danger text-center text-white'})
  }

}
// ******************************************


let [loading,setLoading]=useState(false)
const [myProducts,setProducts]=useState([])

// get api data
async function getProducts()
{
  setLoading(true)
  let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
  console.log(data.data)
  setProducts(data.data)
  setLoading(false)
}
useEffect(()=>{
  getProducts()
},[])

  return <>

<Helmet>
 <title>Products</title>
</Helmet>
  <div className="container-fluid">
    <div className="row justify-content-center align-items-center vh-100">
    {loading==true?<div className='text-center'> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
    :myProducts.map((product)=>
    <div key={product._id} className="col-md-4 col-sm-6 py-2 px-2">
    <div className="product p-2 cursor-pointer">
      <Link to={`/productdetails/${product._id}`}>
      <img src={product.imageCover} className='w-100'/>
      <span className='text-main fw-bold fw-sm'>{product.category.name}</span>
      <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join("")}</h3>
      {/* bootom of product */}
      <div className='d-flex justify-content-between px-1'>
        <span className='text-muted'>{product.price} Egp</span>
        <span className='text-muted'> <i className='fas fa-star rating-color'/>{product.ratingsAverage}</span>
      </div>
    </Link>
    {/* btn add */}
    <button  onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100 mt-1'>Add to cart +</button>
    <button  onClick={()=>additemTOWishlist(product._id)} className='btn bg-info text-white w-100 mt-1 text-white'>Add to wish list +</button>

    </div>



  </div>


 ) }
        
    </div>
  </div>
  
  </>
}
