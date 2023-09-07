import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let auth = localStorage.getItem("user");
      auth = JSON.parse(auth);
      let userID = auth._id;

      let result = await axios.get(
        `http://localhost:5000/productList/${userID}`
      );
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      let result = await axios.delete(
        `http://localhost:5000/delete-product/${id}`
      );
      console.log(result);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box bg="#94A684" minHeight="100vh">
      <Navbar />
      <Box p={8}>
        <Heading as="h1" size="xl" mb={4}>
          Your Products
        </Heading>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Brand</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.category}</Td>
                <Td>{product.brand}</Td>
                <Td display="flex" gap={5}>
                  <Button>
                    <FaPen color="green" />
                  </Button>
                  <Button>
                    <FaTrash
                      color="red"
                      onClick={() => deleteHandler(product._id)}
                    />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Home;
