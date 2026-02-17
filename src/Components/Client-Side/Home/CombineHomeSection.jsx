import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HeroSection from './HeroSection';
import ServicesSection from './OurServices';
import GlobalStudy from './GlobalStudy';
import WhyChoose from './WhyChoose';
import StartAboardJourney from './StartAboardJourney';

const CombineHomeSection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content Area - Yahan apna content add kar sakte hain */}
      <main className="flex-grow">
<HeroSection/>
<ServicesSection/>
<WhyChoose/>
<GlobalStudy/>
<StartAboardJourney/>
      </main>
      
      <Footer />
    </div>
  );
};

export default CombineHomeSection;