import React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({rowsPerPage,count, page,handleChangePage, handleChangeRowsPerPage}) {
    const items = [4,8,12];
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={items}
    />
  );
}
