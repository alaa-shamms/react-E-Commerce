import axios from 'axios'
import React, { useEffect, useState } from 'react'
import supcatImg from "../../finalProjectAssets/subCAT.jpg"
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function SubCategries() {
    let [loading,setLoading]=useState(false)

    const [subCategories,setmySubCatgories]=useState([])

    async function getSubCategories()
    {
      setLoading(true)
      let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
      console.log(data.data)
      setmySubCatgories(data.data)
      setLoading(false)
    }
    useEffect(()=>{
        getSubCategories()
    },[])
    
    return <>

<Helmet>
 <title>SubCategories</title>
</Helmet>
    <div className="container-fluid mt-5">
      <div className="row justify-content-center align-items-center vh-100">
      {loading==true?<div className='vh-75 d-flex justify-content-center align-items-center'>
      <div className='text-center'> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
      </div>
      :subCategories.map((subCategory)=>
      <div key={subCategory._id} className="col-md-4 col-sm-6 py-2 px-2">
      <div className="product cat p-2 cursor-pointer">
      <Link to={`/subcategorydetails/${subCategory._id}`}>
        <img src={supcatImg} className='w-100 object-fit-cover' />
        <h2 className='text-dark font-sm text-center mt-2'>{subCategory.name}</h2>
      </Link>
      </div>
  
  
  
    </div>
  
  
   ) }
          
      </div>
    </div>
    </>
}
