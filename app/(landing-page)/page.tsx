import { Footer } from '@/components/landingpage/footer'
import { Navbar } from '@/components/landingpage/navbar'
import { Contact } from '@/components/landingpage/sections/contact'
import { FAQ } from '@/components/landingpage/sections/faq'
import { Features } from '@/components/landingpage/sections/features'
import { Hero } from '@/components/landingpage/sections/hero'
import { Pricing } from '@/components/landingpage/sections/pricing'
import { Testimonials } from '@/components/landingpage/sections/testimonial'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ/>
      <Contact />
      <Footer />
    </main>
  )
}

export default page