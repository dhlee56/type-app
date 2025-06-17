import React from 'react';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from './AuthContext';
type User = {
  id: number;
  name: string;
  email: string;
}
function Home() {
  const { authUser, isAuthenticated} = useAuth();
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("initial message")
  const [users, setUsers] = useState<User[]>([])


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
      </div>
    </div>
  );
}
export default Home;
