import React from 'react'
import { NotebookPen,  History, BookMarked,  MoonStar   } from 'lucide-react';

function Nav() {
  return (
    <>
    <div className='number px-[20px] sm:px-[50px] md:px-[100px] lg:px-[250px] flex flex-wrap items-center justify-between h-auto py-5 border-b border-[#151415]'>

      <div className="logo flex items-center gap-[5px]">
      <NotebookPen className='size-13 text-blue-800'/>
      <h3 className='text-[25px] font-semibold'>Diction<span className='text-blue-800'>Snap</span></h3>
      </div>
      <div className="icons flex items-center gap-[20px]">
      <History size={"35px"} className='cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#bcdee8] text-blue-800' />
      <BookMarked size={"35px"} className='cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#bcdee8] text-blue-800' />
      <MoonStar size={"35px"} className='cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#bcdee8] text-blue-800'/>
      </div>
      
    </div>
        </>
  )
}

export default Nav 