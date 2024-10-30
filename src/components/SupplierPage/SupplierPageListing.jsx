import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';

const SupplierPageListing = ({ suppliers }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Suppliers
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="suppliers table">
          <TableHead>
            <TableRow>
              <TableCell>Supplier No</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>TAX No</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers?.data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((supplier) => (
                <TableRow key={supplier._id} hover>
                  <TableCell>{supplier.supplierNo}</TableCell>
                  <TableCell>{supplier.supplierName}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.taxNo}</TableCell>
                  <TableCell>{supplier.country}</TableCell>
                  <TableCell>{supplier.mobileNo}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={suppliers?.data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default SupplierPageListing;
