import React from 'react'
import Hero from './Components/Hero'
import Stats from './Components/Stats'
import Footer from './Components/Footer'
import Header from './Components/Header'
import CTA from './Components/CTA'
import FAQSection from './Pages/FAQ'
import Contact_us from './Pages/Contact_us'

function HomePage() {
  return (
    <div>
        <Hero/>
        <Header/>
        <Stats/>
        <CTA/>
        <FAQSection/>
        {/* <Contact_us/> */}
        <Footer/>
    </div>
  )
}

export default HomePage