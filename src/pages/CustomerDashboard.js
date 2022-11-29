import React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// import { mainListItems, secondaryListItems } from './listItems';



function CustomerDashboard() {

  const columns = [
    { id: 'id', headerName: 'Invoice ID', width: 70 },
    { id: 'customerid', headerName: 'Customer ID', width: 130 },
    { id: 'date', headerName: 'Date', width: 130 },
    {
      id: 'status',
      headerName: 'Status',
    },
    {
      id: 'action',
      headerName: 'action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
    { id: 1, customerid: 'Snow', date: 'Jon', status: 'active', action: 'action' },
    { id: 2, customerid: 'Lannister', date: 'Cersei', status: 'active', action: 'action' },
    { id: 3, customerid: 'Lannister', date: 'Jaime', status: 'active', action: 'action' },
    { id: 4, customerid: 'Stark', date: 'Arya', status: 'active', action: 'action' },
    { id: 5, customerid: 'Targaryen', date: 'Daenerys', status: 'active', action: 'action' },
    { id: 6, customerid: 'Melisandre', date: null, status: 'active', action: 'action' },
    { id: 7, customerid: 'Clifford', date: 'Ferrara', status: 'active', action: 'action' },
    { id: 8, customerid: 'Frances', date: 'Rossini', status: 'active', action: 'action' },
    { id: 9, customerid: 'Roxie', date: 'Harvey', status: 'active', action: 'action' },
  ];
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '500vh',
          overflow: 'auto',
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
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                }}
              ><TableContainer component={Paper}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.field}
                          >
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} >
                                    {value}
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

                {/* <Chart /> */}
                {/* <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                /> */}


              </Paper>
            </Grid>
            {/* Recent Deposits */}

          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default CustomerDashboard;
