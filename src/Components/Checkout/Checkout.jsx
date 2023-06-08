import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from "yup"
import { CartContext } from '../Context/CartContext'
 import { Helmet } from 'react-helmet'

export default function Checkout({logout}) {
    
let {CheckoutOnline,cartID}=useContext(CartContext)
let [Loading,setLoading]=useState(false)   

 let validationSchema=Yup.object({
    details:Yup.string().required("details is Required").min(10,"10 characters is too short").max(30,"20 characters is yoo long"),
    city:Yup.string().required("city is Required"),
    phone:Yup.string().required("phone is Required").matches(/^01[01235][0-9]{8}$/,"You shoud enter valid phone"),

})
async  function handleCheckOut(values)
{
    setLoading(true)

    let response=await CheckoutOnline(cartID,values)
    console.log(response)
    setLoading(false)
    if(response?.data?.status=="success")
    {
        console.log("done")
        window.location.href=response.data.session.url
    }

}
 let formik=useFormik({
    initialValues:{
        details:"",
        phone:"",
        city:""
    }
    ,
    validationSchema
    ,
    onSubmit:(values)=>
    {
        handleCheckOut(values)
    } 
 })   


 return <>

<Helmet>
 <title>Check out</title>
</Helmet>
 <div className="w-75 mx-auto py-5 mt-5">
   <h4>Enter your data to check out  :</h4>
   <form onSubmit={formik.handleSubmit}>
   {/* email */}
   <label htmlFor="details" className='mb-2'>details :</label>
   <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" name='details' id='details' className='form-control pb-2' />
   {formik.errors.details&&formik.touched.details?<div className='alert alert-danger'>{formik.errors.details}</div>:null}
    {/* phone */}
    <label htmlFor="phone" className='mb-2'>phone :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name='phone' id='phone' className='form-control pb-2' />
    {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:null}
    {/* city */}
    <label htmlFor="city" className='mb-2'>city :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" name='city' id='city' className='form-control pb-2' />
    {formik.errors.city&&formik.touched.city?<div className='alert alert-danger'>{formik.errors.city}</div>:null}
   <br />
   {/* submit button  and loading*/}
   {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
   :<button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2'>pay online</button>}

   </form>
 </div>
 </>

}
