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

      <div className="relative w-[370px] z-30 max-h-[790px] min-h-[750px] border-4 border-gray-500 rounded-[50px] shadow-xl overflow-hidden">
        {/* Network signal icon */}
        <div className="absolute top-[0px] z-20 left-1/2 transform -translate-x-1/2 w-[100%] h-[27px] bg-background">
          <div className="ml-[25px] -mt-1 flex items-end w-full h-[27px] gap-[2px]">
            {/* Signal bars */}
            <div className="w-[3px] left-0 h-[5px] bg-gray-600 rounded"></div>
            <div className="w-[3px] left-0 h-[8px] bg-gray-600 rounded"></div>
            <div className="w-[3px] left-0 h-[11px] bg-gray-600 rounded"></div>
            <div className="w-[3px] left-0 h-[14px] bg-gray-600 rounded"></div>
            <div className="w-[3px] left-0 h-[17px] bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="absolute top-[6px] z-20 left-1/2 transform -translate-x-1/2 w-[15%] h-[15px] bg-muted rounded-full"></div>
        <div className="absolute top-[9px] z-20 right-[20%] w-[10px] h-[10px] bg-muted rounded-full"></div>


        <div className="w-full h-full pt-[27px] pb-[10px]  max-h-[760px] overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-background
                        hover:scrollbar-thumb-background">
          {children}
        </div>
      </div>


    </div>
  )
}

