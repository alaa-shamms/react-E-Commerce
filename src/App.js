import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import Error404 from './Components/Error404/Error404';
import Home from './Components/Home/Home';
import ForgotPassword from './Components/Authentication/ForgotPasswoed/ForgotPassword';
import ResetCode from './Components/Authentication/ResetCode/ResetCode';
import ResetPassword from './Components/Authentication/ResetPassword/ResetPassword';
import jwtDecode from "jwt-decode";
import { useEffect, useState } from 'react';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import SubCategries from './Components/SubCategories/SubCategries';
import SubCategoryDetails from './Components/SubCaregoryDetails/SubCategoryDetails';
import Brands from './Components/Brands/Brands';
import BrandDetials from './Components/BrandDetails/BrandDetials';
import { CartContextProvider } from './Components/Context/CartContext';
import Cart from './Components/Cart/Cart';
import toast, { Toaster } from 'react-hot-toast';
import { WishContextProvider } from './Components/Context/Wishlist';
import WishList from './Components/Wishlist/WishList';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import Cash from './Components/Cash/Cash';
import UpdateLogedpass from './Components/Authentication/UpdateLogedPass/UpdateLogedpass';
import UpdateMe from './Components/Authentication/UpdateMe/UpdateMe';
// for network
import { Offline, Online } from "react-detect-offline";

function App() {
  
 function ProtectedRouting2(props) {

  if(localStorage.getItem("UserToken")!==null)
  {
    return <Navigate to='/home'/>
  }
  else
  {
    return props.children
  }

  }



useEffect(()=>{
  if(localStorage.getItem("UserToken")!==null)
  {
    saveUserData()
  }
},[])


  const [userData,setUserData]=useState(null)
  function saveUserData() {
     let encodedData=localStorage.getItem("UserToken") 
     let decodedData=jwtDecode(encodedData)
     setUserData(decodedData)
  }
  function logout() {
    setUserData(null);
    localStorage.removeItem("UserToken");
    return <Navigate to='/login'/>
 }
  let routers=createHashRouter([
    {path:"",element:<Layout logout={logout} userData={userData} />,
    children:
    [
      {path:"home",element:<ProtectedRouting><Home userData={userData}/></ProtectedRouting>},
      {path:"products",element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:"productdetails/:id",element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
      {path:"categories",element:<ProtectedRouting><Categories/></ProtectedRouting>},
      {path:"categorydetails/:id",element:<ProtectedRouting><CategoryDetails/></ProtectedRouting>},
      {path:"subcategory",element:<ProtectedRouting><SubCategries/></ProtectedRouting>},
      {path:"subcategorydetails/:id",element:<ProtectedRouting><SubCategoryDetails/></ProtectedRouting>},
      {path:"brands",element:<ProtectedRouting><Brands/></ProtectedRouting>},
      {path:"branddetails/:id",element:<ProtectedRouting><BrandDetials/></ProtectedRouting>},
      {path:"cart",element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:"wishlist",element:<ProtectedRouting><WishList/></ProtectedRouting>},
      {path:"checkout",element:<ProtectedRouting><Checkout logout={logout}/></ProtectedRouting>},
      {path:"cash",element:<ProtectedRouting><Cash/></ProtectedRouting>},
      {path:"allorders",element:<ProtectedRouting><AllOrders userData={userData}/></ProtectedRouting>},



      // update after login
      {path:"updateLogedPassword",element:<ProtectedRouting><UpdateLogedpass logout={logout}/></ProtectedRouting>},
      {path:"UpdateLoggeduserdata",element:<ProtectedRouting><UpdateMe logout={logout}/></ProtectedRouting>},





      // Authentication
      {path:"login",element:<Login saveUserData={saveUserData}/>},
      {index:true,element:<ProtectedRouting2><Register/></ProtectedRouting2> },
      {path:"forgotpassword",element:<ForgotPassword/>},
      {path:"resetcode",element:<ResetCode/>},
      {path:"ResetPassword",element:<ResetPassword/>},
      // not found page
      {path:"*",element:<Error404/>},
    ]}
  ])




  return <WishContextProvider>
      <CartContextProvider>
       
            {/* network */}
           {/* <Online>" "</Online>
           <Offline>
            <div className='network'>
            <i class="fa-solid fa-exclamation"></i> Network Error
            </div>
            </Offline> */}
           <Toaster/>
           <RouterProvider router={routers}/>

      </CartContextProvider>
  </WishContextProvider>




}

export default App;
