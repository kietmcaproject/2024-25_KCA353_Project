import React, { useEffect, useState } from 'react'
import { ChevronRight, User, Star, Package, Share2 } from 'lucide-react'

const Header = () => {
  const [userData, setUserData] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData)
        setUserData(parsedData)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    setIsVisible(true)
  }, [])

  return (
    <header className="relative h-[34vw] min-h-[300px] max-h-[600px] mx-auto my-8 rounded-[30px] overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: "url('/header-image.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />

      {userData && userData.user && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg transition-all duration-300 hover:bg-white/20">
            <div className="flex items-center mb-2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full p-1 mr-3">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{`${userData.user.FirstName} ${userData.user.LastName}`}</h3>
                <p className="text-xs text-gray-300">{userData.user.Email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm text-white">
              <div className="flex flex-col items-center">
                <Star className="h-5 w-5 text-yellow-400 mb-1" />
                <span>{parseFloat(userData.user.ProfileScore.$numberDecimal).toFixed(1)}</span>
                <span className="text-xs text-gray-300">Score</span>
              </div>
              <div className="flex flex-col items-center">
                <Package className="h-5 w-5 text-blue-400 mb-1" />
                <span>{userData.user.ItemsRequested}</span>
                <span className="text-xs text-gray-300">Requested</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="h-5 w-5 text-green-400 mb-1" />
                <span>{userData.user.ItemsShared}</span>
                <span className="text-xs text-gray-300">Shared</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`absolute bottom-[10%] left-[6vw] z-20 max-w-[50%] flex flex-col items-start gap-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-white text-[clamp(24px,4.5vw,64px)] font-medium leading-tight">
          Life's too short to own. Live it{' '}
          <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">shared</span>.
        </h2>
        <p className="text-white text-[clamp(16px,1vw,24px)] animate-fadeIn">
          Join us now and be part of the sustainable future.
        </p>
        <a
          href={userData ? '/addRequest' : '/signup'}
          className="bg-white text-black font-bold py-4 px-8 rounded-full text-[clamp(16px,1vw,24px)] transition duration-300 ease-in-out hover:bg-yellow-400 hover:scale-105 transform flex items-center"
        >
          {userData ? "Add a New Request" : "Create Your Account"}
          <ChevronRight className="ml-2 h-6 w-6" />
        </a>
      </div>
    </header>
  )
}

export default Header