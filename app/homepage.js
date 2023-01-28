import React from 'react'
import { previewData } from 'next/headers';



const HomePage = () => {
  if(previewData()){
    return <div>preview mode</div>
  }
  return (
    <div>HomePage</div>
  )
}

export default HomePage