import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'; // Import the useSession hook

function AuthorizedRoute({ roles, children }) {
  const router = useRouter();
  const { data: session } = useSession(); // Use the data property to access session data

  const role = session?.role?.role; // Access the role from the session data
  //console.log(role)
  if (!roles.includes(role)) {
    // Redirect the user to an unauthorized page or handle it as needed
    router.push('/unauthorized');
    return null;
  }

  return children;
}

export default AuthorizedRoute;
