import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function ForgotPassword() {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
})
let formik=useFormik({
    initialValues:{
        email:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleForgotPassword(values)
    }
})

async function handleForgotPassword(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values).catch((err)=>{
        setLoading(false)

        setErrMsg(err.response.data.message)
    })
    if(data.statusMsg=="success")
    {
        setLoading(false)
        window.alert(data.message)
        navigateTo('/resetcode')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Forgot Password</title>
  </Helmet>
  <div className="w-75 mx-auto py-5 mt-5">
    <h4>Enter your email to send reset code  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2'>Send Code</button>}
    </form>
  </div>
  </>
}
