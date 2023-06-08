import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/noteContext'


const AboutUs = () => {
 /* const a = useContext(noteContext)
  useEffect(()=>{
      a.update()
      // eslint-disable-next-line
  },[])*/
  return (
    <div>
      <h1>This is About Page</h1>
    </div>
  )
}

export default AboutUs
