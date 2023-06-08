import axios from 'axios'
import supcatImg from "../../finalProjectAssets/subCAT.jpg"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function SubCategoryDetails() {
    let {id}=useParams()
let [loading,setLoading]=useState(false)

const [details,setDetails]=useState([])

async function getDetails()
{
    setLoading(true)

  let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories/${id}`)
  console.log(data.data)
  setDetails(data.data)
  setLoading(false)

}
useEffect(()=>{
    getDetails()
},[])

return <>

<Helmet>
 <title>SubCategory Detials</title>
</Helmet>
<div className="container">
<div className="row py-5 align-items-center vh-75">
  {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='text-center'> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
      </div>
      :
      <>
      <div className="col-md-5 mt-4">
      <img src={supcatImg} className='w-100' alt="" />
      </div>
      <div className="col-md-7">
      <h3>{details.title}</h3>
      <p className='text-muted'>{details.name}</p> 
      <span className='text-main fw-bold fw-sm'>slug : {details.slug?details.slug:null}</span>
      <div className='d-flex justify-content-between px-1'>
      </div>
  
      </div>
      </>
  }

</div>
</div>
</>
}
