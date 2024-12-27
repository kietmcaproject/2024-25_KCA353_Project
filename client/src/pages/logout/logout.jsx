import React from 'react'

const LogoutPage = () => {
    // Clear the local storage
    setTimeout(() => {
      localStorage.clear();
      // Redirect to the home page
      window.location.href = '/';
    }, 3000);

  return (
    <div>logging you out..</div>
  )
}

export default LogoutPage