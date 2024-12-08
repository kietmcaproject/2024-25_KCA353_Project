const RoleBasedComponent = ({ allowedRoles, children }) => {
    const userRole = localStorage.getItem('role'); // Retrieve the stored role
  
    if (!allowedRoles.includes(userRole)) {
      return null; // Render nothing if the user role is not allowed
    }
  
    return children;
  };
  
  export default RoleBasedComponent;
  