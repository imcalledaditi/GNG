"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { User, Heart, Droplet, LogOut, LayoutDashboard, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HealthIssuesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [healthIssues, setHealthIssues] = useState<string[]>([])
  const [newIssue, setNewIssue] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))

      // Get health issues if they exist
      const healthData = localStorage.getItem("healthIssues")
      if (healthData) {
        setHealthIssues(JSON.parse(healthData))
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleAddIssue = () => {
    if (!newIssue.trim()) return

    const updatedIssues = [...healthIssues, newIssue.trim()]
    setHealthIssues(updatedIssues)
    localStorage.setItem("healthIssues", JSON.stringify(updatedIssues))
    setNewIssue("")

    setMessage({ type: "success", text: "Health issue added successfully!" })
    setTimeout(() => setMessage({ type: "", text: "" }), 3000)
  }

  const handleRemoveIssue = (index: number) => {
    const updatedIssues = healthIssues.filter((_, i) => i !== index)
    setHealthIssues(updatedIssues)
    localStorage.setItem("healthIssues", JSON.stringify(updatedIssues))

    setMessage({ type: "success", text: "Health issue removed successfully!" })
    setTimeout(() => setMessage({ type: "", text: "" }), 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddIssue()
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
                {user.profileImage ? (
                  <Image
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
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
              className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1"
            >
              <Droplet className="mr-3 h-5 w-5 text-gray-500" />
              <span>Water Tracker</span>
            </Link>
            <Link
              href="/dashboard/health"
              className="flex items-center px-3 py-3 rounded-lg bg-green-50 text-green-600 mb-1"
            >
              <Heart className="mr-3 h-5 w-5" />
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
          <h1 className="text-2xl font-bold mb-2">Health Issues</h1>
          <p className="text-gray-600 mb-8">Track and manage your health conditions</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add Health Issue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter health condition or allergy..."
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button onClick={handleAddIssue} className="bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>

              {message.text && (
                <div
                  className={`mt-4 p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {message.text}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Health Issues</CardTitle>
            </CardHeader>
            <CardContent>
              {healthIssues.length > 0 ? (
                <div className="space-y-2">
                  {healthIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 text-red-500 mr-2" />
                        <span>{issue}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveIssue(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No health issues added yet.</p>
                  <p className="text-sm mt-1">
                    Add health conditions, allergies, or dietary restrictions to track them here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
