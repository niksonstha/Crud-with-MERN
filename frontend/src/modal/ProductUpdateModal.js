import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

function ProductUpdateModal({ onClose, product, callGetProduct }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);

  const updateHandler = async () => {
    const updateData = { name, price, category, brand };
    try {
      await axios.put(
        `http://localhost:5000/update-product/${product._id}`,
        updateData
      );
      onClose();
      callGetProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {/* Backdrop */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black backdrop
          zIndex: 999, // Ensure the backdrop is above other content
        }}
        onClick={onClose}
      ></Box>

      {/* Modal */}
      <Box
        bg="#E4E4D0"
        width={["50%", "30%"]}
        position="absolute"
        top="30%"
        left={["30%", "35%"]}
        padding="30px"
        borderRadius="10px"
        zIndex="1000" // Ensure the modal is above the backdrop
      >
        <Box display="flex" flexDirection="column" gap={5}>
          <GrClose cursor="pointer" onClick={onClose} />
          <Input
            type="text"
            placeholder="Name"
            bgColor="#FFEEF4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Price"
            bgColor="#FFEEF4"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Category"
            bgColor="#FFEEF4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Brand"
            bgColor="#FFEEF4"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <Button onClick={updateHandler}>Update</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductUpdateModal;
