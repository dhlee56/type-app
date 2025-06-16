import React, { useState, useEffect } from 'react'
type User = {
  id: number;
  name: string;
  email: string;
}
const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((tusers) => {
        //console.log(users)
        const musers = tusers.map((user: User) => (
          {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        ))
        setUsers(musers)
      })
  }, [])
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
