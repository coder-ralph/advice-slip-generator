"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share2, Palette, Type, RefreshCw, ALargeSmall, Quote } from "lucide-react"
import html2canvas from "html2canvas"
import { Slider } from "@/components/ui/slider"
import { toast, Toaster } from "sonner"

interface AdviceResponse {
  slip: {
    id: number
    advice: string
  }
}

// Gradient Color with explicit CSS gradients and fallback colors
const decorativeGradients = [
  {
    id: "sunset",
    name: "Golden Sunset",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ef4444 50%, #ec4899 100%)",
    fallbackColors: ["#fb923c", "#ef4444", "#ec4899"],
    textColor: "#ffffff",
    category: "decorative",
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #14b8a6 100%)",
    fallbackColors: ["#60a5fa", "#06b6d4", "#14b8a6"],
    textColor: "#ffffff",
    category: "decorative",
  },
  {
    id: "forest",
    name: "Forest Zen",
    gradient: "linear-gradient(135deg, #4ade80 0%, #10b981 50%, #14b8a6 100%)",
    fallbackColors: ["#4ade80", "#10b981", "#14b8a6"],
    textColor: "#ffffff",
    category: "decorative",
  },
  {
    id: "cosmic",
    name: "Cosmic Wonder",
    gradient: "linear-gradient(135deg, #312e81 0%, #581c87 50%, #831843 100%)",
    fallbackColors: ["#312e81", "#581c87", "#831843"],
    textColor: "#ffffff",
    category: "decorative",
  },
  {
    id: "spring",
    name: "Spring Bloom",
    gradient: "linear-gradient(135deg, #f9a8d4 0%, #c084fc 50%, #a5b4fc 100%)",
    fallbackColors: ["#f9a8d4", "#c084fc", "#a5b4fc"],
    textColor: "#1f2937",
    category: "decorative",
  },
  {
    id: "aurora",
    name: "Aurora Borealis",
    gradient: "linear-gradient(135deg, #86efac 0%, #3b82f6 50%, #9333ea 100%)",
    fallbackColors: ["#86efac", "#3b82f6", "#9333ea"],
    textColor: "#ffffff",
    category: "decorative",
  },
]

// Solid Color with explicit colors
const solidBackgrounds = [
  {
    id: "white",
    name: "Pure White",
    gradient: "#ffffff",
    fallbackColors: ["#ffffff"],
    textColor: "#1f2937",
    category: "solid",
  },
  {
    id: "black",
    name: "Deep Black",
    gradient: "#111827",
    fallbackColors: ["#111827"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "navy",
    name: "Navy Blue",
    gradient: "#1e3a8a",
    fallbackColors: ["#1e3a8a"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "emerald",
    name: "Emerald Green",
    gradient: "#059669",
    fallbackColors: ["#059669"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "rose",
    name: "Rose Pink",
    gradient: "#f43f5e",
    fallbackColors: ["#f43f5e"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "amber",
    name: "Warm Amber",
    gradient: "#f59e0b",
    fallbackColors: ["#f59e0b"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "purple",
    name: "Royal Purple",
    gradient: "#9333ea",
    fallbackColors: ["#9333ea"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "indigo",
    name: "Deep Indigo",
    gradient: "#4338ca",
    fallbackColors: ["#4338ca"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "teal",
    name: "Ocean Teal",
    gradient: "#0d9488",
    fallbackColors: ["#0d9488"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "slate",
    name: "Modern Slate",
    gradient: "#374151",
    fallbackColors: ["#374151"],
    textColor: "#ffffff",
    category: "solid",
  },
  {
    id: "cream",
    name: "Warm Cream",
    gradient: "#fef3c7",
    fallbackColors: ["#fef3c7"],
    textColor: "#1f2937",
    category: "solid",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    gradient: "#dcfce7",
    fallbackColors: ["#dcfce7"],
    textColor: "#1f2937",
    category: "solid",
  },
]

// Font Styles
const fontStyles = [
  { id: "serif", name: "Classic Serif", fontFamily: "serif", example: "Elegant & Traditional" },
  { id: "sans", name: "Modern Sans", fontFamily: "system-ui, sans-serif", example: "Clean & Contemporary" },
  { id: "mono", name: "Typewriter", fontFamily: "monospace", example: "Retro & Technical" },
  { id: "cursive", name: "Cursive", fontFamily: "cursive", example: "Charming & Playful" },
]

// Text Color with explicit colors
const colorSchemes = [
  { id: "white", name: "Pure White", color: "#ffffff", bg: "#ffffff" },
  { id: "black", name: "Deep Black", color: "#000000", bg: "#000000" },
  { id: "gold", name: "Golden", color: "#fde047", bg: "#fde047" },
  { id: "silver", name: "Silver", color: "#d1d5db", bg: "#d1d5db" },
  { id: "rose", name: "Rose Gold", color: "#fda4af", bg: "#fda4af" },
  { id: "emerald", name: "Emerald", color: "#6ee7b7", bg: "#6ee7b7" },
  { id: "cyan", name: "Cyan Blue", color: "#67e8f9", bg: "#67e8f9" },
  { id: "purple", name: "Purple", color: "#c4b5fd", bg: "#c4b5fd" },
  { id: "orange", name: "Orange", color: "#fdba74", bg: "#fdba74" },
  { id: "pink", name: "Hot Pink", color: "#f9a8d4", bg: "#f9a8d4" },
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

  // Generate Image with proper gradient matching
  const generateImage = async () => {
    if (!cardRef.current) {
      toast.error("Unable to find the card to capture. Please try again.")
      return
    }

    setIsGenerating(true)

    try {
      // Wait for any animations to settle
      await new Promise((resolve) => setTimeout(resolve, 500))

      const element = cardRef.current

      // Create a clean clone for download without quote icons
      const clone = element.cloneNode(true) as HTMLElement

      // Remove quote icons from clone
      const quoteIconsInClone = clone.querySelector(".quote-icons-preview")
      if (quoteIconsInClone) {
        quoteIconsInClone.remove()
      }

      // Show branding in clone
      const brandingInClone = clone.querySelector(".branding-download-only")
      if (brandingInClone) {
        ;(brandingInClone as HTMLElement).style.display = "block"
      }

      // Temporarily add clone to document for capture
      clone.style.position = "absolute"
      clone.style.left = "-9999px"
      clone.style.top = "0"
      clone.style.zIndex = "-1000"
      document.body.appendChild(clone)

      console.log("Capturing clean element without quote icons...")

      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        width: clone.offsetWidth,
        height: clone.offsetHeight,
        useCORS: true,
        allowTaint: true,
      })

      // Remove clone from document
      document.body.removeChild(clone)

      console.log("Canvas created successfully")

      // Create and trigger download
      const dataURL = canvas.toDataURL("image/png", 1.0)

      if (dataURL === "data:," || dataURL.length < 100) {
        throw new Error("Generated image is empty")
      }

      const link = document.createElement("a")
      link.download = `advice-slip-${Date.now()}.png`
      link.href = dataURL

      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Your advice slip has been downloaded successfully! 🎉")
    } catch (error) {
      console.error("Error generating image:", error)

      // Fallback: Create a manual canvas with exact gradient matching (NO quote icons)
      try {
        console.log("Creating manual canvas with exact gradients...")

        const canvas = document.createElement("canvas")
        canvas.width = 932
        canvas.height = 400
        const ctx = canvas.getContext("2d")!

        // Draw background with exact gradient matching
        if (selectedBackground.gradient.includes("linear-gradient") && selectedBackground.fallbackColors) {
          // Create exact gradient
          const gradient = ctx.createLinearGradient(0, 0, 932, 400)
          const colors = selectedBackground.fallbackColors

          if (colors.length === 3) {
            gradient.addColorStop(0, colors[0])
            gradient.addColorStop(0.5, colors[1])
            gradient.addColorStop(1, colors[2])
          } else if (colors.length === 2) {
            gradient.addColorStop(0, colors[0])
            gradient.addColorStop(1, colors[1])
          } else {
            gradient.addColorStop(0, colors[0])
            gradient.addColorStop(1, colors[0])
          }

          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = selectedBackground.gradient
        }
        ctx.fillRect(0, 0, 932, 400)

        // Draw border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 2
        ctx.strokeRect(24, 24, 884, 352)

        // DO NOT draw quote icons in manual canvas

        // Draw text with correct color
        ctx.fillStyle = selectedColor.color
        ctx.font = `${Math.max(textSize * 0.6, 16)}px ${selectedFont.fontFamily}`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Add text shadow effect
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Simple text wrapping
        const words = currentAdvice.split(" ")
        const lines = []
        let currentLine = ""

        for (const word of words) {
          const testLine = currentLine + word + " "
          const metrics = ctx.measureText(testLine)
          if (metrics.width > 600 && currentLine !== "") {
            lines.push(currentLine.trim())
            currentLine = word + " "
          } else {
            currentLine = testLine
          }
        }
        lines.push(currentLine.trim())

        // Draw lines with quotes
        const lineHeight = Math.max(textSize * 0.6, 16) * 1.4
        const startY = 200 - (lines.length * lineHeight) / 2

        lines.forEach((line, index) => {
          const text = index === 0 ? `"${line}` : index === lines.length - 1 ? `${line}"` : line
          ctx.fillText(text, 466, startY + index * lineHeight)
        })

        // Draw branding in bottom-right corner
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.font = "12px system-ui"
        ctx.textAlign = "right"
        ctx.fillText("Advice Slip Generator", 908, 384)

        const dataURL = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = `advice-slip-${Date.now()}.png`
        link.href = dataURL

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success("Your advice slip has been downloaded! 🎉")
      } catch (fallbackError) {
        console.error("Manual canvas failed:", fallbackError)
        toast.error("Unable to generate image. Please try refreshing the page and using a different browser.")
      }
    } finally {
      setIsGenerating(false)
    }
  }

  // Share to Threads
  const shareToThreads = () => {
    const text = encodeURIComponent(`Daily Wisdom:\n\n"${currentAdvice}"\n\n#adviceoftheday #wisdom #dailymotivation`)
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
                {/* Advice Card Preview - No lightbulb, no branding */}
                <div
                  ref={cardRef}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    background: selectedBackground.gradient,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative Border */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      right: "12px",
                      bottom: "12px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                    }}
                  ></div>

                  {/* Quote Icons - Only visible in preview */}
                  <div className="quote-icons-preview">
                    <div
                      style={{
                        position: "absolute",
                        top: "24px",
                        left: "24px",
                        zIndex: 5,
                      }}
                    >
                      <Quote
                        style={{
                          width: "32px",
                          height: "32px",
                          color: "rgba(255, 255, 255, 0.4)",
                          transform: "rotate(180deg)",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "24px",
                        right: "24px",
                        zIndex: 5,
                      }}
                    >
                      <Quote
                        style={{
                          width: "32px",
                          height: "32px",
                          color: "rgba(255, 255, 255, 0.4)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Branding - Only visible in downloaded image */}
                  <div
                    className="branding-download-only"
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "12px",
                      zIndex: 10,
                      display: "none", // Hidden in preview
                    }}
                  >
                    Advice Slip Generator
                  </div>

                  {/* Main Advice Text - Centered without icon */}
                  <div
                    style={{
                      textAlign: "center",
                      maxWidth: "384px",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 12px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: selectedFont.fontFamily,
                        color: selectedColor.color,
                        fontWeight: "700",
                        textAlign: "center",
                        wordBreak: "break-word",
                        hyphens: "auto",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        fontSize: `${Math.max(textSize * 0.6, 16)}px`,
                        lineHeight: "1.4",
                        wordSpacing: "0.1em",
                        letterSpacing: "0.02em",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {currentAdvice}
                    </p>
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
                        <RefreshCw className="mr-2 w-4 h-4" />
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
                    <div className="w-full h-1 rounded-full" style={{ background: selectedBackground.gradient }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel - Reorganized */}
          <div className="lg:col-span-2 space-y-3">
            <Card>
              <CardContent className="p-3">
                <Tabs defaultValue="backgrounds" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 text-xs h-8">
                    <TabsTrigger value="backgrounds" className="text-xs">
                      <Palette className="w-3 h-3" />
                    </TabsTrigger>
                    <TabsTrigger value="fonts" className="text-xs">
                      <ALargeSmall className="w-3 h-3" />
                    </TabsTrigger>
                    <TabsTrigger value="colors" className="text-xs">
                      <Type className="w-3 h-3" />
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
                            <div className="w-6 h-6 rounded-full" style={{ background: bg.gradient }}></div>
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
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: bg.gradient }}></div>
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
                          <div className="font-medium text-xs" style={{ fontFamily: font.fontFamily }}>
                            {font.name}
                          </div>
                          <div className="text-xs text-gray-600" style={{ fontFamily: font.fontFamily }}>
                            {font.example}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Text Color & Size Combined */}
                  <TabsContent value="colors" className="space-y-3 mt-3">
                    <h4 className="font-semibold text-sm">Text Color & Size</h4>

                    {/* Text Colors */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Text Color</h5>
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
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.color }}></div>
                            <span className="text-xs font-medium">{color.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Text Size */}
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Text Size</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-700">Font Size</span>
                          <span className="text-xs text-gray-500">{textSize}px</span>
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
      <Toaster />
    </div>
  )
}
