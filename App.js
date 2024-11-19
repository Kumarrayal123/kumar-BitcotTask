import Add from "./Add";
import "./App.css";
import Home from "./Home";
import Read from "./Read";
import Update from "./Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/read/:id" element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
