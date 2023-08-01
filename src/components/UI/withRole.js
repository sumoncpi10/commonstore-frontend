// withRole.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withRole = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const router = useRouter();
    // Replace this with the actual logic to get the user role from the session or token.
    const userRole = 'admin'; // Assuming you retrieve the user role somehow.

    useEffect(() => {
      // Check if the user's role is included in the allowed roles.
      if (!allowedRoles.includes(userRole)) {
        // User is not authorized, redirect to an error page or show an error message.
        router.push('/error'); // Replace '/error' with the appropriate error page.
      }
    }, []);

    // Render the WrappedComponent if the user is authorized.
    return <WrappedComponent {...props} />;
  };
};

export default withRole;
