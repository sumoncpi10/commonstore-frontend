
async function yourDatabaseQueryToFetchUserData(mobileNo) {
  try {


    // Fetch user data from the API endpoint
    const resUser = await fetch(`http://localhost:5000/api/v1/user/user/01866115239`);
    const dataUser = await resUser.json();
    const user = dataUser.data || null;
    console.log(user, mobileNo)
    if (!user) {
      // User not found
      return null;
    }

    // Extract the necessary user data, including roles, from the 'user' object
    const { name, email, role, zonalCode, pbsCode } = user;

    // Return the user data as an object
    return {
      name,
      email,
      role,
      mobileNo,  // You can add mobileNo here if needed
      zonal_code: zonalCode,
      pbs_code: pbsCode,
    };
  } catch (error) {
    // Handle any errors that might occur during the database query
    console.error("Error fetching user data:", error);
    return null;
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}

export default yourDatabaseQueryToFetchUserData;
