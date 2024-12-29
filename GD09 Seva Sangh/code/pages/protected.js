// pages/protected.js
import { getSession } from 'next-auth/react';

export default function ProtectedPage() {
  return (
    <div>
      <h1>Welcome to the Protected Page!</h1>
      <p>Only logged-in users can see this content.</p>
    </div>
  );
}

// Use getServerSideProps to protect this page
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If no session exists, redirect the user to the login page
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login', // Redirect to login if not authenticated
        permanent: false,
      },
    };
  }

  // If a session exists, continue to render the page
  return {
    props: { session },
  };
}
