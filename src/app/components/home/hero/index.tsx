'use client'

import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import dynamic from 'next/dynamic'

// Lazy load PreLoader only when modal is open
const PreLoader = dynamic(() => import('../../shared/PreLoader'), { ssr: false })

const AlertIcon = () => (
  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
  </svg>
)

const NoAppIcon = () => (
  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9a9 9 0 0110 0M1.6 15a15.17 15.17 0 0118.8 0"></path>
  </svg>
)

const Banner = () => {
  const [isOpen, setOpen] = useState(false)
  const [isVideoLoading, setVideoLoading] = useState(true)

  const openModal = useCallback(() => {
    setOpen(true)
    setVideoLoading(true)
  }, [])

  const closeModal = useCallback(() => setOpen(false), [])

  const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const floatAnimation = {
    animate: {
      y: [0, -6, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <LazyMotion features={domAnimation}>
  <section className="relative pb-0 overflow-hidden hide-scrollbar" id="home-section">
        {/* Static gradient background instead of animating blur for performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-black/10"></div>

        <div className="container lg:pt-20 pt-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 my-16 items-center">
            
            {/* LEFT CONTENT */}
            <motion.div 
              className="lg:col-span-7 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h1 variants={fadeUp} className="mb-5 lg:text-start text-center sm:leading-snug leading-tight capitalize">
                The Future of Finding <br /> is Here.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white font-normal mb-10 max-w-[80%] lg:text-start text-center lg:mx-0 mx-auto">
                Never lose your valuables again. TagSync is the smart, simple, and secure way to connect your physical items to the digital world.
              </motion.p>

              {/* Benefits */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10 justify-center lg:justify-start text-white">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition"><AlertIcon /> <span>Instant & Anonymous Alerts</span></div>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition"><NoAppIcon /> <span>No App Needed</span></div>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition"><GlobeIcon /> <span>Global Peace of Mind</span></div>
              </motion.div>

              {/* Buttons */}
              <motion.div variants={fadeUp} className="flex align-middle justify-center lg:justify-start">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl mr-6 cursor-pointer shadow-lg shadow-primary/30"
                >
                  Get Your TagSync
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={openModal}
                  className="bg-transparent flex justify-center items-center text-white cursor-pointer"
                >
                  <Image
                    src={'/images/banner/playbutton.svg'}
                    alt='button-image'
                    className='mr-3'
                    width={47}
                    height={47}
                  />
                  <span className="hover:text-primary">How It Works</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div 
              className="lg:col-span-5 lg:-m-48 -m-20 overflow-hidden will-change-transform"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={floatAnimation} animate="animate" style={{ willChange: 'transform' }}>
                <Image
                  src="/images/banner/banner.svg" 
                  alt="TagSync Product Showcase"
                  width={1013}
                  height={760}
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* MODAL */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg sm:m-0 m-4 relative">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                  <PreLoader />
                </div>
              )}

              <div className="overlay flex items-center justify-between border-b border-solid border-border p-5 z-40 backdrop-blur-sm">
                <h3 className="text-white">How It Works</h3>
                <button onClick={closeModal} className="inline-block dark:invert text-1xl text-white hover:cursor-pointer hover:text-primary" aria-label="Close">
                  X
                </button>
              </div>

              <iframe
                height="400"
                className="p-4 md:w-[50rem] w-full"
                src="/videos/howItWorks.mp4"
                title="How TagSync Works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setVideoLoading(false)}
              ></iframe>
             
            
             
            </div>
          </div>
        )}
      </section>
    </LazyMotion>
  )
}


export default Banner
