import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const blogs = [
  {
    month: "Mar",
    title: "The Joy of Eating Blog",
    likes: "57.8K",
    shares: "5.8K",
    content:
      "Rachael Hartley, a registered dietitian, shares inspiring recipes and expert advice on intuitive eating, helping you cultivate a healthy, balanced, and joyful relationship with food.",
    link: "https://www.rachaelhartleynutrition.com/blog",
  },
  {
    month: "Apr",
    title: "The Balanced Plate",
    likes: "94.5K",
    shares: "38K",
    content:
      "Live Forever Lab features articles by Dr. Emily Carter, MD, covering longevity, wellness, and cutting-edge health research. Her insights focus on science-backed strategies for healthy aging.",
    link: "https://liveforeverlab.com/author/dr-emily-carter-md/",
  },
  {
    month: "Aug",
    title: "Women's Health Blogs",
    likes: "73.2K",
    shares: "43.2K",
    content:
      "PlushCare's Top 10 Women's Health Blogs provides expert-backed insights on fitness, nutrition, and mental health. It features curated resources to help women stay informed.",
    link: "https://plushcare.com/blog/top-10-womens-health-blogs/?utm_source=chatgpt.com",
  },
]

export default function BlogSection() {
  return (
    <section id="blog-section" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-green-500 text-center mb-2">OUR BLOGS</h2>
        <h3 className="text-5xl font-bold text-gray-800 text-center mb-10">Your Latest Health Boost!</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Card key={index} className="bg-white shadow-md overflow-hidden card-hover h-[420px] flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-green-800 text-white w-16 h-16 flex items-center justify-center mb-4 rounded-lg shadow-md">
                  <span className="font-bold">{blog.month}</span>
                </div>

                <div className="text-sm text-gray-500 mb-4 flex items-center">
                  <span className="mr-3">{blog.likes} Likes</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="ml-3">{blog.shares} Shares</span>
                </div>

                <h3 className="text-2xl font-bold mb-4">{blog.title}</h3>

                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{blog.content}</p>

                <div className="mt-auto flex justify-center">
                  <Link href={blog.link}>
                    <Button className="btn-animated bg-yellow-500 hover:bg-yellow-600 text-black w-40">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
