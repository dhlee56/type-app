import React, {useState} from 'react'
import { useAuth} from './AuthContext'
import IonIcon from '@reacticons/ionicons';

const Login = () => {
    const { authUser, setAuthUser, isAuthenticated, setIsAuthenticated } = useAuth();
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setAuthUser("John Doe");
        setIsAuthenticated(true);
      };
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setAuthUser(null);
        setIsAuthenticated(false);
      };
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("password")
    const [icon, setIcon] = useState<"eye-off-outline" | "eye-outline">("eye-outline")  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("username", username);
        console.log("password", password);
        fetch("http://localhost:4000/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name: username,
                  password: password,
              }),
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                if (result.success) {
                  setAuthUser(result.user.name);
                  setIsAuthenticated(true);
                } else {
                  alert("Invalid username or password");
                }
              })
    }
    const handleToggle = () => {
        console.log("toggle", type);
    if (type==='password'){
        setIcon("eye-off-outline");
        setType('text')
    } else {
        setIcon("eye-outline");
        setType('password')
    }
    }
const loginForm = () => {
    return (
        <form onSubmit={(e) => handleSubmit(e)} 
        style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black', padding: '10px'}}
      >
        <div style={{display: 'flex', width: '50%', flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}}>
          <label>Username</label>
          <input 
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password</label>
          <input 
            type={type}
            name="password"
            placeholder="Enter authorized password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span onClick={handleToggle}>
                  <IonIcon name={icon}
                    style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }
                      }   
                  />
          </span>
        </div>
        <div style={{padding: '10px'}}>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
}
  return (
    <div>
        <button onClick={(e)=>handleLogin(e)}>Login</button>
        <button onClick={(e)=>handleLogout(e)}>Logout</button>
        <div>{authUser}</div>
        <div>{!isAuthenticated && loginForm()}</div>
    </div>
  )
}

export default Login