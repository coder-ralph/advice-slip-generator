"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Download, Share2, Palette, Type, RefreshCw, Heart, Settings } from "lucide-react"
import html2canvas from "html2canvas"
import { Slider } from "@/components/ui/slider"

interface AdviceResponse {
  slip: {
    id: number
    advice: string
  }
}

// Gradient Color
const decorativeGradients = [
  {
    id: "sunset",
    name: "Golden Sunset",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    textColor: "text-white",
    category: "decorative",
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    textColor: "text-white",
    category: "decorative",
  },
  {
    id: "forest",
    name: "Forest Zen",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    textColor: "text-white",
    category: "decorative",
  },
  {
    id: "cosmic",
    name: "Cosmic Wonder",
    gradient: "from-indigo-900 via-purple-900 to-pink-900",
    textColor: "text-white",
    category: "decorative",
  },
  {
    id: "spring",
    name: "Spring Bloom",
    gradient: "from-pink-300 via-purple-300 to-indigo-300",
    textColor: "text-gray-800",
    category: "decorative",
  },
  {
    id: "aurora",
    name: "Aurora Borealis",
    gradient: "from-green-300 via-blue-500 to-purple-600",
    textColor: "text-white",
    category: "decorative",
  },
]

// Solid Color
const solidBackgrounds = [
  {
    id: "white",
    name: "Pure White",
    gradient: "from-white to-white",
    textColor: "text-gray-800",
    category: "solid",
  },
  {
    id: "black",
    name: "Deep Black",
    gradient: "from-gray-900 to-gray-900",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "navy",
    name: "Navy Blue",
    gradient: "from-blue-900 to-blue-900",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "emerald",
    name: "Emerald Green",
    gradient: "from-emerald-600 to-emerald-600",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "rose",
    name: "Rose Pink",
    gradient: "from-rose-500 to-rose-500",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "amber",
    name: "Warm Amber",
    gradient: "from-amber-500 to-amber-500",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "purple",
    name: "Royal Purple",
    gradient: "from-purple-600 to-purple-600",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "indigo",
    name: "Deep Indigo",
    gradient: "from-indigo-700 to-indigo-700",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "teal",
    name: "Ocean Teal",
    gradient: "from-teal-600 to-teal-600",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "slate",
    name: "Modern Slate",
    gradient: "from-slate-700 to-slate-700",
    textColor: "text-white",
    category: "solid",
  },
  {
    id: "cream",
    name: "Warm Cream",
    gradient: "from-amber-50 to-amber-50",
    textColor: "text-gray-800",
    category: "solid",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    gradient: "from-green-100 to-green-100",
    textColor: "text-gray-800",
    category: "solid",
  },
]

// Font Styles
const fontStyles = [
  { id: "serif", name: "Classic Serif", class: "font-serif", example: "Elegant & Traditional" },
  { id: "sans", name: "Modern Sans", class: "font-sans", example: "Clean & Contemporary" },
  { id: "mono", name: "Typewriter", class: "font-mono", example: "Retro & Technical" },
  { id: "courgette", name: "Courgette Cursive", class: "font-courgette", example: "Charming & Playful" },
]

// Text Color
const colorSchemes = [
  { id: "white", name: "Pure White", class: "text-white", bg: "bg-white" },
  { id: "black", name: "Deep Black", class: "text-black", bg: "bg-black" },
  { id: "gold", name: "Golden", class: "text-yellow-300", bg: "bg-yellow-300" },
  { id: "silver", name: "Silver", class: "text-gray-300", bg: "bg-gray-300" },
  { id: "rose", name: "Rose Gold", class: "text-rose-300", bg: "bg-rose-300" },
  { id: "emerald", name: "Emerald", class: "text-emerald-300", bg: "bg-emerald-300" },
  { id: "cyan", name: "Cyan Blue", class: "text-cyan-300", bg: "bg-cyan-300" },
  { id: "purple", name: "Purple", class: "text-purple-300", bg: "bg-purple-300" },
  { id: "orange", name: "Orange", class: "text-orange-300", bg: "bg-orange-300" },
  { id: "pink", name: "Hot Pink", class: "text-pink-300", bg: "bg-pink-300" },
]

// Advice Backup
const funnyAdviceBackup = [
  "Don't take life too seriously, nobody gets out alive anyway! 😄",
  "If at first you don't succeed, then skydiving definitely isn't for you! 🪂",
  "The early bird might get the worm, but the second mouse gets the cheese! 🐭",
  "Money can't buy happiness, but it can buy ice cream, which is pretty close! 🍦",
  "Life is like a box of chocolates - expensive and gone too quickly! 🍫",
  "Don't worry about the world ending today. It's already tomorrow in Australia! 🌏",
  "If you think nobody cares about you, try missing a couple of payments! 💸",
  "The best time to plant a tree was 20 years ago. The second best time is right after you finish this advice! 🌳",
]

export default function AdviceSlipGenerator() {
  const [selectedBackground, setSelectedBackground] = useState(decorativeGradients[0])
  const [selectedFont, setSelectedFont] = useState(fontStyles[0])
  const [selectedColor, setSelectedColor] = useState(colorSchemes[0])
  const [currentAdvice, setCurrentAdvice] = useState("Click 'Give me advice!' to receive your wisdom!")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [textSize, setTextSize] = useState(32)

  // Fetch Advice API
  const fetchAdvice = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-cache",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch advice")
      }

      const data: AdviceResponse = await response.json()
      setCurrentAdvice(data.slip.advice)
    } catch (error) {
      console.error("Error fetching advice:", error)
      // Use backup funny advice if API fails
      const randomBackup = funnyAdviceBackup[Math.floor(Math.random() * funnyAdviceBackup.length)]
      setCurrentAdvice(randomBackup)
    } finally {
      setIsLoading(false)
    }
  }

  // Generate Image
  const generateImage = async () => {
    if (!cardRef.current) return

    setIsGenerating(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 1,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        width: 932,
        height: 400,
      })

      const link = document.createElement("a")
      link.download = `advice-slip-${Date.now()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Sorry, there was an error generating your image. Please try again!")
    } finally {
      setIsGenerating(false)
    }
  }

  // Share to Threads
  const shareToThreads = () => {
    const text = encodeURIComponent(
      `Daily Wisdom:\n\n"${currentAdvice}"\n\n#adviceoftheday #wisdom #dailymotivation`
    )
    const threadsUrl = `https://www.threads.net/intent/post?text=${text}`
    window.open(threadsUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - More Compact */}
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-1">
            🧠 Advice Slip Generator
          </h1>
          <p className="text-lg text-gray-700 font-semibold">Create beautiful advice cards to inspire and share!</p>
          <Badge variant="secondary" className="mt-1 text-xs px-3 py-1">
            📱 Perfect for Threads & Social Media
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Preview Card - Smaller */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                {/* Advice Card Preview - Smaller Size */}
                <div
                  ref={cardRef}
                  className={`relative w-full bg-gradient-to-br ${selectedBackground.gradient} flex flex-col items-center justify-center p-8 overflow-hidden`}
                  style={{ aspectRatio: "1/1", height: "400px" }}
                >
                  
                  {/* Decorative Border */}
                  <div className="absolute inset-3 border-2 border-white/20 rounded-xl"></div>

                  {/* Quote Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="mb-4 -mt-4 z-10"
                  >
                    <Lightbulb className={`w-12 h-12 ${selectedColor.class} drop-shadow-lg`} />
                  </motion.div>

                  {/* Main Advice Text */}
                  <motion.div
                    key={currentAdvice}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-sm z-10 flex items-center justify-center px-3"
                  >
                    <p
                      className={`${selectedFont.class} ${selectedColor.class} font-medium text-center break-words hyphens-auto`}
                      style={{
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        fontSize: `${Math.max(textSize * 0.6, 16)}px`, // Smaller preview text
                        lineHeight: "1.4",
                        wordSpacing: "0.1em",
                        letterSpacing: "0.02em",
                      }}
                    >
                      &ldquo;{currentAdvice}&rdquo;
                    </p>
                  </motion.div>

                  {/* Branding */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs z-10">
                    Advice Slip Generator
                  </div>
                </div>

                {/* Controls - More Compact */}
                <div className="p-3 bg-white space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Button
                      onClick={fetchAdvice}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      size="sm"
                    >
                      {isLoading ? (
                        <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                      ) : (
                        <Lightbulb className="mr-2 w-4 h-4" />
                      )}
                      {isLoading ? "Getting..." : "Give me advice! 😎"}
                    </Button>

                    <div className="flex gap-2">
                      <Button onClick={generateImage} disabled={isGenerating} variant="outline" size="sm">
                        <Download className="mr-1 w-3 h-3" />
                        {isGenerating ? "Generating..." : "Download"}
                      </Button>
                      <Button onClick={shareToThreads} variant="outline" size="sm">
                        <Share2 className="mr-1 w-3 h-3" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Size Info - Compact */}
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Perfect for Threads & Social Media</p>
                    <div className={`w-full h-1 rounded-full bg-gradient-to-r ${selectedBackground.gradient}`}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel - More Compact */}
          <div className="lg:col-span-2 space-y-3">
            <Card>
              <CardContent className="p-3">
                <Tabs defaultValue="backgrounds" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 text-xs h-8">
                    <TabsTrigger value="backgrounds" className="text-xs">
                      <Palette className="w-3 h-3" />
                    </TabsTrigger>
                    <TabsTrigger value="fonts" className="text-xs">
                      <Type className="w-3 h-3" />
                    </TabsTrigger>
                    <TabsTrigger value="colors" className="text-xs">
                      <Heart className="w-3 h-3" />
                    </TabsTrigger>
                    <TabsTrigger value="textSize" className="text-xs">
                      <Settings className="w-3 h-3" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="backgrounds" className="space-y-3 mt-3">
                    <h4 className="font-semibold text-sm">Choose Background</h4>

                    {/* Decorative Gradients - With Scrollbar */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Decorative Gradients</h5>
                      <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
                        {decorativeGradients.map((bg) => (
                          <motion.button
                            key={bg.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedBackground(bg)}
                            className={`w-full p-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                              selectedBackground.id === bg.id
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${bg.gradient}`}></div>
                            <div className="text-left">
                              <div className="font-medium text-xs">{bg.name}</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Solid Colors - With Scrollbar */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Solid Colors</h5>
                      <div className="max-h-32 overflow-y-auto pr-2">
                        <div className="grid grid-cols-2 gap-1">
                          {solidBackgrounds.map((bg) => (
                            <motion.button
                              key={bg.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedBackground(bg)}
                              className={`p-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                                selectedBackground.id === bg.id
                                  ? "border-purple-500 bg-purple-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${bg.gradient}`}></div>
                              <div className="text-left">
                                <div className="font-medium text-xs">{bg.name}</div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Font Style */}
                  <TabsContent value="fonts" className="space-y-2 mt-3">
                    <h4 className="font-semibold text-sm">Font Style</h4>
                    <div className="space-y-1">
                      {fontStyles.map((font) => (
                        <motion.button
                          key={font.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedFont(font)}
                          className={`w-full p-2 rounded-lg border-2 transition-all text-left ${
                            selectedFont.id === font.id
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`font-medium text-xs ${font.class}`}>{font.name}</div>
                          <div className={`text-xs text-gray-600 ${font.class}`}>{font.example}</div>
                        </motion.button>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Text Color */}
                  <TabsContent value="colors" className="space-y-2 mt-3">
                    <h4 className="font-semibold text-sm">Text Color</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {colorSchemes.map((color) => (
                        <motion.button
                          key={color.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(color)}
                          className={`p-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                            selectedColor.id === color.id
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${color.bg}`}></div>
                          <span className="text-xs font-medium">{color.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Adjust font size */}
                  <TabsContent value="textSize" className="space-y-2 mt-3">
                    <h4 className="font-semibold text-sm">Text Size</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-700">Font Size</span>
                        <span className="text-xs text-gray-500">{textSize}px</span> {/* show current size */}
                      </div>
                      <Slider
                        defaultValue={[32]}
                        max={48}
                        min={24}
                        step={4}
                        onValueChange={(value: number[]) => setTextSize(value[0])}
                      />
                      <p className="text-xs text-gray-500">Adjust text size for perfect fit.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Actions - More Compact */}
            <Card>
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm mb-2">Quick Actions</h4>
                <div className="space-y-1">
                  <Button
                    onClick={fetchAdvice}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                  >
                    <RefreshCw className={`mr-2 w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                    New Advice
                  </Button>
                  <Button
                    onClick={generateImage}
                    disabled={isGenerating}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                  >
                    <Download className="mr-2 w-3 h-3" />
                    Save PNG
                  </Button>
                  <Button
                    onClick={shareToThreads}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                  >
                    <Share2 className="mr-2 w-3 h-3" />
                    Share to Threads
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
