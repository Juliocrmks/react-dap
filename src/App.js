import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import SalesForm from "./pages/SalesForm";



import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/auth";
import MenuBar from "./components/MenuBar";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <MenuBar/>
          <Container className="pt-5">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/customerdashboard" element={<CustomerDashboard/>} />
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/salesform" element={<SalesForm/>} />

            </Routes>

          </Container>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
