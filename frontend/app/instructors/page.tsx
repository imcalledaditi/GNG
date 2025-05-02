"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const instructors = [
  {
    name: "Noel Deyzel",
    image: "/images/noel.jpg?height=400&width=400",
    category: "men",
    specialization: "Bodybuilding",
    experience: "10+ years",
    bio: "Professional bodybuilder and fitness coach specializing in strength training and muscle development.",
  },
  {
    name: "Jeff Nippard",
    image: "/images/jeff.jpg?height=400&width=400",
    category: "men",
    specialization: "Natural Bodybuilding",
    experience: "12+ years",
    bio: "Natural bodybuilder and fitness coach known for science-based training methods and nutrition advice.",
  },
  {
    name: "Dr. Mike Israetel",
    image: "/images/dr.jpg?height=400&width=400",
    category: "men",
    specialization: "Sports Science",
    experience: "15+ years",
    bio: "PhD in Sport Physiology and co-founder of Renaissance Periodization, specializing in scientific training approaches.",
  },
  {
    name: "Athlean-X",
    image: "/images/x.jpg?height=400&width=400",
    category: "men",
    specialization: "Athletic Performance",
    experience: "20+ years",
    bio: "Physical therapist and strength coach focusing on injury prevention and athletic performance enhancement.",
  },
  {
    name: "Jared Beckstrand",
    image: "/images/jared.png?height=400&width=400",
    category: "men",
    specialization: "Functional Training",
    experience: "8+ years",
    bio: "Certified personal trainer specializing in functional fitness and mobility improvement & providing insights on health.",
  },
  {
    name: "Chloe Ting",
    image: "/images/chloe.jpg?height=400&width=400",
    category: "women",
    specialization: "HIIT Workouts",
    experience: "7+ years",
    bio: "Fitness instructor known for effective high-intensity interval training programs and challenges.",
  },
  {
    name: "Cassie Ho",
    image: "/images/cassieho.jpg?height=400&width=400",
    category: "women",
    specialization: "Pilates & Yoga",
    experience: "9+ years",
    bio: "Certified Pilates instructor ,gym instructor and yoga teacher focusing on core strength and flexibility.",
  },
  {
    name: "Emi Wong",
    image: "/images/emi.jpeg?height=400&width=400",
    category: "women",
    specialization: "Home Workouts",
    experience: "6+ years",
    bio: "Fitness coach specializing in effective home-based workouts that requires the most minimal use of equipment.",
  },
  {
    name: "Sydney Cummings",
    image: "/images/syd.jpg?height=400&width=400",
    category: "women",
    specialization: "Strength Training",
    experience: "10+ years",
    bio: "NASM-certified personal trainer focusing on strength training and functional fitness for women.",
  },
  {
    name: "Madfit",
    image: "/images/maddie.jpg?height=400&width=400",
    category: "women",
    specialization: "Full Body Workouts",
    experience: "8+ years",
    bio: "Fitness instructor known for effective full-body workouts and dance-inspired exercise routines targetting every age group.",
  },
]

export default function InstructorsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredInstructors =
    activeCategory === "all" ? instructors : instructors.filter((instructor) => instructor.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Instructors</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Meet our expert instructors who will guide you through your fitness journey with their knowledge, experience,
          and passion.
        </p>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg shadow-sm p-1">
            <button
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === "all" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("all")}
            >
              ALL
            </button>
            <button
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === "men" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("men")}
            >
              MEN
            </button>
            <button
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === "women" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("women")}
            >
              WOMEN
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInstructors.map((instructor, index) => (
            <Card key={index} className="overflow-hidden card-hover h-[400px]">
              <div className="relative h-48">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{instructor.name}</h3>
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                    {instructor.specialization}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {instructor.experience}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{instructor.bio}</p>
                <Button className="btn-animated bg-green-500 hover:bg-green-600 text-white w-full">View Courses</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
