import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const addHandler = async () => {
    let auth = localStorage.getItem("user");
    auth = JSON.parse(auth);
    let userID = auth._id;
    console.log(userID);

    let priced = Number(price);
    console.log(priced);

    const productData = { name, price: priced, category, brand, userID };
    try {
      let result = await axios.post(
        "http://localhost:5000/insert-product",
        productData
      );

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    setName("");
    setPrice("");
    setCategory("");
    setBrand("");
  };

  return (
    <Box bg="#94A684" height="100vh">
      <Navbar />
      <Heading mt={5} textAlign="center">
        Add products
      </Heading>

      <Box
        height="100vh"
        bgColor="#94A684"
        display="flex"
        justifyContent="center"
      >
        <Box mt={5} letterSpacing={4}>
          <Box
            mt={5}
            bg="#E4E4D0"
            padding={[10, 10]}
            borderRadius={10}
            width={["80vw", "35vw"]}
          >
            <FormControl>
              <Box mt={5}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  _placeholder={{ opacity: 0.6, color: "black" }}
                  border="2px solid black"
                  focusBorderColor="gray.400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </Box>
              <Box mt={5}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  type="price"
                  placeholder="Enter product price"
                  _placeholder={{ opacity: 0.6, color: "black" }}
                  border="2px solid black"
                  focusBorderColor="gray.400"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  autoComplete="off"
                />
              </Box>
              <Box mt={5}>
                <FormLabel htmlFor="Category">Category</FormLabel>
                <Input
                  id="Category"
                  type="text"
                  placeholder="Enter product category"
                  _placeholder={{ opacity: 0.6, color: "black" }}
                  border="2px solid black"
                  focusBorderColor="gray.400"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoComplete="off"
                />
              </Box>
              <Box mt={5}>
                <FormLabel htmlFor="Brand">Brand</FormLabel>
                <Input
                  id="Brand"
                  type="text"
                  placeholder="Enter product brand"
                  _placeholder={{ opacity: 0.6, color: "black" }}
                  border="2px solid black"
                  focusBorderColor="gray.400"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  autoComplete="off"
                />
              </Box>
            </FormControl>
            <Button
              mt={5}
              bgColor="#FFEEF4"
              _hover={{ bgColor: "green", color: "white" }}
              onClick={addHandler}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddProduct;
