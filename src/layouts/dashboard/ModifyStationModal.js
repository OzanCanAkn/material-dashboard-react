/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

function ModifyStationModal({ station, onClose, refetch }) {
  const [chargeSpeed, setChargeSpeed] = useState(station.charge_speed);
  const [price, setPrice] = useState(station.price);
  const [isBlocked, setIsBlocked] = useState(station.is_blocked);

  const handleSubmit = () => {
    axios({
      method: "patch",
      url: `https://wiremap.vercel.app/api/stations/${station.id}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        accept: "application/json;charset=UTF-8",
      },
      data: {
        charge_speed: chargeSpeed,
        price,
        is_blocked: isBlocked,
      },
    })
      .then((response) => {
        console.log(response.data);
        refetch();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Modify Station</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="chargeSpeed"
          label="Charge Speed"
          type="number"
          value={chargeSpeed}
          onChange={(event) => setChargeSpeed(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isBlocked}
              onChange={(event) => setIsBlocked(event.target.checked)}
            />
          }
          label="Blocked"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifyStationModal;
