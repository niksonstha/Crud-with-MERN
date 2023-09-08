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
import ProductUpdateModal from "../../modal/ProductUpdateModal";

function Home() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);

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
      await axios.delete(`http://localhost:5000/delete-product/${id}`);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (product) => {
    setModalProduct(product);
    console.log(product);
    setModal(true);
  };
  const closeModal = (id) => {
    setModal(false);
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
              <Th>S.N</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Brand</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={product._id}>
                <Td>{index + 1}</Td>
                <Td>{product.name}</Td>
                <Td>{product.price}$</Td>
                <Td>{product.category}</Td>
                <Td>{product.brand}</Td>
                <Td display="flex" gap={5}>
                  <Button onClick={() => openModal(product)}>
                    <FaPen color="green" />
                  </Button>
                  <Button onClick={() => deleteHandler(product._id)}>
                    <FaTrash color="red" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {modal && (
        <ProductUpdateModal
          onClose={closeModal}
          product={modalProduct}
          callGetProduct={getProducts}
        />
      )}
    </Box>
  );
}

export default Home;
