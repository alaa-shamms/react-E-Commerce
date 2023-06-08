import React from 'react'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
  import { Helmet } from 'react-helmet'

export default function Categories() {

  let [loading,setLoading]=useState(false)

  const [Categories,setmyCatgories]=useState([])

async function getCategories()
{
  setLoading(true)
  let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  console.log(data.data)
  setmyCatgories(data.data)
  setLoading(false)
}
useEffect(()=>{
  getCategories()
},[])


  return <>

<Helmet>
 <title>Categories</title>
</Helmet>
  <div className="container-fluid py-5">
    <div className="row justify-content-center align-items-center vh-100">
    {loading==true?<div className='text-center'> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
    :Categories.map((category)=>
    <div key={category._id} className="col-md-4 col-sm-6 py-2 px-2">
    <div className="product cat p-2 cursor-pointer">
    <Link to={`/categorydetails/${category._id}`}>
      <img src={category.image} className='w-100' />
      <h2 className='text-main font-sm'>{category.name}</h2>
    </Link>
    </div>



  </div>


 ) }
        
    </div>
  </div>
  </>

  
}
