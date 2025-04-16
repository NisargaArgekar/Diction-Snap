import React from 'react'
import { NotebookPen,  History, BookMarked,  MoonStar   } from 'lucide-react';

function Nav() {
  return (
    <>
    <div className='number px-[250px] flex items-center justify-between h-[100px] border-bottom-[1px] border-[#374151]'>
      <div className="logo flex items-center gap-[5px]">
      <NotebookPen size={"40px"} color='black'/>
      <h3 className='text-[25px] font-semibold'>Diction<span className='text-blue-950'>Snap</span></h3>
      </div>
      <div className="icons flex items-center gap-[20px]">
      <History size={"35px"} className='cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#bcdee8]' />
      <BookMarked size={"35px"} className='cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#aac1c7]' />
      <MoonStar size={"35px"} className='cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#c5e1e9]'/>
      </div>
      
    </div>
        </>
  )
}

export default Nav