
const Admin = ({ zonals,ccs }) => {

  return (
    <div>
      {/* <h1>This is admin: {zonals?.map(z => <p key={z.zonal_code}>{z.zonal_name}</p>)}</h1> */}
      <h1>This is admin: {ccs?.map(cc => <p key={cc.cc_code}>{cc.cc_name}</p>)}</h1>
      {/* Rest of your JSX */}
    </div>
  );
};
export default Admin;
