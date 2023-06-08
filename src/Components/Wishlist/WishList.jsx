import React, { useContext, useEffect, useState } from 'react'
import { WishContext } from '../Context/Wishlist'
import { toast } from 'react-hot-toast'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

export default function WishList() {
    let [loading,setLoading]=useState(false)

    const [wishDetails,setWishDetials]=useState(null)
  
    let {getUserWishData,removefromWish,setWishNum,wishNum}=useContext(WishContext)
  
    //Get Logged user cart
    async function getWishData()
    {
      setLoading(true)
  
      let response=await getUserWishData()
      console.log(response)
      if(response?.data?.status=="success")
      {
        setWishDetials(response.data.data)
      }
      setLoading(false)
  
    }
 //remove item from wish list
 let navigateTo=useNavigate()

 async function removeFromwishList(productID)
 {
   let response=await removefromWish(productID)
   console.log(response)

   if(response?.data?.status=="success")
   {
    setWishDetials(response.data.data)
    let wishListLenght=[...response.data.data ]
    console.log(wishListLenght.length)
    setWishNum(wishListLenght.length)
    navigateTo('/products')
    toast.success("Product removed from wish list")
   }
   else
   {
     toast.error("Error")

   }
   
 }
    useEffect(()=>{
        getWishData()
    },[])



   return<>

<Helmet>
 <title>Wish list</title>
</Helmet>
    <div className='pt-5'>
  {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center'>
   <div className='text-center '> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
  </div>
  :null}

{wishNum!=0?
 <>
    {/* <>Wish List Data</> */}
   <table style={{verticalAlign:"middle"}}  className='table table-striped table-bordered mt-5 my-3 text-center'>

   <thead>

   <tr>
     <th>Image</th>
     <th>Name</th>
     <th>Brand</th>
     <th>category</th>
     <th>Price</th>
     <th>Action</th>
   </tr>
   </thead>
   <tbody>
     {/* all products */}
     {wishDetails?.map((element,index)=>
         <tr key={index}>
         <td>
         {/* <OwlCarousel className='owl-theme' loop items={2} width={50} > */}

         {element?.images?element.images.map((detailImg,index)=>
          
          <img key={index} src={"https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747398/Route-Academy-products/"+detailImg} className='wish-img m-2' alt="" />

    ):null}
              {/* </OwlCarousel> */}

            {/* <img src={element.imageCover} className='w-50 table_img' height={100} alt="" /> */}
            {/* <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747398/Route-Academy-products/1680403266805-1.jpeg' className='w-50 table_img' height={100} alt="" /> */}

        </td>
         <td>
          {element.title}
         </td>
         <td>
            {element.brand.name}
         </td>
         <td>
           {element.category.name}
         </td>
         <td>{element.price} EGP</td>
         <td><i onClick={()=>removeFromwishList(element._id)} className="fa-solid text-danger fa-trash cursor-pointer"></i></td>
       </tr>)
       }

   </tbody>

 </table>
 </>
 :
 <div className='fs-4 fw-bolder text-danger text-center mt-5 py-1'>NO DATA IN THE WISH LIST</div>}

  


</div>
</>
}
