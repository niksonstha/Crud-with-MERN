import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const login = async () => {
    try {
      const loginData = { email, password };
      console.log(loginData);

      let response = await axios.post("http://localhost:5000/login", loginData);

      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        toast({
          title: "Wrong Credentials",
          description: "Please check your email and password.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  });
  return (
    <Box
      height="100vh"
      bgColor="#94A684"
      display="flex"
      justifyContent="center"
    >
      <Box mt={5} letterSpacing={4}>
        <Heading fontWeight="bold" textAlign="center">
          Login Page
        </Heading>
        {/* Login form starts */}
        <Box
          mt={5}
          bg="#E4E4D0"
          padding={[10, 10]}
          borderRadius={10}
          width={["80vw", "35vw"]}
        >
          <FormControl>
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
            onClick={login}
            bgColor="#FFEEF4"
            _hover={{ bgColor: "green", color: "white" }}
          >
            Login
          </Button>
        </Box>
        {/* login form ends */}
      </Box>
    </Box>
  );
}

export default Login;
