import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'
import ImageGallery from '../components/ImageGallery'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <ImageGallery />
      <Description/>
      <Testimonial/>
      <GenerateBtn/>
    </div>
  )
}

export default Home