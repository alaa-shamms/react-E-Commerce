import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { toast } from 'react-hot-toast'
    import { Helmet } from 'react-helmet'


export default function UpdateLofedpass({logout}) {




  let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
  currentPassword:Yup.string().required("current password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),
  password:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),
  rePassword:Yup.string().required("Repassword is Required").oneOf([Yup.ref("password")],"Password and Repassword not matched"),

})
let formik=useFormik({
    initialValues:{
      currentPassword:"",
      password:"",
      rePassword:""
    },
    validationSchema,
    onSubmit:(values)=>{

        handlenewPassword(values)
    }
})

let headers=
{
    token:localStorage.getItem("UserToken")
}

async function handlenewPassword(values)
{
    setLoading(true)
    let response=await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword`,values,{headers}).catch((err)=>{
        setLoading(false)

        setErrMsg(err.response.data.message)
    })
    if(response.data.message=="success")
    {
        setLoading(false)
        toast.success("Password updated", {
          duration: 5000,
          position: 'top-center',
          className: ' bg-secondary  text-center text-white'})
          logout()
    }
    console.log(response)

}
  return <>

<Helmet>
 <title>Update password</title>
</Helmet>
  <div className="w-75 mx-auto py-5 mt-5">
    <h4>Update Your Password  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* password */}
    <label htmlFor="currentPassword" className='mb-2'>currentPassword :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentPassword} type="password" name='currentPassword' id='currentPassword' className='form-control pb-2' />
    {formik.errors.currentPassword&&formik.touched.currentPassword?<div className='alert alert-danger'>{formik.errors.currentPassword}</div>:null}
    {/* password */}
    <label htmlFor="password" className='mb-2'>password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control pb-2' />
    {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
    {/* rePassword */}
    <label htmlFor="rePassword" className='mb-2'>rePassword :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control pb-2' />
    {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}

    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2'>Update Password</button>}

    </form>
  </div>
  </>
}
