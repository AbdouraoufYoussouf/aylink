import { Footer } from '@/components/ladingpage/footer'
import { Navbar } from '@/components/ladingpage/navbar'
import { Contact } from '@/components/ladingpage/sections/contact'
import { FAQ } from '@/components/ladingpage/sections/faq'
import { Features } from '@/components/ladingpage/sections/features'
import { Hero } from '@/components/ladingpage/sections/hero'
import { Pricing } from '@/components/ladingpage/sections/pricing'
import { Testimonials } from '@/components/ladingpage/sections/testimonial'
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