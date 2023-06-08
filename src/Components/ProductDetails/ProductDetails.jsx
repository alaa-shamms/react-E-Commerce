import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { WishContext } from '../Context/Wishlist';
  import { Helmet } from 'react-helmet'

export default function ProductDetails() {
  let {addToWishList,setWishNum,setCartId,setCartOwner}=useContext(WishContext)

  // add to wish list
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
  // add product to cart
  let {addToCart,setCartNum}=useContext(CartContext)

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
  //*********************************************************** */
  let [loading,setLoading]=useState(false)


let {id}=useParams()
const [details,setDetails]=useState([])

async function getDetails()
{
  setLoading(true)

  let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  console.log(data.data)
  setDetails(data.data)
  setLoading(false)

}
useEffect(()=>{
  getDetails()
},[])
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
  return <>

<Helmet>
 <title>Product details</title>
</Helmet>
  <div className="container">
    <div className="row py-5 align-items-center vh-75">
      {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='text-center'> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
      </div>
         :
          <>
          <div className="col-md-3">
          <Slider {...settings}>
          {details.images?details.images.map((detailImg,index)=>
                <img key={index} src={detailImg} className='w-100' alt="" />
          ):null}
          </Slider>
          </div>
          <div className="col-md-9">
          <h3>{details.title}</h3>
          <p className='text-muted'>{details.description}</p> 
          <span className='text-main fw-bold fw-sm'>{details.category?details.category.name:null}</span>
          <div className='d-flex justify-content-between px-1'>
                  <span className='text-muted'>{details.price} Egp</span>
                  <span className='text-muted'> <i className='fas fa-star rating-color'/>{details.ratingsAverage}</span>
          </div>
          <button onClick={()=>addProduct(details._id)} className='btn btn-outline-success  w-100 mt-3'>Add to cart +</button>
          <button  onClick={()=>additemTOWishlist(details._id)} className='btn btn-outline-info  w-100 mt-3'>Add to wish list +</button>

          </div>
          </>
      }

    </div>
  </div>
  </>
}
