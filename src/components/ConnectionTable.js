import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Paper, TablePagination } from '@mui/material';
import { format } from 'date-fns';

const ConnectionTable = ({ data, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = data.filter((row) => 
    row.applicantId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <TextField
        variant="outlined"
        placeholder="Search by Applicant ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Applicant ID</TableCell>
            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Load Applied (KV)</TableCell>
            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date of Application</TableCell>
            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.applicantId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.loadApplied}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.dateOfApplication ? format(new Date(row.dateOfApplication), 'dd-MM-yyyy') : 'N/A'}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(row)} style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                {row.status === "Rejected" && (
                  <Button variant="contained" color="secondary" onClick={() => onDelete(row.id)}>
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ConnectionTable;
