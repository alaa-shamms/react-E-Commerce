import React from 'react'
import img1 from "../../finalProjectAssets/images/slider-image-1.jpeg"
import img2 from "../../finalProjectAssets/images/slider-image-2.jpeg"
import img3 from "../../finalProjectAssets/images/slider-image-3.jpeg"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MainSlider() {
  return <>
  <div className="container mt-5 pt-2">
    <div className="row g-0">
      <div className="col-md-9">
      <OwlCarousel className='owl-theme' loop items={1} autoplay={true}>
      <img src={img1} height={400} className='w-100 object-fit-cover' alt="" />
      <img src={img2} height={400} className='w-100 object-fit-cover' alt="" />
      <img src={img3} height={400} className='w-100 object-fit-cover' alt="" />
      </OwlCarousel>
      </div>
      <div className="col-md-3">
      <img src={img2} height={200} className='w-100 object-fit-cover' alt="" />
      <img src={img3} height={200} className='w-100 object-fit-cover' alt="" />

      </div>
    </div>
  </div>
  </>
}
