import ContactSection from '@/components/home/contact-section'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <ContactSection />
        <Footer />
    </div>
  )
}

export default page