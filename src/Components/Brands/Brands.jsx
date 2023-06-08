import React from 'react'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Brands() {

    let [loading,setLoading]=useState(false)

    const [Brands,setBrands]=useState([])
  
  async function getBrands()
  {
    setLoading(true)
    let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    console.log(data.data)
    setBrands(data.data)
    setLoading(false)
  }
  useEffect(()=>{
    getBrands()
  },[])

  return <>
<Helmet>
 <title>Brands</title>
</Helmet>
  <div className="container-fluid mt-5">
    <div className="row justify-content-center align-items-center vh-100">
    {loading==true?<div className='text-center'> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
    :Brands.map((brand)=>
    <div key={brand._id} className="col-md-4 col-sm-6 py-2 px-2">
    <div className="product  p-2 cursor-pointer">
    <Link to={`/branddetails/${brand._id}`}>
      <img src={brand.image} className='w-100' />
      <h2 className='text-main font-sm text-center'>{brand.name}</h2>
    </Link>
    </div>



  </div>


 ) }
        
    </div>
  </div>
  </>
}
