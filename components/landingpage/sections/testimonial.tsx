/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const testimonials = [
  {
    content:
      "This platform has completely transformed how I manage my content. The integrated payment system is a game-changer!",
    author: "Sarah Johnson",
    role: "Digital Course Creator",
    image:
      "/raouf.jpg",
  },
  {
    content:
      "The course platform is incredibly intuitive. My students love the progress tracking feature!",
    author: "Michael Chen",
    role: "Online Instructor",
    image:
      "/raouf.jpg",
  },
  {
    content:
      "Finally, a platform that understands what content creators actually need. The support team is amazing!",
    author: "Emma Davis",
    role: "Content Creator",
    image:
      "/rafien.png",
  },
];

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Loved by creators worldwide
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Here's what our users have to say
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center">
                <Image
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}