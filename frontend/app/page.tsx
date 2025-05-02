import Hero from "@/components/hero"
import AboutUs from "@/components/about-us"
import CourseCategories from "@/components/course-categories"
import ChatbotSection from "@/components/chatbot-section"
import FitnessNutritionCourses from "@/components/fitness-nutrition-courses"
import BlogSection from "@/components/blog-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CourseCategories />
      <AboutUs />
      <FitnessNutritionCourses />
      <ChatbotSection />
      <BlogSection />
    </div>
  )
}
