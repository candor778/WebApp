import Footer from '@/components/home/footer'
import Navbar from '@/components/home/navbar'
import ResearchMethodologiesSection from '@/components/home/research-methodologies'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <ResearchMethodologiesSection />
        <Footer />
    </div>
  )
}

export default page