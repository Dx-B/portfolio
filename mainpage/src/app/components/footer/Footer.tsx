"use client"
import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import ServiceText from './components/ServiceText'

const Footer = () => {
  return (
    <div id="footer" className="z-50 min-w-full flex flex-col">
        {/* Blend */}
        <div className="z-40 bg-gradient-to-t from-black opacity-100 w-full h-40"></div>
          <div className="min-w-full flex flex-col bg-black bg-opacity-100">
            {/* Footer Content */}
          <div id="footer-content" className="pb-16 w-[60%] mx-auto bg-black">
            {/* Legal Row */}
            <div className="sm:mb-32 grid text-center z-50 py-6 pb-10 lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <h2 className={`mb-3 text-2lg font-semibold px-5 py-4 flex-col`}>
                  Products & Services
                  <div className="font-normal">
                    <ServiceText text="Glucose Monitoring" href="products"/>
                    <ServiceText text="Blood Oxygen Meter" href="products"/>
                    <ServiceText text="Blood Alcohol Detection" href="products"/>
                    <ServiceText text="Step Detector" href="products"/>
                    <ServiceText text="Get a quote" href="about"/>
                    </div>
                </h2>

                <h2 className={`mb-3 text-2lg font-semibold px-5 py-4 flex-col`}>
                  About
                  <div className="font-normal">
                    <ServiceText text="History" href="about"/>
                    <ServiceText text="Design Philosophy" href="about"/>
                    <ServiceText text="Our Mission" href="about"/>
                    <ServiceText text="Contact Us" href="about"/>
                  </div>
                </h2>

                <h2 className={`mb-3 text-2lg font-semibold px-5 py-4 flex-col`}>
                  Resources
                  <div className="font-normal">
                    <ServiceText text="API Documentation" href="resources"/>
                    <ServiceText text="Replacement Parts Info" href="resources"/>
                    <ServiceText text="Usage Manual" href="resources"/>
                    <ServiceText text="Legal" href="resources/legal"/>
                    <ServiceText text="Licensing and Patents" href="resources/legal"/>
                  </div>
                </h2>

                <h2 className={`mb-3 text-2lg font-semibold px-5 py-4 flex-col`}>
                  Our Team
                  <div className="font-normal">
                    <ServiceText text="Contact" href="team"/>
                    <ServiceText text="Licensing" href="team"/>
                    <ServiceText text="Partners" href="team"/>
                    <ServiceText text="Investment" href="team"/>
                  </div>
                </h2>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-500 lg:w-full lg:mb-0 lg:text-left"></div>
            {/* Logo */}

            {/* Bottom */}
            <div className="flex flex-col items-center  sm:justify-between space-y-4 sm:flex-row sm:space-x-4 lg:w-full">
              <div className="flex flex-col pt-3">
                <p className="text-sm text-gray-500">
                  © 2023 Berta Medical.
                </p>
                <p className="text-xs text-gray-500">
                  All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://google.com"
                  className="text-gray-500 hover:text-gray-600"
                >
                  {/* Twitter */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" className="w-8 h-8" alt="twitter logo"/>
                </a>
                <a
                  href="https://google.com"
                  className="text-gray-500 hover:text-gray-600"
                >
                  {/* GitHub */}
                  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="w-8 h-8 invert" alt="github logo"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Footer;