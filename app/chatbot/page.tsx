"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Send } from "lucide-react"

export default function ChatbotPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hey there! 😄 I'm Mr. Trallallero Trallallà — your friendly and super-motivated fitness and nutrition sidekick. 🏋️‍♂️🥗 I'm here to help you with workouts, healthy meals, and staying fit — even on your busiest days! Ready to crush your goals? Let’s do this together! 💪✨",
    },
  ])
  const [input, setInput] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const generatePrompt = (userInput: string) => `
You are Mr. Trallallero Trallallà — a cheerful, warm, and supportive AI assistant who ONLY talks about:
- health 🧘‍♂️
- fitness 🏋️
- nutrition 🥗
- weight loss ⚖️
- healthy food 🥑
- staying fit with a busy lifestyle ⏱️

⚠️ Never respond to unrelated topics. If a user's question is off-topic, gently guide them back with a smile and fitness-related humor.

When responding:
- Use emojis to make it fun and engaging 🎉
- Be positive, encouraging, and clear 😊

Special cases:
1. **If the user asks for a motivational quote**:
   - Share a short, inspiring quote 💬
   - Briefly explain its meaning 💡

2. **If the user asks for a specific workout**:
   - Provide a full plan including:
     - Warm-up 🔥
     - Main workout (with sets, reps, rest) 💪
     - Cool down 🧘‍♀️

3. **If the user asks for a meal plan**:
   - Provide:
     - Breakfast 🍳
     - Lunch 🥗
     - Dinner 🍛
     - Snacks 🍎

4. **If the user asks for a recipe**:
   - Include:
     - Ingredients 🛒
     - Instructions 📋
     - Cooking time ⏲️
     - Serving size 🍽️

5. **If the user asks for a fitness tip**:
   - Give:
     - Explanation 🧠
     - Benefits 💥
     - How to implement it 🛠️

Do not ask too many follow-up questions. If enough info is provided, just go ahead and give the user a clear and friendly response.

Now, respond to this message from the user:
"${userInput}"

Only return ONE cheerful and helpful reply as Mr. Trallallero Trallallà would 🐬💬
`

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")

    const prompt = generatePrompt(userMessage)

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA77DVpkZjEtY4SzLpFnNL1thgAGwxToV0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              topK: 40,
              topP: 1,
              maxOutputTokens: 256,
            },
          }),
        }
      )

      const data = await response.json()
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: botReply || "Oops! I dropped my dumbbell and lost my response. Try again?",
        },
      ])
    } catch (error) {
      console.error("Error talking to Gemini API:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Oh no! I tripped on a yoga mat. Something went wrong. Try again later!",
        },
      ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-sky-100 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div
              className="bg-cover bg-center text-white p-8"
              style={{ backgroundImage: "url('/images/ocean.jpg')" }}
            >
              <h1 className="text-4xl font-bold mb-2">Meet Mr. Trallallero Trallallà</h1>
              <p className="text-xl">Your personal fitness and nutrition assistant</p>
            </div>
            <div className="p-8 flex flex-col items-center">
              <div className="relative w-64 h-64 mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trala-removebg-preview-eDyZgfyknVky55PXkRf5UFpEF335Xf.png"
                  alt="Mr. Trallallero Trallallà"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Oops! You need to log in first</h2>
                <p className="text-gray-600 mb-6">
                  To chat with Mr. Trallallero Trallallà and get personalized fitness and nutrition advice, please log
                  in or create an account.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/login">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 w-full sm:w-auto">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-2 w-full sm:w-auto">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sky-100 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div
            className="bg-cover bg-center text-white p-8"
            style={{ backgroundImage: "url('/images/ocean.jpg')" }}
          >
            <h1 className="text-4xl font-bold mb-2">Meet Mr. Trallallero Trallallà</h1>
            <p className="text-xl">Your personal fitness and nutrition assistant</p>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 flex-grow">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "bot" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trala-removebg-preview-eDyZgfyknVky55PXkRf5UFpEF335Xf.png"
                      alt="Mr. Trallallero Trallallà"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && user && (
                  <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0 bg-gray-300">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="flex gap-2">
              <input
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600 text-white">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
