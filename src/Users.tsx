import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
type User = {
  id: number;
  name: string;
  email: string;
}
const Users = () => {
    const { authUser, isAuthenticated } = useAuth();
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
  const [userInput, setUserInput] = useState({
      name: "",
      email: "",
      username: "",
      phone: ""
    });
    function handleInputChange(field: any, event: { target: { value: any; }; }) {
      setUserInput((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    }
  
    function handleSubmit(event: any) {
      event.preventDefault();
      //console.log(userInput);
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setUserInput({
            name: "",
            email: "",
            username: "",
            phone: ""
          });
        });
  
    }
   
 const userInputForm = () => {
    return (
        <form onSubmit={handleSubmit}>
          <h2>Userinput</h2>
          <div className="control">
            <label>Email</label>
            <input
              type="email"
              onChange={(event) => handleInputChange("email", event)}
              value={userInput.email}
            />
          </div>
          <div className="control">
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => handleInputChange("name", event)}
              value={userInput.name}
            />
          </div>
          <div className="control">
            <label>Username</label>
            <input
              type="text"
              onChange={(event) => handleInputChange("username", event)}
              value={userInput.username}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              onChange={(event) => handleInputChange("phone", event)}
              value={userInput.phone}
            />
          </div>
          <p>
            <button type="submit">Submit</button>
          </p>
        </form>
    )
 }  
  return (
    <div>
      <h3>Users</h3>
      {isAuthenticated && userInputForm()}
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
