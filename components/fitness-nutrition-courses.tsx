"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const courseCategories = [
  "Kids' Recipes",
  "Food & Health",
  "Pregnancy Nutrition",
  "Fitness Expertise",
  "Exercise Hacks",
  "Weight Loss Plan",
]

const courses = [
  {
    title: "Kids' Recipes",
    videos: 47,
    instructor: "Maya Adam",
    description:
      "A whole food, plant-predominant diet can help prevent and treat chronic illnesses. Teaching kids nutritious recipes that focus on fruits, vegetables.",
    detailedDescription:
      "This course offers 47 fun and nutritious recipes designed specifically for children. Learn how to make healthy meals that kids will actually enjoy eating! From colorful fruit parfaits to veggie-packed pasta dishes, these recipes will help establish healthy eating habits early in life.",
    image: "/images/kid.jpg?height=300&width=400",
    category: "Kids' Recipes",
    link: "https://www.youtube.com/playlist?list=PLB0AYRZmsMalvNbfs1qMWUeB2YF3CcOgI",
  },
  {
    title: "Food & Health",
    videos: 17,
    instructor: "Maya Adam",
    description:
      "Regular physical activity is essential for maintaining a healthy weight. Aim for at least 32 minutes of exercise daily to boost cardiovascular health.",
    detailedDescription:
      "Explore the deep connection between nutrition and overall health with 17 comprehensive videos. This course covers the science of nutrition, how different foods affect your body, and practical ways to improve your diet for better health outcomes and disease prevention.",
    image: "/images/healthy.jpg?height=300&width=400",
    category: "Food & Health",
    link: "https://www.youtube.com/playlist?list=PLB0AYRZmsMake5dK42lB2hkSlRgpDVsWl",
  },
  {
    title: "Pregnancy Nutrition",
    videos: 28,
    instructor: "Dr Supriya Puranik",
    description:
      "Nutrition during pregnancy is vital for both mother and baby. A balanced diet with fruits, vegetables, whole grains, and lean proteins.",
    detailedDescription:
      "Designed specifically for expectant mothers, this 28-video course provides essential guidance on proper nutrition during pregnancy. Learn which nutrients are crucial for fetal development, how to manage common pregnancy-related food issues, and meal planning for each trimester.",
    image: "/images/prego.jpg?height=300&width=400",
    category: "Pregnancy Nutrition",
    link: "https://www.youtube.com/playlist?list=PLG98j67a-FKkYfNmnnhO_0hfX21OgO9lW",
  },
  {
    title: "Fitness Expertise",
    videos: 35,
    instructor: "John Smith",
    description:
      "Master advanced fitness techniques with expert guidance. These comprehensive tutorials will help you perfect your form and maximize results.",
    detailedDescription:
      "Take your fitness knowledge to the next level with 35 expert-led videos. This advanced course covers proper form for complex exercises, programming principles, recovery techniques, and how to optimize your workouts for specific goals like strength, hypertrophy, or endurance.",
    image: "/images/sebum.jpg?height=300&width=400",
    category: "Fitness Expertise",
    link: "https://www.youtube.com/playlist?list=PLFfhO7WNmG6o3pI-0wby-8d25eNmowfpT",
  },
  {
    title: "Exercise Hacks",
    videos: 22,
    instructor: "Frank Tracy",
    description:
      "Discover time-saving exercise hacks that deliver maximum results in minimum time. Perfect for busy professionals who want to stay fit.",
    detailedDescription:
      "Short on time but still want results? This 22-video series provides clever exercise hacks to maximize efficiency. Learn about time-saving workout techniques, multi-joint exercises, circuit training methods, and how to get an effective workout in just 20-30 minutes.",
    image: "/images/tranier.jpeg?height=300&width=400",
    category: "Exercise Hacks",
    link: "https://www.youtube.com/playlist?list=PLTgHf_B4EipZyLCydl0jkgfj9otk7N84F",
  },
  {
    title: "Weight Loss Plan",
    videos: 41,
    instructor: "Chloe Ting",
    description:
      "A comprehensive weight loss program combining nutrition advice and targeted exercises to help you achieve sustainable results.",
    detailedDescription:
      "This comprehensive 41-video weight loss program combines science-based nutrition principles with effective exercise routines. Learn about calorie deficits, metabolic adaptation, sustainable eating patterns, and progressive workout plans that lead to long-term weight management success.",
    image: "/images/woman.jpg?height=300&width=400",
    category: "Weight Loss Plan",
    link: "https://www.youtube.com/playlist?list=PLAFs3kxY4h19s58CCweEFjPflDTrMbKmY",
  },
]

export default function FitnessNutritionCourses() {
  const [activeCategory, setActiveCategory] = useState("Kids' Recipes")
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredCourses = courses.filter((course) => course.category === activeCategory)

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < filteredCourses.length - 3) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Fitness & Nutrition Courses</h2>

        <div className="flex overflow-x-auto space-x-4 py-4 mb-8 no-scrollbar">
          {courseCategories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 whitespace-nowrap rounded-full transition-all duration-300 ${
                category === activeCategory ? "text-white bg-green-500 shadow-md" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveCategory(category)
                setCurrentIndex(0)
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative py-8">
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{
              transform: `translateX(-${currentIndex * 33.33}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {filteredCourses.map((course, index) => (
              <div key={index} className="relative group">
                <Card className="overflow-hidden card-hover h-[400px] flex flex-col">
                  <div className="relative h-64">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <Link
                      href={course.link}
                      target="_blank"
                      className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-xl font-bold">{course.videos} videos</span>
                      <p className="text-sm text-gray-500">by {course.instructor}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                    <p className="text-gray-600 text-sm flex-grow">{course.description}</p>
                    <Link
                      href={course.link}
                      target="_blank"
                      className="mt-4 inline-flex items-center text-green-500 hover:text-green-600 transition-colors"
                    >
                      Watch Videos <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                {/* Slide-out detailed description */}
                <div className="absolute top-0 -right-full w-full h-full bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-[calc(100%+1rem)] z-10 overflow-hidden">
                  <h3 className="text-xl font-bold mb-4 text-green-600">{course.title}</h3>
                  <p className="text-gray-700">{course.detailedDescription}</p>
                  <div className="absolute bottom-6 right-6">
                    <Link
                      href={course.link}
                      target="_blank"
                      className="inline-flex items-center text-green-500 hover:text-green-600 transition-colors"
                    >
                      Explore Course <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length > 3 && (
            <>
              <button
                className={`absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 z-10 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{ top: "50%" }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className={`absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 z-10 ${currentIndex >= filteredCourses.length - 3 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                onClick={handleNext}
                disabled={currentIndex >= filteredCourses.length - 3}
                style={{ top: "50%" }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
