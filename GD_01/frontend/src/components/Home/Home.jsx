import React from 'react'
import '../../styles/Home.css'
import StatisticsSection from './Strip'
import Article from './Article'
import Guest from './Guest'
import Background from './Background'
import CarGlimpse from './carGlimpse'

const Home = () => {
  return (
    <div>
      <Background />
      <CarGlimpse/>
      <StatisticsSection/>
      <Article/>
      <Guest/>
     
    </div>
  )
}

export default Home
