/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import ModifyStationModal from "./ModifyStationModal";

function StationTable({ stations, refetch }) {
  const [selectedStation, setSelectedStation] = useState(null);

  const handleModify = (station) => {
    setSelectedStation(station);
  };

  const handleDelete = (stationId) => {
    axios({
      method: "DELETE",
      url: `https://wiremap.vercel.app/api/stations/${stationId}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        accept: "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        console.log(response.data);
        refetch();
        // Do something after the delete operation is successful.
      })
      .catch((error) => {
        console.log(error);
        // Handle the error.
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table style={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }}>ID</TableCell>
              <TableCell style={{ paddingLeft: "15vw" }} align="right">
                Latitude
              </TableCell>
              <TableCell style={{ paddingLeft: "7vw" }} align="right">
                Longitude
              </TableCell>
              <TableCell style={{ paddingLeft: "8vw" }} align="right">
                Charge Speed
              </TableCell>
              <TableCell style={{ paddingLeft: "7vw" }} align="right">
                Price
              </TableCell>
              <TableCell style={{ paddingLeft: "8vw" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((station) => (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} key={station.id}>
                <TableCell component="th" scope="row">
                  Station {station.id}
                </TableCell>
                <TableCell align="right">{station.latitude}</TableCell>
                <TableCell align="right">{station.longitude}</TableCell>
                <TableCell align="right">{station.charge_speed}</TableCell>
                <TableCell align="right">{station.price}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="success" onClick={() => handleModify(station)}>
                    Modify
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(station.id)}
                    style={{ marginTop: "3vh" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedStation && (
        <ModifyStationModal
          refetch={refetch}
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </>
  );
}

export default StationTable;
