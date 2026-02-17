import React from 'react'
import AboutUCMS from './AboutUcms'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import MissionVision from './OurMission'
import CoreValues from './OurCore'
import OurJourney from './OurJourney'
import WhyStudentsTrust from './WhyStudentsTrust'
import WhatOurStudentsSay from './WhatOurStudentSays'

const CombineAboutSection = () => {
  return (
    <div>
      <Navbar/>
      <AboutUCMS/>
      <MissionVision/>
      <CoreValues/>
      <OurJourney/>
      <WhyStudentsTrust/>
      <WhatOurStudentsSay/>
      <Footer/>
    </div>
  )
}

export default CombineAboutSection