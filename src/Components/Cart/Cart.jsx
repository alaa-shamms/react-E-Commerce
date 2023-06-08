import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

  let [loading,setLoading]=useState(false)

  const [cartDetails,setCartDetials]=useState(null)


  let {getUserCartData,removeItem,updateItemCount,clearCart,setCartNum,setCartId,setCartOwner}=useContext(CartContext)

  //Get Logged user cart
  async function getUserData()
  {
    setLoading(true)

    let response=await getUserCartData()
    console.log(response)
    if(response?.data?.status=="success")
    {
      setCartDetials(response.data.data)
      setCartId(response.data.data._id)
      setCartOwner(response.data.data.cartOwner)
    }
    setLoading(false)

  }
  // remove product from cart
  async function removeProduct(productId)
  {
    let response=await removeItem(productId)
    console.log(response)
    setCartDetials(response.data.data)
    setCartNum(response.data.numOfCartItems)

    if(response?.data?.status=="success")
    {
      toast.success("Product removed")
    }
    else
    {
      toast.error("Error")

    }
    
  }
    // update product count 
    async function updateCount(productId,count)
    {
      let response=await updateItemCount(productId,count)
      console.log(response)
      setCartDetials(response.data.data) 
      
    if(response?.data?.status=="success")
    {
      toast.success("Product count updated")
    }
    else
    {
      toast.error("Error")

    }     
    }

// clear all sure
// const areYouSure=document.getElementById('areYouSure')

// function SURE()
// {
//   areYouSure.classList.toggle('d-none')

// }
// clear cart data  
async function clearAll()
    {
      // areYouSure.classList.toggle('d-none')

      let response=await clearCart()
      console.log(response)
      setCartDetials(response.data.data) 
      setCartNum(response.data.numOfCartItems)

      toast.success("You have deleted all products")
       
    }


  useEffect(()=>{
    getUserData()
  },[])

  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
   {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center'>
    <div className='text-center '> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
   </div>
   :
   <>
   {cartDetails!=null?
    <>
    <br />
    <button onClick={()=>clearAll()} className='btn btn-danger position-relative start-50 mt-5 translate-middle-x'>remove all  products from my cart  </button>
    <br />
    {/* <button class="btn btn-outline-success position-relative start-50 translate-middle-x mt-3 d-none"  onClick={()=>clearAll()}  id="areYouSure">I Am Sure Delete All</button> */}
  
      <table style={{verticalAlign:"middle"}} className='table table-striped table-bordered my-3 text-center'>
      <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Quatity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
        {/* all products */}
        {cartDetails.products?.map((element,index)=>
            <tr key={index}>
            <td><img src={element.product.imageCover} className='w-50 table_img' height={100} alt="" /></td>
            <td>{element.product.title}</td>
            <td>
            <button onClick={()=>{updateCount(element.product._id,element.count>0?element.count-1:0)}}  className='btn btn-danger btn-sm rounded'>-</button>
            <span className='mx-3'>{element.count}</span>
            <button onClick={()=>{updateCount(element.product._id,element.count+1)}} className='btn btn-success btn-sm rounded'>+</button>
            </td>
            <td>{element.price} EGP</td>
            <td><i onClick={()=>removeProduct(element.product._id)} className="fa-solid text-danger fa-trash cursor-pointer"></i></td>
          </tr>)}
  
      {/* total price */}
      <tr className='table-danger'>
        <td colSpan={4} className='fs-5'>
          Total price of all products
        </td>
        <td className='fw-bolder'>
          {cartDetails.totalCartPrice} EGP 
        </td>
      </tr>
      </tbody>
    </table>
  
    <Link className='text-white' to="/checkout">
    <button className='btn bg-danger fs-5 position-relative start-50 mt-2 translate-middle-x'>
      Pay online <i class="fa-regular fa-credit-card text-warning ms-2"></i>
    </button>
    </Link>
    <Link className='text-white' to="/cash">
    <button className='btn bg-info fs-5 position-relative start-50 mt-2 mx-3 translate-middle-x'>
      Pay by cash <i class="fa-solid fa-money-bill-wave ms-2 text-success"></i>
    </button>
    </Link>
    </>:<div className='fs-4 fw-bolder text-danger text-center mt-5 py-5'>NO DATA IN THE CART</div>}
    </>
   }

 


 </>
}
