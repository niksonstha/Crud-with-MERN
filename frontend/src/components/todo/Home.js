import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  });
  return (
    <Box>
      <Heading>I am home page</Heading>
      <Button onClick={logoutHandler}>Logout</Button>
    </Box>
  );
}

export default Home;
