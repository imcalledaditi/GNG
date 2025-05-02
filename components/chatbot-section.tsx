import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ChatbotSection() {
  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Video background container */}
      <div className="absolute inset-0 z-0">
        {/* This is where you'll add your video */}
        <div className="w-full h-full bg-black">
          {/* Replace this comment with your video element */}
          {  
          <video 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/images/chatbot.mp4" type="video/mp4" />
          </video> 
          }
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h2 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              CHATBOT
            </h2>
            <p className="text-4xl font-light text-green-500 mb-8">TECHNOLOGY</p>

            <p className="mb-8 text-lg leading-relaxed">
              Experience the next generation of AI-powered fitness assistance. Our chatbot provides personalized workout
              plans, real-time feedback, and motivation to help you achieve your fitness goals.
            </p>

            <Link href="/chatbot">
              <Button className="btn-animated bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-full text-lg font-medium">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="relative h-[400px] fade-in-delay-1 flex justify-center items-center">
            {/* Empty space for your video content if needed */}
          </div>
        </div>
      </div>
    </section>
  )
}
