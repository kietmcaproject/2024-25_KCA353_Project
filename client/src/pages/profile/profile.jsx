import { useState } from 'react'
import { user } from '../../assets/user'

export default function Profile() {
  const [activeSection, setActiveSection] = useState('profile')

  let userData = localStorage.getItem('userData');

  userData = JSON.parse(userData);

  if (userData == null) {
    window.location.href = '/login';
  }
  
  
  const { FirstName, LastName, ItemsRequested, ItemsShared, Email, Username, ProfileScore } = userData.user;
  

  //The Color of the rating button changes depending upon the Profile Score.
  const calcColorOfRating = () => {
    return ProfileScore.$numberDecimal > 4 ? 'bg-green-500' : ProfileScore.$numberDecimal > 3 ? 'bg-yellow-500' : 'bg-red-500'
  }

  const renderSettingsContent = () => {
    switch (activeSection) {

      // PROFILE SECTION

      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Profile Settings</h3>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">User Name</label>
              <input type="text" id="name" className="w-full px-3 py-2 border rounded-md bg-gray-200" defaultValue={Username} disabled />
            </div>

            <div className='flex flex-row justify-between'>
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">First Name</label>
                <input type="text" id="name" className="max-w-full px-3 py-2 border rounded-md" defaultValue={FirstName} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Last Name</label>
                <input type="text" id="name" className="max-w-full px-3 py-2 border rounded-md" defaultValue={LastName} required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">College Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border rounded-md bg-gray-200" defaultValue={Email} disabled />
            </div>

            <div className="space-y-2">
              <button className='bg-blue-600 px-5 py-3 text-white rounded-lg hover:bg-black transition-all duration-300 transform hover:-translate-y-1' onClick={() => {

                // When the user clicks on the save changes button.

              }}>Save Changes</button>
            </div>
          </div>
        )


      // PASSWORD SECTION
      case 'password':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Password Settings</h3>
            <div className="space-y-2">
              <label htmlFor="current-password" className="block text-sm font-medium">Current Password</label>
              <input type="password" id="current-password" className="w-full px-3 py-2 border rounded-md" defaultValue="" />
            </div>
            <div className="space-y-2">
              <label htmlFor="new-password" className="block text-sm font-medium">New Password</label>
              <input type="password" id="new-password" className="w-full px-3 py-2 border rounded-md" defaultValue="" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm New Password</label>
              <input type="password" id="confirm-password" className="w-full px-3 py-2 border rounded-md" defaultValue="" />
            </div>

            <div className="space-y-2">
              <button className='bg-blue-600 px-5 py-3 text-white rounded-lg hover:bg-black transition-all duration-300 transform hover:-translate-y-1' onClick={() => {

                // When the user clicks on the save changes button.

              }}>Save Changes</button>
            </div>
          </div>
        )


      //Account Section
      case 'account':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">🚨Red Zone</h3>
            <div className="space-y-2">
              <label htmlFor="notifications" className="block text-sm font-medium">Click the button below if you want to delete your account. Please note that this action is irreversible.</label>
              <div className="space-y-2">
                <button className='bg-red-600 px-5 py-3 text-white rounded-lg hover:bg-red-900' onClick={() => {

                  // When the user clicks on the delete account button.



                }}>Delete my account</button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex justify-center mt-10 mb-10 border-solid">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center">
            <img src={user.ProfileImage} className="w-24 h-24 rounded-full object-cover" />
            <h2 className="text-3xl font-bold mt-4">{FirstName + " " + LastName}</h2>
          </div>

          <div className="w-full max-w-4xl mx-auto p-4">

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="bg-gray-200 text-black rounded-xl p-6 flex-1 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="font-bold text-lg sm:text-xl text-center mb-2">Items Requested</h2>
                <p className="font-semibold text-4xl sm:text-5xl text-center">{ItemsRequested}</p>
              </div>

              <div className={calcColorOfRating() + " text-white rounded-xl p-6 flex-1 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"}>
                <h2 className="font-bold text-lg sm:text-xl text-center mb-2">Profile Score</h2>
                <p className="font-semibold text-4xl sm:text-5xl text-center">{ProfileScore.$numberDecimal}</p>
              </div>

              <div className="bg-gray-200 text-black rounded-xl p-6 flex-1 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="font-bold text-lg sm:text-xl text-center mb-2">Items Shared</h2>
                <p className="font-semibold text-4xl sm:text-5xl text-center">{ItemsShared}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex">
            <div className="w-1/3 pr-4 space-y-2">
              {['profile', 'password', 'account'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeSection === section ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)} Settings
                </button>
              ))}
            </div>
            <div className="w-2/3 pl-4 border-l">
              {renderSettingsContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}