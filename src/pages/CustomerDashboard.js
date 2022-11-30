import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TablePagination } from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import S3FileUpload from "react-s3";
import S3 from "react-aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "dap-react",
  dirName: "media",
  region: "us-east-1",
  accessKeyId: "AKIAXO2YMQVRRA44PCME",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomerDashboard() {
  var today = new Date("2022-11-17T06:29:00.000000Z");
  console.log(today.toLocaleDateString("en-US"));
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const columns = [
    { id: "id", headerName: "Invoice ID", width: 70 },
    { id: "client_id", headerName: "Customer ID", width: 130 },
    { id: "updated_at", headerName: "Date", width: 130 },
    {
      id: "status_id",
      headerName: "Status",
    },
    {
      id: "id",
      headerName: "action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const [modalData, setModalData] = useState({
    client_id: 1,
    created_at: "2022-11-16T00:49:30.000000Z",
    delivery_address: "1234 calle ave ",
    id: 1,
    status_id: 2,
    total: "1405.09",
    updated_at: "2022-11-16T00:49:30.000000Z",
    rows: [],
  });

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await axios.get("http://localhost:8000/api/invoice");
      console.log(data);
      setRows(data.data);
      return data;
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const changeHandler = (event) => {
    console.log(event);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleImage = async () => {
    if (isFilePicked) {
      var image = await S3FileUpload.uploadFile(selectedFile, config);
      var query = modalData.id;
      setModalData({ ...modalData, transport: image.location });
      var tempData = { ...modalData, transport: image.location };
      var img = await axios.put(
        `http://localhost:8000/api/invoice/${query}`,
        tempData
      );
      console.log(img);
      setIsFilePicked(false);
    }
  };

  const handleDeliveryImage = async () => {
    if (isFilePicked) {
      var image = await S3FileUpload.uploadFile(selectedFile, config);
      var query = modalData.id;
      setModalData({ ...modalData, delivery: image.location });
      var tempData = { ...modalData, delivery: image.location };
      var img = await axios.put(
        `http://localhost:8000/api/invoice/${query}`,
        tempData
      );
      console.log(img);
      setIsFilePicked(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "500vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                }}
              >
                <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.field}>
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id}>
                                    {column.headerName === "action" ? (
                                      <Button
                                        value={value}
                                        onClick={() => {
                                          console.log(row);
                                          setModalData(row);
                                          setOpen(true);
                                        }}
                                      >
                                        {value}{" "}
                                      </Button>
                                    ) : (
                                      value
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {modalData.id}
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {modalData &&
                    modalData.rows.map((row) => {
                      return (
                        <>
                          <ListItem>
                            <ListItemText
                              primary={row.material}
                              secondary="quantity:"
                            />
                            <Typography variant="body2">
                              {row.amount}{" "}
                            </Typography>
                            <ListItemText primary="price:" />
                            <Typography variant="body2">
                              {" "}
                              ${row.price}
                            </Typography>
                            <ListItemText primary="total of material:" />
                            <Typography variant="body2">
                              {" "}
                              ${row.price * row.amount}
                            </Typography>
                          </ListItem>

                          <Divider component="li" />
                          <li>
                            <Typography
                              sx={{ mt: 0.5, ml: 2 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Divider
                            </Typography>
                          </li>
                        </>
                      );
                    })}

                  <ListItem>
                    <ListItemText primary="Total" />
                    <Typography variant="body2"> ${modalData.total}</Typography>
                  </ListItem>
                  <Divider component="li" />
                  <li>
                    <Typography
                      sx={{ mt: 0.5, ml: 2 }}
                      color="text.secondary"
                      display="block"
                      variant="caption"
                    >
                      Divider
                    </Typography>
                  </li>
                  <ListItem>
                    {modalData.transport ? (
                      <img
                        onChange={changeHandler}
                        // src="https://www.unicef.org/chile/sites/unicef.org.chile/files/styles/hero_desktop/public/Bodoque.PNG?itok=U1knZHph"
                        src={modalData.transport}
                        loading="lazy"
                        width={200}
                      />
                    ) : (
                      <>
                        <input type="file" onChange={changeHandler}></input>
                        <Button onClick={handleImage}>
                          Add Transport Image
                        </Button>
                      </>
                    )}
                    {modalData.transport != null &&
                    modalData.delivery == null ? (
                      <>
                        <input type="file" onChange={changeHandler}></input>
                        <Button onClick={handleDeliveryImage}>
                          Add Delivery Image
                        </Button>
                      </>
                    ) : (
                      <img
                        onChange={changeHandler}
                        // src="https://www.unicef.org/chile/sites/unicef.org.chile/files/styles/hero_desktop/public/Bodoque.PNG?itok=U1knZHph"
                        src={
                          modalData.transport
                            ? modalData.transport
                            : "https://www.unicef.org/chile/sites/unicef.org.chile/files/styles/hero_desktop/public/Bodoque.PNG?itok=U1knZHph"
                        }
                        loading="lazy"
                        width={200}
                      />
                    )}
                  </ListItem>
                  <ListItem>
                    <Button>Save Changes</Button>
                  </ListItem>
                </List>
              </Box>
            </Modal>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default CustomerDashboard;
