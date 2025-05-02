"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Droplet, Plus, Minus, User, LogOut, LayoutDashboard, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WaterTrackerPage() {
  const [waterIntake, setWaterIntake] = useState(0)
  const [goal, setGoal] = useState(8)
  const [history, setHistory] = useState<{ date: string; amount: number }[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Get water intake data from localStorage
    const fitnessData = localStorage.getItem("fitnessData")
    if (fitnessData) {
      const data = JSON.parse(fitnessData)
      setWaterIntake(data.waterIntake || 0)

      if (data.waterHistory) {
        setHistory(data.waterHistory)
      }
    }
  }, [])

  const updateWaterIntake = (amount: number) => {
    const newIntake = Math.max(0, waterIntake + amount)
    setWaterIntake(newIntake)

    // Update localStorage
    const fitnessData = JSON.parse(localStorage.getItem("fitnessData") || "{}")
    fitnessData.waterIntake = newIntake

    // Update history
    const today = new Date().toISOString().split("T")[0]
    const historyEntry = { date: today, amount: newIntake }

    let updatedHistory = [...history]
    const todayIndex = updatedHistory.findIndex((entry) => entry.date === today)

    if (todayIndex >= 0) {
      updatedHistory[todayIndex] = historyEntry
    } else {
      updatedHistory = [...updatedHistory, historyEntry]
    }

    setHistory(updatedHistory)
    fitnessData.waterHistory = updatedHistory

    localStorage.setItem("fitnessData", JSON.stringify(fitnessData))
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
                {user?.profileImage ? (
                  <Image
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>
          </div>

          <nav className="px-3">
            <Link href="/dashboard" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1">
              <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1">
              <User className="mr-3 h-5 w-5 text-gray-500" />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/water-tracker"
              className="flex items-center px-3 py-3 rounded-lg bg-green-50 text-green-600 mb-1"
            >
              <Droplet className="mr-3 h-5 w-5" />
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
                window.location.href = "/"
              }}
              variant="ghost"
              className="flex items-center w-full justify-start px-3 py-3 hover:bg-gray-100 text-gray-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Water Tracker</h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Today's Water Intake</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 mb-6">
                      <div className="absolute inset-0 rounded-full border-8 border-blue-100"></div>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-full transition-all duration-500"
                        style={{ height: `${Math.min(100, (waterIntake / goal) * 100)}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-5xl font-bold">{waterIntake}</span>
                          <span className="text-xl">/</span>
                          <span className="text-2xl">{goal}</span>
                          <p className="text-gray-500">glasses</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={() => updateWaterIntake(-1)}
                        disabled={waterIntake <= 0}
                      >
                        <Minus className="h-6 w-6" />
                      </Button>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 h-16 w-16 rounded-full"
                        onClick={() => updateWaterIntake(1)}
                      >
                        <Plus className="h-8 w-8" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={() => updateWaterIntake(0.5)}
                      >
                        <span className="text-sm font-medium">+0.5</span>
                      </Button>
                    </div>

                    <Progress value={(waterIntake / goal) * 100} className="h-2 w-full max-w-md" />
                    <p className="mt-2 text-sm text-gray-500">
                      {waterIntake < goal
                        ? `${goal - waterIntake} more glasses to reach your daily goal`
                        : "Daily goal reached! Great job!"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Benefits of Staying Hydrated</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Droplet className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Improves physical performance during exercise</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Helps maintain energy levels and brain function</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Aids digestion and prevents constipation</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Helps regulate body temperature</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Keeps skin looking healthy and hydrated</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Weekly History</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500"
                      onClick={() => {
                        setWaterIntake(0)
                        const fitnessData = JSON.parse(localStorage.getItem("fitnessData") || "{}")
                        fitnessData.waterIntake = 0
                        localStorage.setItem("fitnessData", JSON.stringify(fitnessData))
                      }}
                    >
                      Reset Today
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {history.length > 0 ? (
                    <div className="space-y-4">
                      {history
                        .slice(-7)
                        .reverse()
                        .map((entry, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                {new Date(entry.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="font-bold mr-2">{entry.amount}</span>
                              <Droplet className="h-5 w-5 text-blue-500" />
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">No history available yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
