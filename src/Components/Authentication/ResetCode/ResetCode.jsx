import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
    import { Helmet } from 'react-helmet'


export default function ResetCode() {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    resetCode:Yup.string().required("ResetCode is Required").min(5,"min is 5").max(6,"max is 6"),
})
let formik=useFormik({
    initialValues:{
        resetCode:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleResetCode(values)
    }
})

async function handleResetCode(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values).catch((err)=>{
        setLoading(false)

        setErrMsg(err.response.data.message)
    })
    if(data.status=="Success")
    {
        setLoading(false)
        navigateTo('/ResetPassword')
    }
    console.log(data)

}
  return <>

<Helmet>
 <title>verify code</title>
</Helmet>
  <div className="w-75 mx-auto py-5 mt-5">
    <h4>Enter  reset code  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="resetCode" name='resetCode' id='resetCode' className='form-control pb-2' />
    {formik.errors.resetCode&&formik.touched.resetCode?<div className='alert alert-danger'>{formik.errors.resetCode}</div>:null}
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2'>Verify Code</button>}
    </form>
  </div>
  </>
}
