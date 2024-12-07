import React from 'react'

interface IPhoneFrameProps {
  children: React.ReactNode
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center w-[375px] max-h-[795px] h-full overflow-hidden">
      {/* Volume buttons */}
      <div className="absolute rounded-full top-[100px] left-[1px] w-[4px] h-[35px] bg-gray-400 rounded-l-full"></div>
      <div className="absolute rounded-full top-[150px] left-[1px] w-[4px] h-[65px] bg-gray-400 rounded-l-full"></div>
      {/* Silent switch */}
      <div className="absolute rounded-full top-[60px] left-[1px] w-[4px] h-[25px] bg-gray-400 rounded-l-full"></div>

      {/* Power button */}
      <div className="absolute rounded-full top-[120px] right-[0px] w-[4px] h-[65px] bg-gray-400 rounded-r-full"></div>

      <div className="relative w-[370px] max-h-[790px] border-4 border-gray-500 rounded-[50px] shadow-xl overflow-hidden">
        {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-[30px] bg-black rounded-b-3xl"></div> */}
        <div className="absolute top-[7px] left-1/2 transform -translate-x-1/2 w-[15%] h-[15px] bg-muted rounded-full"></div>
        <div className="absolute top-[10px] right-[20%] w-[10px] h-[10px] bg-muted rounded-full"></div>

        <div className="w-full h-full pt-[30px] pb-[10px] px-[10px]  overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

