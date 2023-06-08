import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Helmet } from 'react-helmet'


export default function AllOrders({userData}) {

let {getAllOrders}=useContext(CartContext)
let [myOrders,setOrders]=useState([])
let [loading,setLoading]=useState(false)




      // update product count 
      async function getOrders()
      {
        setLoading(true)

        let response=await getAllOrders()
        console.log(response)
        
        setOrders(response.data.data)
        setLoading(false)

      }
      useEffect(()=>{
        getOrders()
      },[])

  return  <>

   <Helmet>
    <title>All orders</title>
  </Helmet>
    {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center'>
   <div className='text-center '> <i className="fas fa-spinner fa-spin fa-4x"></i> </div>
  </div>:
  <>
  <br />
  <table style={{verticalAlign:"middle"}} className='table table-striped table-bordered my-3 mt-5  text-center'>
<thead>
<tr>
  <th>User Name</th>
  <th>total Order Price</th>
  <th>payment Method Type</th>
  <th>cart Items</th>
</tr>
</thead>
<tbody>
{myOrders?.map((el,index)=>
// {el.user.name==`${userData.name}`?:null}
      <tr key={index}>
      {/* 1 */}
      {el.user.name==`${userData.name}`?
      <td>
      {el.user.name}
      </td>
      :null}
      {/* 2 */}
      {el.user.name==`${userData.name}`?<td>
      {el.totalOrderPrice}
      </td>:null}
      {/* 3 */}
      {el.user.name==`${userData.name}`?
      <td>
      {el.paymentMethodType}
      </td>
      :null}
      {/* 4 */}
      {el.user.name==`${userData.name}`?
      <td>

      {el.cartItems?el.cartItems.map((cartImg,index)=>
      
      <img key={index} src={cartImg.product.imageCover} className='wish-img m-2' alt="" />

):null}
      </td>
      :null}
    </tr>)}

</tbody>
</table>
</>
  }

    </>
}
