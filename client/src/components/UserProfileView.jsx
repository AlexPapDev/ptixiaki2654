import pic from '..'
const UserProfileView = ({ user }) => {
  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      <img 
        src={user.profileimageurl || '/profile_placeholder.png'} 
        alt="Profile" 
        width={100} 
        height={100} 
      />
      <p>First Name: {user.firstname}</p>
      <p>Last Name: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserProfileView;

