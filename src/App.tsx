import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation'

import { AuthProvider } from './AuthContext';
function App() {
  return (
    <AuthProvider>
        <Navigation />
    </AuthProvider>
  );
}

export default App;
