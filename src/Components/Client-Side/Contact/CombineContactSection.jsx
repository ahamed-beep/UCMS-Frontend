import React from 'react'

import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import ContactUs from './ContactUs'

const CombineContactSection = () => {
  return (
    <div>
      <Navbar/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default CombineContactSection