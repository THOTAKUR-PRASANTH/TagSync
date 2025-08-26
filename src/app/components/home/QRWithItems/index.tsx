'use client'
import React, { useEffect, useState, useRef } from 'react'
import PreLoader from '../../shared/PreLoader'

// Gallery image with scroll-triggered fade animation
const GalleryImage = ({ src, alt, index }: { src: string, alt: string, index: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target) // stop observing once visible
          }
        })
      },
      {
        threshold: 0.2, // trigger when 20% visible
      }
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imgRef}
      className={`gallery-card relative aspect-square transition-all duration-500 ease-in-out transform m-0 p-0 
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 100}ms`, // stagger for web view
      }}
    >
      <div className="relative w-full h-full overflow-hidden bg-white/60 p-0.5 shadow-lg backdrop-blur-lg">
        <div className="animate-spin-slow absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-400 blur-md opacity-75"></div>
        </div>
        <div className="relative w-full h-full bg-white/20 overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover block"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/600x600/FFC0CB/000000?text=Image+Not+Found`
            }}
          />
        </div>
      </div>
    </div>
  )
}

const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState<{ imgSrc: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        const placeholderImages = [
          { imgSrc: `/images/itemsWithQr/Qr.png` },
          { imgSrc: `/images/itemsWithQr/glass.png` },
          { imgSrc: `/images/itemsWithQr/passPort2.png` },
          { imgSrc: `/images/itemsWithQr/Gadegts.png` },
          { imgSrc: `/images/itemsWithQr/CatQr.png` },
          { imgSrc: `/images/itemsWithQr/GiftBox.png` },
          { imgSrc: `/images/itemsWithQr/WhiteDog.png` },
          { imgSrc: `/images/itemsWithQr/BlackBag.png` },
          { imgSrc: `/images/itemsWithQr/pendriveQr.png` },
        ]
        setGalleryImages(placeholderImages)
      } catch (e: any) {
        console.error('Error processing image data:', e)
        setError('There was an issue loading the image data.')
      } finally {
        setIsLoading(false)
      }
    }
    loadImages()
  }, [])

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0f2f5] p-4">
        <p className="text-red-600 bg-red-100 p-4 rounded-lg font-medium text-center">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return <PreLoader />
  }

  return (
    <section className="w-full h-full m-0 p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 m-0 p-0">
        {galleryImages.map((item, i) => (
          <GalleryImage
            key={i}
            src={item.imgSrc}
            alt={`Gallery image ${i + 1}`}
            index={i}
          />
        ))}
      </div>

      <style>
        {`
          .gallery-card {
            transition-property: opacity, transform;
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
        `}
      </style>
    </section>
  )
}

export default ImageGallery
