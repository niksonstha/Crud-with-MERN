import { Box, List, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const onlogoutHandler = () => {
    localStorage.clear("user");
  };
  return (
    <Box bg="#94A684">
      <UnorderedList bg="#E4E4D0" ml={0}>
        <List
          display="flex"
          gap={5}
          fontSize="1.5rem"
          letterSpacing={3}
          alignItems="center"
          height="100px"
          ml={5}
        >
          <NavLink to="/home">Products</NavLink>
          <NavLink to="/add-products">Add Prodcuts</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/login" onClick={onlogoutHandler}>
            Logout
          </NavLink>
        </List>
      </UnorderedList>
    </Box>
  );
}

export default Navbar;
