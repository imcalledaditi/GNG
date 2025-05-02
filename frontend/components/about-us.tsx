import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AboutUs() {
  return (
    <section id="about-us" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="relative h-[550px] w-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sebum3-rjPFkl3O8smF5DW87h2aeYRlJGqqR6.png"
                alt="Fitness instructor"
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-6 px-4 text-center">
                <Link href="/instructors">
                  <Button className="btn-animated bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                    Our Instructors
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 fade-in">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-20 bg-green-500"></div>
              <h2 className="text-4xl font-bold text-green-500 mb-8 pl-4">Where Fitness Meets Success</h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Guiding You to a Healthier, Happier You! Our expert instructors are dedicated to transforming your fitness
              goals into reality. Whether you're just starting or leveling up, we're here to inspire, support, and keep
              you motivated every step of the way!
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 mb-8">
              <h3 className="text-2xl font-semibold text-green-500 mb-4">
                Discover New Ways to Elevate Your Wellness!
              </h3>
              <p className="text-gray-700">
                Dive into our diverse courses tailored for every fitness level. Meet instructors who bring passion,
                expertise, and a commitment to helping you become the best version of yourself!
              </p>
            </div>
            <div className="flex space-x-4">
              <Button className="btn-animated bg-green-500 hover:bg-green-600 text-white">Learn More</Button>
              <Button
                variant="outline"
                className="btn-animated border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
