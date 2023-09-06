import { Box } from "@chakra-ui/react";
import Register from "./components/userAuthentication/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/userAuthentication/Login";
import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddProduct";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-products" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
