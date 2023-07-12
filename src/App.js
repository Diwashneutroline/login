import Form from "./pages/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/signup" element={<Form />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
