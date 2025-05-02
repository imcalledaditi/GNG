import Link from "next/link"
import { ArrowRight } from "lucide-react"

const courses = [
  {
    title: "Women's Course",
    description:
      "Tone, sculpt, and energize! Boost confidence with workouts designed to transform your fitness journey.",
    icon: "👟",
    link: "/courses/women",
  },
  {
    title: "Basic Course",
    description:
      "Start strong! A beginner-friendly program to build strength, endurance, and flexibility at your own pace.",
    icon: "🪷",
    link: "/courses/basic",
  },
  {
    title: "Men's Course",
    description: "Push limits, build muscle, and dominate your fitness game with targeted, high-performance workouts.",
    icon: "🏋️",
    link: "/courses/men",
  },
]

export default function CourseCategories() {
  return (
    <section id="all-course" className="py-28 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Specialized Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {courses.map((course, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <Link href={course.link} className="w-full">
                <div className="relative">
                  <div className="bg-gray-200 rounded-full w-40 h-40 flex items-center justify-center mb-8 mx-auto course-icon group-hover:bg-green-100 transition-all duration-300">
                    <span className="text-6xl">{course.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4 group-hover:text-green-500 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 mb-6 px-4">{course.description}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Dividers */}
          <div className="hidden md:block absolute left-1/3 top-1/4 bottom-1/4 w-px bg-gray-200 opacity-50"></div>
          <div className="hidden md:block absolute left-2/3 top-1/4 bottom-1/4 w-px bg-gray-200 opacity-50"></div>
        </div>
      </div>
    </section>
  )
}
