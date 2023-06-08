import React from 'react'
import errIMg from '../../finalProjectAssets/error.svg'
import { Helmet } from 'react-helmet'

export default function Error404() {
  return <>

<Helmet>
 <title>Error 404 page</title>
</Helmet>
<div className='d-flex justify-content-center align-items-center vh-75 mt-5 pt-5'><img src={errIMg} alt="" /></div>

  
  </>
    
    
  
}
