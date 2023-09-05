import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import axios from "axios";

function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  let auth = localStorage.getItem("user");
  auth = JSON.parse(auth);

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

  const inputHandler = async () => {
    let userID = auth._id;
    let todo = input;

    const todos = { userID, todo };

    try {
      const result = await axios.post(
        "http://localhost:5000/insert-todoItems",
        todos
      );
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box bg="#94A684" height="100vh" letterSpacing={5}>
      <Box display="flex">
        <Box mt={5} display="flex" justifyContent="space-evenly" width="100%">
          <Heading>TODO APPLICATION</Heading>
          <Button onClick={logoutHandler}>
            Logout {auth.fName + " " + auth.lName}
          </Button>
        </Box>
      </Box>
      {/* TODO INPUT FIELD START */}
      <Box width="50%" m="auto">
        <Box width="100%" mt={5} borderRadius={5}>
          <FormLabel htmlFor="todoField" fontWeight="bold">
            Enter your todo activity
          </FormLabel>
          <Box display="flex" alignItems="center" gap={2}>
            <Input
              id="todoField"
              type="text"
              placeholder="Enter your todo here"
              border="none"
              focusBorderColor="pink.400"
              padding={7}
              _placeholder={{ opacity: 0.7, color: "black" }}
              fontSize="1.2rem"
              bgColor="#FFEEF4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              padding={7}
              bgColor="#AEC3AE"
              _hover={{ bgColor: "#FFEEF4" }}
              onClick={inputHandler}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Box>
      {/* TODO INPUT FIELD ENDS */}

      {/* TODO LIST ITEMS  */}
      <Box>
        <TodoList />
      </Box>
    </Box>
  );
}

export default Home;
