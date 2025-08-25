'use client'

import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import dynamic from 'next/dynamic'

// Icons
import { MdQrCodeScanner } from "react-icons/md"
import { IoPhonePortrait } from "react-icons/io5"
import { TbWorld } from "react-icons/tb"

const PreLoader = dynamic(() => import('../../shared/PreLoader'), { ssr: false })

// Animated background blobs
const AnimatedBg = () => (
  <>
    <motion.div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      animate={{ x: [0, 60, -60, 0], y: [0, -50, 50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      animate={{ x: [0, 80, -80, 0], y: [0, -80, 80, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
  </>
)

const Banner = () => {
  const [isOpen, setOpen] = useState(false)
  const [isVideoLoading, setVideoLoading] = useState(true)

  const openModal = useCallback(() => { setOpen(true); setVideoLoading(true) }, [])
  const closeModal = useCallback(() => setOpen(false), [])

  const features = [
    { icon: <MdQrCodeScanner size={22} />, text: "Instant Alerts" },
    { icon: <IoPhonePortrait size={22} />, text: "No App Needed" },
    { icon: <TbWorld size={22} />, text: "Global Peace" },
  ]

  return (
    <LazyMotion features={domAnimation}>
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-full font-sans min-h-screen flex items-center overflow-hidden
                   bg-gradient-to-br from-slate-50 via-sky-100 to-violet-100
                   pt-24 sm:pt-28 pb-16 sm:pb-20"
        style={{
          // Add padding top for mobile so nav bar doesn't overlap
          paddingTop: '6rem'
        }}
      >
        <AnimatedBg />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-10">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4">
              <span className="bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-500 text-transparent bg-clip-text animate-gradient-text">
                The Future of Finding<br className="hidden lg:block" />is Here.
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }}
              className="text-slate-700 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Never lose your valuables again. TagSync is the smart, simple, and secure way to connect your physical items to the digital world.
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="glass-gradient-card flex items-center sm:flex-row justify-center sm:justify-start gap-2 px-4 
                             py-2 sm:py-3 h-[55px] sm:h-[65px] text-center sm:text-left"
                >
                  <div className="text-fuchsia-500">{feature.icon}</div>
                  <p className="text-sm font-semibold text-slate-800">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
            >
              <button
                className={`group relative text-base font-semibold text-white py-3 px-8 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/50 w-full sm:w-auto overflow-hidden`}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Get Your TagSync</span>
              </button>
              <button onClick={openModal} className="group flex items-center text-slate-700 font-semibold cursor-pointer">
                <div className="mr-3 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image src={'/images/banner/playbutton.svg'} alt='play button' width={20} height={20} />
                </div>
                <span className="group-hover:text-violet-600 transition-colors">How It Works</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT (IMAGE) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            animate={{ y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <Image
              src="/images/banner/banner.svg"
              alt="TagSync Product Showcase"
              width={1300}
              height={1300}
              className="w-[100%] sm:w-[90%] lg:w-[130%] max-w-none mx-auto h-auto"
              priority
            />
          </motion.div>
        </div>

        {/* VIDEO MODAL */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-4xl relative border border-white/20"
            >
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50 rounded-2xl">
                  <PreLoader />
                </div>
              )}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h3 className="text-slate-800 font-semibold">How It Works</h3>
                <button onClick={closeModal} className="text-3xl leading-none text-orange-500 hover:text-violet-500">&times;</button>
              </div>
              <div className="p-2 sm:p-4">
                <iframe className="w-full aspect-video rounded-lg"
                  src="/videos/howItWorks.mp4"
                  title="How TagSync Works"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setVideoLoading(false)}
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}

        {/* GLOBAL STYLES */}
        <style jsx global>{`
          html, body {
            overscroll-behavior: contain;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          .animate-gradient-text {
            background-size: 300% 300%;
            animation: gradient-text 4s cubic-bezier(0.4,0,0.2,1) infinite;
          }
          @keyframes gradient-text {
            0%,100% { background-position: left center; }
            50% { background-position: right center; }
          }
          .glass-gradient-card {
            position: relative;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1.2px solid transparent;
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            overflow: hidden;
          }
          .glass-gradient-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.2px;
            background: linear-gradient(135deg, #a855f7, #6366f1, #22d3ee);
            background-size: 300% 300%;
            animation: gradient-move 6s cubic-bezier(0.4,0,0.2,1) infinite;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }
          .glass-gradient-card:hover {
            background: rgba(255, 255, 255, 0.35);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
          }
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </motion.section>
    </LazyMotion>
  )
}




export default Banner
