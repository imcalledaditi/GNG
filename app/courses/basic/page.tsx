"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  "WARM UP",
  "STRETCHING",
  "BEGINNER CARDIO",
  "BASIC STRENGTH",
  ]

const workouts = [
  {
    title: "Beginner Friendly Warm Up",
    instructor: "MadFit",
    duration: "5m",
    image: "/placeholder.svg?height=300&width=300",
    category: "WARM UP",
    link: "https://youtube.com/watch?v=example1",
  },
  {
    title: "Beginner Friendly Warm Up",
    instructor: "MadFit",
    duration: "5m",
    image: "/placeholder.svg?height=300&width=300",
    category: "WARM UP",
    link: "https://youtube.com/watch?v=example1",
  },
  {
    title: "Beginner Friendly Warm Up",
    instructor: "MadFit",
    duration: "5m",
    image: "/placeholder.svg?height=300&width=300",
    category: "WARM UP",
    link: "https://youtube.com/watch?v=example1",
  },
  {
    title: "Beginner Friendly Warm Up",
    instructor: "MadFit",
    duration: "5m",
    image: "/placeholder.svg?height=300&width=300",
    category: "WARM UP",
    link: "https://youtube.com/watch?v=example1",
  },


  
  {
    title: "Full Body Stretching Routine",
    instructor: "Cassie Ho",
    duration: "10m",
    image: "/placeholder.svg?height=300&width=300",
    category: "STRETCHING",
    link: "https://youtube.com/watch?v=example2",
  },
  {
    title: "Full Body Stretching Routine",
    instructor: "Cassie Ho",
    duration: "10m",
    image: "/placeholder.svg?height=300&width=300",
    category: "STRETCHING",
    link: "https://youtube.com/watch?v=example2",
  },
  {
    title: "Full Body Stretching Routine",
    instructor: "Cassie Ho",
    duration: "10m",
    image: "/placeholder.svg?height=300&width=300",
    category: "STRETCHING",
    link: "https://youtube.com/watch?v=example2",
  },
  {
    title: "Full Body Stretching Routine",
    instructor: "Cassie Ho",
    duration: "10m",
    image: "/placeholder.svg?height=300&width=300",
    category: "STRETCHING",
    link: "https://youtube.com/watch?v=example2",
  },
  {
    title: "Full Body Stretching Routine",
    instructor: "Cassie Ho",
    duration: "10m",
    image: "/placeholder.svg?height=300&width=300",
    category: "STRETCHING",
    link: "https://youtube.com/watch?v=example2",
  },


  {
    title: "Beginner Cardio Workout",
    instructor: "Chloe Ting",
    duration: "15m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BEGINNER CARDIO",
    link: "https://youtube.com/watch?v=example3",
  },
  {
    title: "Beginner Cardio Workout",
    instructor: "Chloe Ting",
    duration: "15m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BEGINNER CARDIO",
    link: "https://youtube.com/watch?v=example3",
  },
  {
    title: "Beginner Cardio Workout",
    instructor: "Chloe Ting",
    duration: "15m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BEGINNER CARDIO",
    link: "https://youtube.com/watch?v=example3",
  },
  {
    title: "Beginner Cardio Workout",
    instructor: "Chloe Ting",
    duration: "15m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BEGINNER CARDIO",
    link: "https://youtube.com/watch?v=example3",
  },
  


  {
    title: "Basic Strength Training",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BASIC STRENGTH",
    link: "https://youtube.com/watch?v=example4",
  },
  {
    title: "Basic Strength Training",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BASIC STRENGTH",
    link: "https://youtube.com/watch?v=example4",
  },
  {
    title: "Basic Strength Training",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BASIC STRENGTH",
    link: "https://youtube.com/watch?v=example4",
  },
  {
    title: "Basic Strength Training",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/placeholder.svg?height=300&width=300",
    category: "BASIC STRENGTH",
    link: "https://youtube.com/watch?v=example4",
  },


  ]

export default function BasicCoursePage() {
  const [activeCategory, setActiveCategory] = useState("WARM UP")

  const filteredWorkouts = workouts.filter((workout) => workout.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Basic Course</h1>
          <p className="text-xl max-w-2xl">
            Start strong! A beginner-friendly program to build strength, endurance, and flexibility at your own pace.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories sidebar */}
          <div className="md:w-64 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeCategory === category ? "bg-green-100 text-green-800" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${
                      activeCategory === category ? "bg-green-500" : "border border-gray-300"
                    }`}
                  ></div>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Workout videos */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">{activeCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout, index) => (
                <Link href={workout.link} target="_blank" key={index}>
                  <Card className="overflow-hidden card-hover h-full">
                    <div className="relative h-48">
                      <Image
                        src={workout.image || "/placeholder.svg"}
                        alt={workout.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-sm">
                        {workout.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{workout.title}</h3>
                      <p className="text-gray-600 text-sm">~ {workout.instructor}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
