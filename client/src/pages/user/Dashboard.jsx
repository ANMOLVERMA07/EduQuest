import React from 'react'
import Sidebar from '../../components/Sidebar'
import { cn } from '../../utils/helper'

const Dashboard = () => {
  return (
    <div className='flex flex-cols'>
      <Sidebar/>
      <div
            className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
            <div
              className={cn(
                "absolute inset-0",
                "[background-size:40px_40px]",
                "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
              )} />
              <h1 className='text-white'>Hello</h1>
      </div>
    </div>
  )
}

export default Dashboard