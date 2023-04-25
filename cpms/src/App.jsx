import Main from "./assets/Screens/Main";
import Views from "./assets/Screens/Views";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Start from "./assets/Screens/Start";
import Exit from "./assets/Screens/Exit";
import Register from "./assets/Screens/Register";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/records" element={<Views />} />
          <Route path="/main" element={<Main />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
