

async function yourDatabaseQueryToFetchUserDataDetail(mobileNo) {
    try {
        const options = { mobileNo }
        const resUser = await fetch(`http://localhost:5000/api/v1/user/user/${mobileNo}`)
        const dataUser = await resUser.json();
        // console.log(dataUser)
        if (resUser.ok) {
            const { mobileNo, role, pbsCode, zonalCode } = dataUser.data;
            const user = {
                mobileNo,
                role,
                pbs_code: pbsCode,
                zonal_code: zonalCode,
            };

            return user;
        } else {
            console.error("Login failed:", dataUser.message);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default yourDatabaseQueryToFetchUserDataDetail;