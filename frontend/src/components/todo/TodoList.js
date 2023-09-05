import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const getItems = async () => {
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    let userID = userData._id;

    try {
      let result = await axios.get(`http://localhost:5000/todoList/${userID}`);
      setTodos(result.data); // Set the todos state with the fetched data
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  }, [todos]);

  return (
    <div>
      {todos.map((todo) => (
        <Box
          key={todo._id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="#FFEEF4"
          width="50%"
          marginLeft="auto"
          mr="auto"
          padding={3}
          mt={5}
          fontWeight="bold"
        >
          <Text>{todo.todo}</Text>
          <Box display="flex" gap={4}>
            <Button bgColor="#AEC3AE" _hover={{ bgColor: "#94A684" }}>
              Edit
            </Button>
            <Button bgColor="#AEC3AE" _hover={{ bgColor: "#94A684" }}>
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default TodoList;
