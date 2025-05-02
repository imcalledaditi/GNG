"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User, Heart, Droplet } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [goal, setGoal] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState("")
  const [profileImage, setProfileImage] = useState("")

  // Nutrition tracking
  const [calories, setCalories] = useState("2200")
  const [protein, setProtein] = useState("120")
  const [carbs, setCarbs] = useState("250")
  const [fat, setFat] = useState("70")

  // Sleep tracking
  const [totalSleep, setTotalSleep] = useState("7.25")
  const [deepSleep, setDeepSleep] = useState("1.75")
  const [lightSleep, setLightSleep] = useState("4.5")
  const [remSleep, setRemSleep] = useState("1")

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setName(parsedUser.name || "")
      setEmail(parsedUser.email || "")
      setProfileImage(parsedUser.profileImage || "")

      // Get profile data if exists
      const profileData = localStorage.getItem("profileData")
      if (profileData) {
        const parsedProfile = JSON.parse(profileData)
        setAge(parsedProfile.age || "")
        setGender(parsedProfile.gender || "male")
        setHeight(parsedProfile.height || "")
        setWeight(parsedProfile.weight || "")
        setGoal(parsedProfile.goal || "")
        setActivityLevel(parsedProfile.activityLevel || "")

        // Calculate BMI
        if (parsedProfile.height && parsedProfile.weight) {
          const heightInMeters = Number(parsedProfile.height) / 100
          const weightInKg = Number(parsedProfile.weight)
          const calculatedBmi = weightInKg / (heightInMeters * heightInMeters)
          setBmi(Number.parseFloat(calculatedBmi.toFixed(1)))

          // Set BMI category
          if (calculatedBmi < 18.5) {
            setBmiCategory("Underweight")
          } else if (calculatedBmi < 25) {
            setBmiCategory("Normal")
          } else if (calculatedBmi < 30) {
            setBmiCategory("Overweight")
          } else {
            setBmiCategory("Obese")
          }
        }
      }

      // Get nutrition data
      const nutritionData = localStorage.getItem("nutritionData")
      if (nutritionData) {
        const parsedNutrition = JSON.parse(nutritionData)
        setCalories(parsedNutrition.calories || "2200")
        setProtein(parsedNutrition.protein || "120")
        setCarbs(parsedNutrition.carbs || "250")
        setFat(parsedNutrition.fat || "70")
      }

      // Get sleep data
      const sleepData = localStorage.getItem("sleepData")
      if (sleepData) {
        const parsedSleep = JSON.parse(sleepData)
        setTotalSleep(parsedSleep.totalSleep || "7.25")
        setDeepSleep(parsedSleep.deepSleep || "1.75")
        setLightSleep(parsedSleep.lightSleep || "4.5")
        setRemSleep(parsedSleep.remSleep || "1")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleSaveProfile = () => {
    setIsLoading(true)
    setMessage({ type: "", text: "" })

    try {
      // Set default profile image based on gender if none selected
      let profileImageToUse = profileImage
      if (!profileImageToUse) {
        if (gender === "female") {
          profileImageToUse =
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female1.jpg-3tKAYSWmUZNVVEAQhTXlMtMKlh1seD.jpeg"
        } else if (gender === "male") {
          profileImageToUse =
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male1.jpg-sl8FBoi0YTFxpUnbsVOR0ukPlnnb8b.jpeg"
        } else {
          profileImageToUse =
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other1.jpg-4RxpSdENgUINWD1gLguVJ5bk6yIssT.jpeg"
        }
      }

      // Update user data
      const updatedUser = {
        ...user,
        name,
        gender,
        profileImage: profileImageToUse,
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      // Update profile data
      const profileData = { age, gender, height, weight, goal, activityLevel }
      localStorage.setItem("profileData", JSON.stringify(profileData))

      // Update nutrition data
      const nutritionData = { calories, protein, carbs, fat }
      localStorage.setItem("nutritionData", JSON.stringify(nutritionData))

      // Update sleep data
      const sleepData = { totalSleep, deepSleep, lightSleep, remSleep }
      localStorage.setItem("sleepData", JSON.stringify(sleepData))

      // Update fitness data for dashboard
      const fitnessData = JSON.parse(localStorage.getItem("fitnessData") || "{}")
      fitnessData.bmi = bmi
      fitnessData.weight = weight
      fitnessData.height = height
      fitnessData.nutritionData = nutritionData
      fitnessData.sleepData = sleepData
      localStorage.setItem("fitnessData", JSON.stringify(fitnessData))

      // Calculate BMI
      if (height && weight) {
        const heightInMeters = Number(height) / 100
        const weightInKg = Number(weight)
        const calculatedBmi = weightInKg / (heightInMeters * heightInMeters)
        setBmi(Number.parseFloat(calculatedBmi.toFixed(1)))

        // Set BMI category
        if (calculatedBmi < 18.5) {
          setBmiCategory("Underweight")
        } else if (calculatedBmi < 25) {
          setBmiCategory("Normal")
        } else if (calculatedBmi < 30) {
          setBmiCategory("Overweight")
        } else {
          setBmiCategory("Obese")
        }
      }

      // Update weight history
      const now = new Date()
      const dateStr = now.toISOString().split("T")[0]
      const weightHistory = JSON.parse(localStorage.getItem("weightHistory") || "[]")

      // Check if we already have an entry for today
      const todayIndex = weightHistory.findIndex((entry: any) => entry.date === dateStr)
      if (todayIndex >= 0) {
        weightHistory[todayIndex].weight = Number(weight)
      } else {
        weightHistory.push({
          date: dateStr,
          weight: Number(weight),
        })
      }

      // Keep only the last 7 entries
      const recentHistory = weightHistory
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7)

      localStorage.setItem("weightHistory", JSON.stringify(recentHistory))

      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." })
    } finally {
      setIsLoading(false)

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 3000)
    }
  }

  const getThemeColor = () => {
    if (gender === "female") return "pink"
    if (gender === "male") return "blue"
    return "orange"
  }

  const themeColor = getThemeColor()

  const getBmiImage = () => {
    if (bmiCategory === "Underweight") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/under1-VDkYCynP0DfhRtUslG2TTT0WueQcys.png"
    } else if (bmiCategory === "Normal") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/normal1-twM55yMnwxa1jZ1p7y0AYPEqIcLib5.png"
    } else if (bmiCategory === "Overweight") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/over1-LyVrVFLRLpf7FslkhhHs07Nec9sfLM.png"
    } else if (bmiCategory === "Obese") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/obese1-qtzQ5r8RKmXIzxLdLU7CXaB3NJ27Dw.png"
    }
    return ""
  }

  const getBmiQuote = () => {
    if (bmiCategory === "Underweight") {
      return "Whoa there, featherweight champ! One strong breeze and you might fly away. Time to beef up—maybe add an extra scoop of ice cream!"
    } else if (bmiCategory === "Normal") {
      return "You're in the Goldilocks zone—not too heavy, not too light, juuust right! Stay awesome, health ninja!"
    } else if (bmiCategory === "Overweight") {
      return "You're carrying a little extra happiness… mostly around the belly! Time to unfriend the fridge and follow a salad influencer!"
    } else if (bmiCategory === "Obese") {
      return "You're in boss mode, but your joints might not agree. Let's show those calories who's really in charge—time for a glow-up!"
    }
    return ""
  }

  const getBmiSliderPosition = () => {
    if (!bmi) return 0
    if (bmi < 18.5) {
      return (bmi / 18.5) * 25
    } else if (bmi < 25) {
      return 25 + ((bmi - 18.5) / 6.5) * 25
    } else if (bmi < 30) {
      return 50 + ((bmi - 25) / 5) * 25
    } else {
      return 75 + Math.min(((bmi - 30) / 10) * 25, 25)
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen border-r border-gray-200 fixed overflow-y-auto">
          <div className="p-6">
            <Link href="/" className="text-2xl font-bold flex items-center text-green-600 mb-8">
              <span>Grub</span>
              <span className="text-green-500">&</span>
              <span>Grind</span>
              <span className="text-green-500">.</span>
            </Link>
          </div>

          <div className="px-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                {profileImage ? (
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt={name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>
          </div>

          <nav className="px-3">
            <Link href="/dashboard" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1">
              <svg
                className="mr-3 h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="7" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="5" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="12" width="7" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="16" width="7" height="5" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center px-3 py-3 rounded-lg bg-green-50 text-green-600 mb-1"
            >
              <User className="mr-3 h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/water-tracker"
              className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1"
            >
              <Droplet className="mr-3 h-5 w-5 text-gray-500" />
              <span>Water Tracker</span>
            </Link>
            <Link href="/dashboard/health" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1">
              <Heart className="mr-3 h-5 w-5 text-gray-500" />
              <span>Health Issues</span>
            </Link>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Button
              onClick={() => {
                localStorage.removeItem("user")
                router.push("/")
              }}
              variant="ghost"
              className="flex items-center w-full justify-start px-3 py-3 hover:bg-gray-100 text-gray-700"
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 8V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H12C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H21M21 12L18 9M21 12L18 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <h1 className="text-2xl font-bold mb-2">Profile Information</h1>
          <p className="text-gray-600 mb-8">Update your personal information and health metrics</p>

          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="fitness">Fitness Profile</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition Tracking</TabsTrigger>
              <TabsTrigger value="sleep">Sleep Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                        {profileImage ? (
                          <Image
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold text-4xl">
                            {name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <p className="text-center mb-2">Select profile picture:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {gender === "female" && (
                            <>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female1.jpg-3tKAYSWmUZNVVEAQhTXlMtMKlh1seD.jpeg"
                                    ? "border-pink-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female1.jpg-3tKAYSWmUZNVVEAQhTXlMtMKlh1seD.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female1.jpg-3tKAYSWmUZNVVEAQhTXlMtMKlh1seD.jpeg"
                                  alt="Female Profile 1"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female2.jpg-FTGpy3lJ1CGxPeD87F4Z5QuDWR1J1W.jpeg"
                                    ? "border-pink-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female2.jpg-FTGpy3lJ1CGxPeD87F4Z5QuDWR1J1W.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female2.jpg-FTGpy3lJ1CGxPeD87F4Z5QuDWR1J1W.jpeg"
                                  alt="Female Profile 2"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female3.jpg-yU3qXeNXi8NqJUinSmivv9aZX85jvU.jpeg"
                                    ? "border-pink-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female3.jpg-yU3qXeNXi8NqJUinSmivv9aZX85jvU.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female3.jpg-yU3qXeNXi8NqJUinSmivv9aZX85jvU.jpeg"
                                  alt="Female Profile 3"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                            </>
                          )}
                          {gender === "male" && (
                            <>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male1.jpg-sl8FBoi0YTFxpUnbsVOR0ukPlnnb8b.jpeg"
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male1.jpg-sl8FBoi0YTFxpUnbsVOR0ukPlnnb8b.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male1.jpg-sl8FBoi0YTFxpUnbsVOR0ukPlnnb8b.jpeg"
                                  alt="Male Profile 1"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male2.jpg-pejhF1ywLkq9amdLIZvs0sST8GHmgb.jpeg"
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male2.jpg-pejhF1ywLkq9amdLIZvs0sST8GHmgb.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male2.jpg-pejhF1ywLkq9amdLIZvs0sST8GHmgb.jpeg"
                                  alt="Male Profile 2"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male3.jpg-vUJowLVHGcrxitIk60PmrbODmkcBCS.jpeg"
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male3.jpg-vUJowLVHGcrxitIk60PmrbODmkcBCS.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male3.jpg-vUJowLVHGcrxitIk60PmrbODmkcBCS.jpeg"
                                  alt="Male Profile 3"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                            </>
                          )}
                          {gender === "other" && (
                            <>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other1.jpg-4RxpSdENgUINWD1gLguVJ5bk6yIssT.jpeg"
                                    ? "border-orange-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other1.jpg-4RxpSdENgUINWD1gLguVJ5bk6yIssT.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other1.jpg-4RxpSdENgUINWD1gLguVJ5bk6yIssT.jpeg"
                                  alt="Other Profile 1"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other2.jpg-WBtZQnmDXuRjsptv2t0XIhugWkFVlA.jpeg"
                                    ? "border-orange-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other2.jpg-WBtZQnmDXuRjsptv2t0XIhugWkFVlA.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other2.jpg-WBtZQnmDXuRjsptv2t0XIhugWkFVlA.jpeg"
                                  alt="Other Profile 2"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                              <button
                                className={`w-full aspect-square rounded-md overflow-hidden border-2 ${
                                  profileImage ===
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other3.jpg-4khrcFWv1WXru3zgH77EnEq5gnZcWP.jpeg"
                                    ? "border-orange-500"
                                    : "border-transparent"
                                }`}
                                onClick={() =>
                                  setProfileImage(
                                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other3.jpg-4khrcFWv1WXru3zgH77EnEq5gnZcWP.jpeg",
                                  )
                                }
                              >
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/other3.jpg-4khrcFWv1WXru3zgH77EnEq5gnZcWP.jpeg"
                                  alt="Other Profile 3"
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={email} readOnly disabled />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Your age"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fitness">
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Your height in cm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Your weight in kg"
                      />
                    </div>
                  </div>

                  {bmi !== null && (
                    <div className="mt-8">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-lg font-medium">BMI (Body Mass Index)</h3>
                          <p className="text-sm text-gray-500">Based on your height and weight</p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold">{bmi}</span>
                          <p
                            className={`text-sm ${
                              bmiCategory === "Underweight"
                                ? "text-blue-500"
                                : bmiCategory === "Normal"
                                  ? "text-green-500"
                                  : bmiCategory === "Overweight"
                                    ? "text-yellow-500"
                                    : "text-red-500"
                            }`}
                          >
                            {bmiCategory}
                          </p>
                        </div>
                      </div>

                      <div className="h-4 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden relative">
                        <div
                          className="absolute top-0 h-full w-1 bg-white border-2 border-gray-800 transform -translate-x-1/2"
                          style={{ left: `${getBmiSliderPosition()}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs mt-1">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                      </div>

                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center">
                          <div className="mr-4 w-16 h-16">
                            <Image
                              src={getBmiImage() || "/placeholder.svg"}
                              alt={bmiCategory}
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          </div>
                          <p className="text-sm">{getBmiQuote()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal">Fitness Goal</Label>
                      <Select value={goal} onValueChange={setGoal}>
                        <SelectTrigger id="goal">
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose-weight">Lose Weight</SelectItem>
                          <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                          <SelectItem value="maintain">Maintain Weight</SelectItem>
                          <SelectItem value="improve-fitness">Improve Fitness</SelectItem>
                          <SelectItem value="increase-flexibility">Increase Flexibility</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="activity-level">Activity Level</Label>
                      <Select value={activityLevel} onValueChange={setActivityLevel}>
                        <SelectTrigger id="activity-level">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                          <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                          <SelectItem value="very-active">Very active (very hard exercise & physical job)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="calories">Daily Calorie Target</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="Calories in kcal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protein">Daily Protein Target (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        placeholder="Protein in grams"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="carbs">Daily Carbs Target (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        placeholder="Carbs in grams"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fat">Daily Fat Target (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                        placeholder="Fat in grams"
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-medium mb-2">Macronutrient Distribution</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Protein</p>
                        <p className="font-bold">
                          {Math.round(
                            ((Number(protein) * 4) / (Number(protein) * 4 + Number(carbs) * 4 + Number(fat) * 9)) * 100,
                          )}
                          %
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Carbs</p>
                        <p className="font-bold">
                          {Math.round(
                            ((Number(carbs) * 4) / (Number(protein) * 4 + Number(carbs) * 4 + Number(fat) * 9)) * 100,
                          )}
                          %
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Fat</p>
                        <p className="font-bold">
                          {Math.round(
                            ((Number(fat) * 9) / (Number(protein) * 4 + Number(carbs) * 4 + Number(fat) * 9)) * 100,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Recommended distribution: 10-35% protein, 45-65% carbs, 20-35% fat
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sleep">
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="totalSleep">Total Sleep (hours)</Label>
                      <Input
                        id="totalSleep"
                        type="number"
                        step="0.25"
                        value={totalSleep}
                        onChange={(e) => setTotalSleep(e.target.value)}
                        placeholder="Total sleep in hours"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deepSleep">Deep Sleep (hours)</Label>
                      <Input
                        id="deepSleep"
                        type="number"
                        step="0.25"
                        value={deepSleep}
                        onChange={(e) => setDeepSleep(e.target.value)}
                        placeholder="Deep sleep in hours"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="lightSleep">Light Sleep (hours)</Label>
                      <Input
                        id="lightSleep"
                        type="number"
                        step="0.25"
                        value={lightSleep}
                        onChange={(e) => setLightSleep(e.target.value)}
                        placeholder="Light sleep in hours"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remSleep">REM Sleep (hours)</Label>
                      <Input
                        id="remSleep"
                        type="number"
                        step="0.25"
                        value={remSleep}
                        onChange={(e) => setRemSleep(e.target.value)}
                        placeholder="REM sleep in hours"
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-medium mb-2">Sleep Cycle Distribution</h3>
                    <div className="h-8 bg-gray-200 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${(Number(deepSleep) / Number(totalSleep)) * 100}%` }}
                        title="Deep Sleep"
                      ></div>
                      <div
                        className="h-full bg-blue-400"
                        style={{ width: `${(Number(lightSleep) / Number(totalSleep)) * 100}%` }}
                        title="Light Sleep"
                      ></div>
                      <div
                        className="h-full bg-blue-300"
                        style={{ width: `${(Number(remSleep) / Number(totalSleep)) * 100}%` }}
                        title="REM Sleep"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Deep Sleep: {Math.round((Number(deepSleep) / Number(totalSleep)) * 100)}%</span>
                      <span>Light Sleep: {Math.round((Number(lightSleep) / Number(totalSleep)) * 100)}%</span>
                      <span>REM Sleep: {Math.round((Number(remSleep) / Number(totalSleep)) * 100)}%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Recommended: 7-9 hours total sleep with 15-25% deep sleep, 50-60% light sleep, and 20-25% REM
                      sleep
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {message.text && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
