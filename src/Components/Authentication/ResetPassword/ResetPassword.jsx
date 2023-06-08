import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
    import { Helmet } from 'react-helmet'


export default function ResetPassword() {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
    newPassword:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),

})
let formik=useFormik({
    initialValues:{
        email:"",
        newPassword:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handlenewPassword(values)
    }
})

async function handlenewPassword(values)
{
    setLoading(true)
    let {data}=await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values).catch((err)=>{
        setLoading(false)

        setErrMsg(err.response.data.message)
    })
    if(data.token!=null)
    {
        setLoading(false)
        window.alert("Password updated")
        navigateTo('/login')
    }
    console.log(data)

}
  return <>
<Helmet>
 <title>Reset password</title>
</Helmet>
  <div className="w-75 mx-auto py-5 mt-5">
    <h4>Update Your Password  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <label htmlFor="email" className='mb-2'>email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* password */}
    <label htmlFor="newPassword" className='mb-2'>newPassword :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="newPassword" name='newPassword' id='newPassword' className='form-control pb-2' />
    {formik.errors.newPassword&&formik.touched.newPassword?<div className='alert alert-danger'>{formik.errors.newPassword}</div>:null}

    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2'>Update Password</button>}

    </form>
  </div>
  </>
}
