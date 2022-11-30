import React from "react";
// import { Button, Form } from "semantic-ui-react";
import { useState } from "react";
// import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Select, MenuItem, OutlinedInput, ListItemText } from "@mui/material";
import axios from "axios";

function Register(props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const context = useContext(AuthContext);
  const [perm, setPerm] = useState([]);
  const permisions = ["admin", "warehouse", "sales", "delivery"];

  const handleSubmit = async (event) => {
    var tempPerm = null;
    console.log(perm)
    switch (perm[0]) {
      case 'admin':
        tempPerm = 1
      case 'warehouse':
        tempPerm = 2
      case 'sales':
        tempPerm = 3
      case 'delivery':
        tempPerm = 4
  
      default:
        tempPerm = 1
    }
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const user = {
      name:data.get('name'),
      email:data.get('email'),
      password:data.get('password'),
      surname:data.get('surname'),
      role_id:tempPerm
    }
    console.log(data)
    const newUser = await axios.post("http://localhost:8000/api/user", user);
    // console.log(newUser);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPerm(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register A New User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="name"
            type="text"
            id="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="surname"
            label="surname"
            type="text"
            id="surname"
          />
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          <Typography>Permissions</Typography>
          <Select
            labelId="permision-label"
            id="permision-checkbox"
            value={perm}
            onChange={handleChange}
            input={<OutlinedInput label="permision" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {permisions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={perm.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register the user
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
