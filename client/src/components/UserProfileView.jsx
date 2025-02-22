const UserProfileView = ({ user }) => {
  return (
    <div>
      {Object.keys(user).map((key) => (
        <p key={key}>{`${key}: ${user[key]}`}</p>
      ))}
    </div>
  )
}

export default UserProfileView