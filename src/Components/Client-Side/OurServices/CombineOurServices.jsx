import React from 'react'
import ServicesPage from './ServicesPage'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import StudentSubmissionForm from './StudentSubmissionForm'

const CombineOurServices = () => {
  return (
    <div>
      <Navbar/>
      <ServicesPage/>
      <StudentSubmissionForm/>
      <Footer/>
    </div>
  )
}

export default CombineOurServices