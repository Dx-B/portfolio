import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'

type Input = {
    text: string
    href: string
}

const ServiceText = ({text, href} : Input) => {
  return (
    <p className={`w-full pt-4 opacity-50`}>
        <Link href={`/${href}`}>
            <motion.button whileHover={{opacity: 0.8}} whileTap={{scale: 0.975}} className=''>
                <p className='flex flex-col text-start'>
                    {text}
                </p>
            </motion.button>
        </Link>
    </p>
  )
}

export default ServiceText