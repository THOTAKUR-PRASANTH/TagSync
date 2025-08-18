'use client'

import React, { useEffect, useState } from 'react'
import PreLoader from '../../shared/PreLoader'

// This component displays images with an animated, glassmorphic border effect.
const QRWithItems = () => {
  // State to hold the fetched image data.
  const [qrItems, setQrItems] = useState<{ imgSrc: string }[]>([])
  // State to handle the loading status, providing a better user experience.
  const [isLoading, setIsLoading] = useState(true)
  // State for error handling
  const [error, setError] = useState<string | null>(null)

  // useEffect to fetch data when the component mounts.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch page data.')
        const data = await res.json()
        setQrItems(data?.QRWithItems || [])
      } catch (e: any) {
        console.error('Error fetching data:', e)
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // If there's an error, display an error message.
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-red-500 font-medium">
          There was an error loading the images: {error}
        </p>
      </div>
    )
  }

  // If data is still loading, display a loading indicator.
  if (isLoading) {
    return (
       <PreLoader />
    )
  }

  return (
    <section className="m-0 p-0">
      <div className="w-full min-h-screen">
        {/* Grid layout with fewer columns for bigger images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {qrItems.map((item, i) => (
            <div
              key={i}
              className="relative w-full aspect-square overflow-hidden group
                         // Glassmorphic and border effects, now with no rounded corners.
                         bg-white/10 backdrop-blur-sm border border-white/20 shadow-md
                         // Animated transitions for hover effects
                         transition-all duration-500 ease-in-out
                         // Hover effects: a very thin, subtle glow is added.
                         hover:shadow-md hover:shadow-blue-500/70"
            >
              <img
                src={item.imgSrc}
                alt={`QR code image ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover
                           // Animated transitions for hover effects
                           transition-transform duration-500 ease-in-out
                           // Hover effects
                           group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QRWithItems
