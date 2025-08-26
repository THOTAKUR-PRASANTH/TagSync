'use client'
import React, { useEffect, useState, useRef } from 'react'
import PreLoader from '../../shared/PreLoader'

// Import images directly from /public
import qrImg from '/public/images/itemswithqr/qr.png'
import glassImg from '/public/images/itemswithqr/glass.png'
import passportImg from '/public/images/itemswithqr/passport2.png'
import gadgetsImg from '/public/images/itemswithqr/gadgets.png'
import catqrImg from '/public/images/itemswithqr/catqr.png'
import giftboxImg from '/public/images/itemswithqr/giftbox.png'
import whitedogImg from '/public/images/itemswithqr/whitedog.png'
import blackbagImg from '/public/images/itemswithqr/blackbag.png'
import pendriveqrImg from '/public/images/itemswithqr/pendriveqr.png'

// Gallery image with scroll-triggered fade animation
const GalleryImage = ({
  src,
  alt,
  index,
}: {
  src: string
  alt: string
  index: number
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imgRef}
      className={`gallery-card relative aspect-square m-0 p-0 transform transition-all duration-500 ease-in-out
       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative h-full w-full overflow-hidden bg-white/40 p-0.5 shadow-lg backdrop-blur-lg">
        <div className="animate-spin-slow absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-400 opacity-75 blur-md"></div>
        </div>
        <div className="relative h-full w-full overflow-hidden bg-white/20">
          <img
            src={src}
            alt={alt}
            className="block h-full w-full object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
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
          { imgSrc: qrImg.src },
          { imgSrc: glassImg.src },
          { imgSrc: passportImg.src },
          { imgSrc: gadgetsImg.src },
          { imgSrc: catqrImg.src },
          { imgSrc: giftboxImg.src },
          { imgSrc: whitedogImg.src },
          { imgSrc: blackbagImg.src },
          { imgSrc: pendriveqrImg.src },
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
      <div className="flex h-screen items-center justify-center bg-[#f0f2f5] p-4">
        <p className="rounded-lg bg-red-100 p-4 text-center font-medium text-red-600">
          {error}
        </p>
      </div>
    )
  }

  if (isLoading) {
    return <PreLoader />
  }

  return (
    <section className="w-full h-full m-0 p-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 m-0 p-0">
        {galleryImages.map((item, i) => (
          <GalleryImage
            key={item.imgSrc}
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
