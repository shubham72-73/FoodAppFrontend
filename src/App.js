import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import { CardProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';

function App() {
  return (
    <CardProvider>
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/Login" element={<Login/>} />
          <Route exact path="/Createuser" element={<Signup/>} />
          <Route exact path="/myOrder" element={<MyOrder/>} />
        </Routes>
      </div>
    </Router>
    </CardProvider>
  );
}

export default App;
