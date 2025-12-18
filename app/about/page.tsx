import AboutSection from '@/components/home/about-section'
import Footer from '@/components/home/footer'
import Navbar from '@/components/home/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <AboutSection />
        <Footer />
    </div>
  )
}

export default page