import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Login({saveUserData}) {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
    password:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),

})
let formik=useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleLogin(values)
    }
})

async function handleLogin(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{
        setLoading(false)

        setErrMsg(err.response.data.message)
    })
    if(data.message=="success")
    {
        localStorage.setItem("UserToken",data.token)
        saveUserData()
        setLoading(false)
        navigateTo('/home')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Login</title>
  </Helmet>
  <div className="w-75 mx-auto py-5 mt-5">
    <h4>Login Now :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <label htmlFor="email" className='mb-2'>email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* password */}
    <label htmlFor="password" className='mb-2'>password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control mb-2' />
    {formik.errors.password&&formik.touched.password?<div className='alert alert-danger mb-2'>{formik.errors.password}</div>:null}
    {/* Forgot Password */}
    <Link to='/ForgotPassword'>Forgot my Password ?</Link>
    <br />
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2'>sign in</button>}

    </form>
  </div>
  </>
}
