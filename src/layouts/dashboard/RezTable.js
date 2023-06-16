/* eslint-disable react/prop-types */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function DataTable({ rezs }) {
  return (
    <TableContainer style={{ marginTop: "32px" }} component={Paper}>
      <Table style={{ tableLayout: "fixed" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "10%" }}>ID</TableCell>
            <TableCell style={{ paddingLeft: "13vw" }} align="right">
              Host
            </TableCell>
            <TableCell style={{ paddingLeft: "5vw" }} align="right">
              Station
            </TableCell>
            <TableCell style={{ paddingLeft: "5vw" }} align="right">
              Client
            </TableCell>
            <TableCell style={{ paddingLeft: "5vw" }} align="right">
              Duration
            </TableCell>
            <TableCell style={{ paddingLeft: "5vw" }} align="right">
              Date
            </TableCell>
            <TableCell style={{ paddingLeft: "5vw" }} align="right">
              Price
            </TableCell>
            <TableCell style={{ paddingLeft: "5vw" }} align="right">
              Is Approved
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rezs?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.host}</TableCell>
              <TableCell align="right">{row.station}</TableCell>
              <TableCell align="right">{row.client}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.is_approved ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
