import "./App.css";
import DataState from "./context/DataState";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Background from "./components/Background";
import Body from "./components/Body";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

function App() {
  return (
    <div className="App">
      <DataState>
        <Background />
        <Alert />
        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
        </Routes>
      </DataState>
    </div>
  );
}

export default App;
