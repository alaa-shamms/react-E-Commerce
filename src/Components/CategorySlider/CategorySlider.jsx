import React from 'react'
import axios from 'axios'
import  { useEffect, useState } from 'react'
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function CategorySlider() {

const [myCatgory,setmyCatgory]=useState([])

async function getCategoryImgs()
{
  let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  console.log(data.data)
  setmyCatgory(data.data)
}
useEffect(()=>{
  getCategoryImgs()
},[])
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1
};
  return <>
  {/* <div className="container">
    <div className="row">

    <div >
      <OwlCarousel className='owl-theme' dots={false} loop items={7} >
        {myCatgory?myCatgory.map((cat,index)=>
        <div className='imgs1' key={index}>
          <img src={cat.image}  alt="" />
        </div>
        ):null}
      </OwlCarousel>
    </div>
    
    <div>
    <OwlCarousel className='owl-theme' loop items={7} >
      {myCatgory?myCatgory.map((cat,index)=>
      <div className='imgs2'  key={index}> 
        <img src={cat.image}  alt="" />
      </div>
      ):null}
    </OwlCarousel>
  </div>
    </div>
    </div> */}
    <div className="container-fluid">
    <div className="row w-75 mx-auto">
      <Slider {...settings}>
      {myCatgory?myCatgory.map((cat,index)=>
        <div  key={index}>
          <img src={cat.image} className='w-100 object-fit-cover' height={150} alt="" />
        </div>)
      :null}
    </Slider>
</div>
  </div>
  </>
}
