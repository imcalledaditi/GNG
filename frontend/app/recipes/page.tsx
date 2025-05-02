"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const recipeCategories = [
  {
    title: "Budget Meals",
    description:
      "Explore wallet-friendly recipes that transform everyday pantry staples into nutritious, affordable meals without compromising on flavor!",
    recipes: [
      {
        title: "Vegan Curried Egg Sandwich",
        rating: 4.3,
        image: "/images/bud1.jpeg?height=300&width=300",
         link: "https://chloeting.com/recipes/vegan-curried-egg-sandwich"
      },
      {
        title: "Falafel Waffles",
        rating: 4.4,
        image: "/images/bud2.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/falafel-waffles"
      },
      {
        title: "Healthy Sausage Egg McMuffin",
        rating: 4.5,
        image: "/images/bud3.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/healthy-sausage-egg-mcmuffin"
      },
      {
        title: "Lemon Garlic Chicken Zoodles",
        rating: 4.6,
        image: "/images/bud4.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/lemon-garlic-chicken-zoodles"
      },
    ],
  },
  {
    title: "Easy Breakfast Ideas",
    description:
      "Kickstart your morning with these quick and effortless breakfast ideas, perfect for busy days and meal prep enthusiasts!",
    recipes: [
      {
        title: "Breakfast Berry Parfait",
        rating: 4.3,
        image: "/images/break1.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/breakfast-berry-parfait"
      },
      {
        title: "Fancy Avocado Toasts",
        rating: 4.4,
        image: "/images/break2.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/fancy-avocado-toasts",
        
      },
      {
        title: "Shamrock Smoothie",
        rating: 4.5,
        image: "/images/break3.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/shamrock-smoothie",
      },
      {
        title: "Healthy Banana Almond Oatmeal",
        rating: 4.6,
        image: "/images/break4.jpeg?height=300&width=300",
         link: "https://chloeting.com/recipes/healthy-banana-almond-oatmeal",
      },
    ],
  },
  {
    title: "Healthy Drinks Recipes",
    description:
      "Sip your way to wellness with refreshing and nourishing drink recipes, from energizing smoothies to indulgent homemade boba!",
    recipes: [
      {
        title: "Sugar-Free Lemonade",
        rating: 4.3,
        image: "/images/drink1.jpeg?height=300&width=300",
         link: "https://chloeting.com/recipes/sugar-free-lemonade",
      },
      {
        title: "Matcha Latte with Mini Taro Balls",
        rating: 4.4,
        image: "/images/drink2.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/matcha-latte-with-mini-taro-balls"
      },
      {
        title: "Milk Tea with Coffee Jelly",
        rating: 4.5,
        image: "/images/drink3.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/milk-tea-with-coffee-jelly"
      },
      {
        title: "3-Ingredient Strawberry Boba",
        rating: 4.6,
        image: "/images/drink4.jpeg?height=300&width=300",
         link: "https://chloeting.com/recipes/3-ingredient-strawberry-boba"
      },
    ],
  },
  {
    title: "Easy Vegan Recipes",
    description:
      "Enjoy a variety of simple, plant-based recipes that are free from dairy, meat, and eggs, making vegan eating both delicious and accessible!",
    recipes: [
      {
        title: "Chickpea Burgers",
        rating: 4.3,
        image: "/images/vegan1.jpeg?height=300&width=300",
        link: "https://chloeting.com/recipes/chickpea-burgers"
      },
      {
        title: "BBQ Shredded Tofu Tacos",
        rating: 4.4,
        image: "/images/vegan2.jpeg?height=300&width=300",
            link: "https://chloeting.com/recipes/bbq-shredded-tofu-tacos"
      },
      {
        title: "Hidden Veggie Red Sauce",
        rating: 4.5,
        image: "/images/vegan3.jpeg?height=300&width=300",
          link: "https://chloeting.com/recipes/hidden-veggie-red-sauce"
      },
      {
        title: "Sesame Orange Cauliflower",
        rating: 4.6,
        image: "/images/vegan4.jpeg?height=300&width=300",
        
      },
    ],
  },
]

const featuredRecipes = [
  {
    title: "Vegan Mocha Yogurt Bowl",
    rating: 4.3,
    image: "/images/feature1.jpeg?height=300&width=300",
    
    link: "https://chloeting.com/recipes/vegan-mocha-yogurt-bowl"
  },
  {
    title: "Backed Avocado Eggs",
    rating: 4.6,
    image: "/images/feature2.jpeg?height=300&width=300",
   
    link: "https://chloeting.com/recipes/baked-avocado-eggs"
  },
  {
    title: "Oven Baked Popcorn Chicken",
    rating: 4.5,
    image: "/images/feature3.jpeg?height=300&width=300",
    
    link: "https://chloeting.com/recipes/oven-baked-popcorn-chicken"
  },
  {
    title: "Oil-Free Chipotle Spiced Nuts",
    rating: 4.5,
    image: "/images/feature4.jpeg?height=300&width=300",
    
    link: "https://chloeting.com/recipes/oil-free-chipotle-spiced-nuts"
  },
]


export default function RecipesPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isImageAnimated, setIsImageAnimated] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Trigger chef image animation periodically
  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (isPanelOpen) {
        setIsImageAnimated(true)
        setTimeout(() => setIsImageAnimated(false), 1000)
      }
    }, 5000)

    return () => clearInterval(animationInterval)
  }, [isPanelOpen])

  return (
    <div className="min-h-screen relative">
      {/* Featured Recipes */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Recipes</h2>
            <Button variant="outline" className="border-gray-300">
              View All
            </Button>
          </div>

          <p className="text-gray-600 mb-8">
            Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out
            why everyone is raving about them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Link href={recipe.link || "#"} target="_blank" className="block h-full">
                  <div className="relative">
                    <Image
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/80 rounded-full px-2 py-1 text-sm flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{recipe.rating}</span>
                    </div>
                    <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="absolute top-2 right-10 bg-white rounded-full p-1">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    
                    <h3 className="font-medium">{recipe.title}</h3>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Categories */}
      {recipeCategories.map((category, index) => (
        <section key={index} className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <Button variant="outline" className="border-gray-300">
                View All
              </Button>
            </div>

            <p className="text-gray-600 mb-8">{category.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.recipes.map((recipe, recipeIndex) => (
                <Card
                  key={recipeIndex}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <Link href={recipe.link || "#"} target="_blank" className="block h-full">
                    <div className="relative">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white/80 rounded-full px-2 py-1 text-sm flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{recipe.rating}</span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button className="absolute top-2 right-10 bg-white rounded-full p-1">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{recipe.title}</h3>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Enhanced Pop-out Panel */}
      <div
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 transition-all duration-500 ease-in-out z-50 ${
          isPanelOpen ? "translate-x-0" : "translate-x-[calc(100%-48px)]"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-gradient-to-r from-green-600 to-green-500 text-white p-3 rounded-l-xl shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-600 ${
            isPanelOpen ? "animate-pulse" : ""
          }`}
          aria-label={isPanelOpen ? "Close recipe panel" : "Open recipe panel"}
        >
          {isPanelOpen ? (
            <ChevronRight className="h-6 w-6 animate-bounce-horizontal" />
          ) : (
            <ChevronLeft className="h-6 w-6 animate-bounce-horizontal" />
          )}
        </button>

        {/* Panel Content */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-l-2xl shadow-2xl w-96 overflow-hidden border-l border-t border-b border-green-900">
          {/* Top decorative pattern */}
          <div className="h-8 bg-gradient-to-r from-stone-800 to-green-800 w-full"></div>

          <div className="p-6">
            {/* Chef Image with Animation */}
            <div className="relative w-full h-80 mb-6 flex justify-center">
              <div className={`transform transition-all duration-500 ${isImageAnimated ? "scale-110" : "scale-100"}`}>
              <Image
                src="/images/cook.png"
                alt="Chef with food"
                width={280}
                height={300}
                className={`object-contain drop-shadow-xl ${isImageAnimated ? "animate-subtle-bounce" : ""}`}
                onError={(e) => (e.currentTarget.src = '/images/fallback.png')} // Fallback image
                  />
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-2xl mb-6 relative border border-green-200 shadow-md">
              {/* Speech bubble triangle */}
              <div className="absolute -top-3 left-10 w-6 h-6 bg-green-100 transform rotate-45 border-l border-t border-green-200"></div>

              <p className="text-center font-medium text-green-800 text-lg leading-relaxed">
                Hungry for more? Check out our complete collection of mouthwatering recipes!
              </p>
            </div>

            {/* Button with hover effect */}
            <a
      href="https://chloeting.com/recipes"
  target="_blank"
  rel="noopener noreferrer"
  className="block"
>
  <Button
    className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
      isButtonHovered
        ? "bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg transform -translate-y-1"
        : "bg-gradient-to-r from-green-600 to-green-500"
    }`}
    onMouseEnter={() => setIsButtonHovered(true)}
    onMouseLeave={() => setIsButtonHovered(false)}
  >
    <span className="mr-2">🍽️</span> Explore All Recipes
  </Button>
</a>

            {/* Additional text */}
            <p className="text-center text-green-600 mt-4 text-sm font-medium">New recipes added weekly!</p>
          </div>

          {/* Bottom decorative pattern */}
          <div className="h-8 bg-gradient-to-r from-green-800 to-stone-800 w-full"></div>
        </div>
      </div>
    </div>
  )
}