import React from 'react';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
type User = {
  id: number;
  name: string;
  email: string;
}
function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("initial message")
  const [users, setUsers] = useState<User[]>([])
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

  출처: https://rudaks.tistory.com/entry/react-form을-다루는-5가지-방법 [[루닥스 블로그] 연습만이 살길이다:티스토리]

  // const getData = () => {
  //   const res = fetch("http://localhost:4000/")
  //   .then((response) => response.json())
  //   return res
  // }
  useEffect(() => {
    // getData().then((result) => {
    //   setMsg(result.message)
    // })
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((result) => {
        setMsg(result.message)
      })

  }, [])
  return (
    <div className="App">
      <h3>Hello World</h3>
      <div>
        <button
          // onClick={() => {setCount(count + 1);}}
          //onClick= {setCount(count+1)}
          onClick={() => {
            fetch("http://localhost:4000/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: {
                  name: "John",
                  email: "john@example.com",
                },
              }),
            })
              .then((response) => response.json())
              .then((result) => {
                setMsg(result.message)
              })
          }}
        >
          Click</button>
        <h1>New Text = {count}</h1>
        <div>
          <p>{msg}</p>
        </div>
        <button
          onClick={() => {
            fetch("http://localhost:4000/users")
              .then((response) => response.json())
              .then((tusers) => {
                //console.log(users)
                const musers = tusers.map((user: any) => (
                  {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  }
                ))
                setUsers(musers)
              })
          }
          }>
          Get users
        </button>

        <div>
          <h2>Users</h2>
          <ul style={{ width: "50%", margin: "auto" }}>
            {users.map((user) => (
              <li key={user.email} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <DeleteIcon onClick={
                  () => {
                    fetch(`http://localhost:4000/users/${user.id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      // body: JSON.stringify({
                      //   id: user.id
                      // })
                    })
                      .then((response) => response.json())
                      .then((result) => {
                        console.log(result)
                      })
                  }}/>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            fetch("http://localhost:4000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({

                name: "John",
                email: "a@b.com",
                username: "john Jhone",
                phone: "1234567890",

              })
            })
          }} >
          Set users
        </button>
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
      </div>
    </div>
  );
}
export default App;
