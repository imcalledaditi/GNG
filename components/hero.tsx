import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative bg-black text-white min-h-[90vh] flex items-center">
      {/* Video background container */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl fade-in">
          <div className="text-green-500 font-medium mb-4 tracking-wider">FITNESS & NUTRITION</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            This lifestyle fuels your fitness, not just your meals.
          </h1>
          <p className="text-xl mb-8 italic">"Food is fuel, not therapy"</p>

          <Link href="/login">
            <Button className="btn-animated bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg rounded-full">
              Start Course
            </Button>
          </Link>

          <div className="mt-16 fade-in-delay-2">
            <p className="mb-4 text-gray-300">Connect with us:</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors hover:text-green-500 transform hover:scale-110 duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors hover:text-green-500 transform hover:scale-110 duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors hover:text-green-500 transform hover:scale-110 duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors hover:text-green-500 transform hover:scale-110 duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
