'use client'

import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 220 }}
      >
          <div className='flex  space-x-2 justify-center items-center bg-[#C1D7F057] border border-[#BCD5EC] rounded-xl p-5'>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
          </div>
      </motion.div>
  )
}

export default Loader