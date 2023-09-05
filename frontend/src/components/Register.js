import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    const userData = { fName, lName, email, password };

    axios
      .post("http://localhost:5000/registerUser", userData)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <Box
      height="100vh"
      bgColor="#94A684"
      display="flex"
      justifyContent="center"
    >
      <Box mt={5} letterSpacing={4}>
        <Heading fontWeight="bold" textAlign="center">
          REGISTRATION
        </Heading>
        {/* registration form starts */}
        <Box
          mt={5}
          bg="#E4E4D0"
          padding={[10, 10]}
          borderRadius={10}
          width={["80vw", "35vw"]}
        >
          <FormControl>
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              gap={5}
              width="100%"
            >
              <Box>
                <FormLabel htmlFor="fName">First Name</FormLabel>
                <Input
                  id="fName"
                  type="text"
                  placeholder="Enter Your First Name"
                  _placeholder={{
                    opacity: 0.6,
                    color: "black",
                  }}
                  border="2px solid black"
                  focusBorderColor="gray.400"
                  width="100%"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="lName">Last Name</FormLabel>
                <Input
                  id="lName"
                  type="text"
                  placeholder="Enter Your Last Name"
                  _placeholder={{ opacity: 0.6, color: "black" }}
                  border="2px solid black"
                  focusBorderColor="gray.400"
                  width="100%"
                  value={lName}
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box mt={5}>
              <FormLabel htmlFor="email">Email Name</FormLabel>
              <Input
                id="email"
                type="text"
                placeholder="Enter Your Email"
                _placeholder={{ opacity: 0.6, color: "black" }}
                border="2px solid black"
                focusBorderColor="gray.400"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="off"
              />
            </Box>
            <Box mt={5}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                _placeholder={{ opacity: 0.6, color: "black" }}
                border="2px solid black"
                focusBorderColor="gray.400"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
              />
            </Box>
          </FormControl>
          <Button
            mt={5}
            onClick={register}
            bgColor="#FFEEF4"
            _hover={{ bgColor: "green", color: "white" }}
          >
            Sign Up
          </Button>
          <Box mt={5} color="blue">
            <NavLink to="/login">Create new account</NavLink>
          </Box>
        </Box>
        {/* registration form ends */}
      </Box>
    </Box>
  );
}

export default Register;
