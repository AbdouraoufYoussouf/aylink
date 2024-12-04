"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Chen",
    title: "Digital Course Creator",
    image: "/rafien.png",
    stats: "50K+ students"
  },
  {
    name: "Mark Reynolds",
    title: "Content Creator",
    image: "/rafien.png",
    stats: "100K+ subscribers"
  },
  {
    name: "Emma Davis",
    title: "Online Coach",
    image: "/rafien.png",
    stats: "200+ courses sold"
  },
  {
    name: "Alex Thompson",
    title: "Digital Artist",
    image: "/rafien.png",
    stats: "1K+ products sold"
  }
]

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {testimonials.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-[500px] h-[500px] rounded-full border border-gray-100"
            style={{
              left: "70%",
              top: "70%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center items-center space-x-1 mb-6">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                {star}
              </span>
            ))}
            <span className="ml-2 text-gray-600">Trusted by 10,000+ creators</span>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            Monetize your content
            <br />
            <span className="text-blue-600">all in one place</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10">
            Create custom profile pages, sell digital products, and manage your content.
            Start growing your online business today.
          </p>

          <Button size="lg" className="text-lg px-8 py-6">
            Start for free
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">No credit card required • Setup in minutes</p>
        </motion.div>

        {/* Floating testimonials */}
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="absolute hidden md:block"
            style={{
              left: `${50 + 50 * Math.cos(index * (2 * Math.PI) / testimonials.length)}%`,
              top: `${50 + 50 * Math.sin(index * (2 * Math.PI) / testimonials.length)}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.stats}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


