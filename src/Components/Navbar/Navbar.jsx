import React, { useContext, useEffect } from 'react';
import logo from '../../finalProjectAssets/freshcart-logo.svg';
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext';
import { WishContext } from '../Context/Wishlist';

export default function Navbar({userData,logout}) {
  let {cartNum,getUserData}=useContext(CartContext)
  let {wishNum,getUserDataList}=useContext(WishContext)

  useEffect(()=>{
    getUserData()
    getUserDataList()
  },[])

  return <>
  <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home"><img src={logo} className='w-100' alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {/* left of nav */}
      {userData!=null?<><ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to="/Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to="/Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to="/subcategory">Subcategory</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active"  to="/allorders">All orders</Link>

        </li>
      </ul>
      
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            settings
          </a>
          <ul className="dropdown-menu">
            <li><Link className="nav-link text-danger font-sm" to="/updateLogedPassword" >update password</Link></li>
            <li><Link className="nav-link text-danger font-sm" to="/UpdateLoggeduserdata" >update information</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <Link onClick={logout} className="nav-link ms-2" >Logout</Link>
          </ul>
        </li>
          {/* cart detials */}
  <li className="nav-item cursor-pointer">
  <div  class="position-relative ">
  <Link className="nav-link active"  to="/cart"><i className="fa-solid fa-shopping-cart fa-lg me-1" title="Shopping Cart"></i> </Link>
  
  <span class="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success">
  {cartNum>0?cartNum:0}
  </span>
</div>  
   
   </li>
      {/* wish detials */}
  <li className="nav-item cursor-pointer">
  <div  class="position-relative ">
  <Link className="nav-link active"  to="/wishlist"><i class="fa-brands fa-wirsindhandwerk" title="wish List"></i> </Link>
  
  <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
  {wishNum>0?wishNum:0}
  </span>
</div>     
   </li>

 
  
      
  </ul>
  </>
  :null}

      {/* <h4 className='mx-auto text-danger'>welcome {userData.name}</h4> */}
        {/* right of nav */}
        {userData==null?<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to='/login' >Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">register</Link>
        </li>
      </ul>:null}

    </div>
  </div>
</nav>
  </>
}
