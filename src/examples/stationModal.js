/* eslint-disable react/prop-types */
import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  latitude: yup.number().required("Latitude is required"),
  longitude: yup.number().required("Longitude is required"),
  charge_speed: yup.number().required("Charge Speed is required"),
  price: yup.number().required("Price is required"),
});

function AddChargingStationModal({ open, handleClose, newStationPos, getStations }) {
  const handleSave = (values) => {
    // Implement your save logic here
    console.log(values);
    axios
      .post(
        "https://wiremap.vercel.app/api/stations/",
        {
          is_blocked: false,
          is_being_used: false,
          ...values,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            accept: "application/json;charset=UTF-8",
          },
        }
      )
      .then(() => {
        getStations();
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };
  console.log(newStationPos);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Charging Station</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            latitude: newStationPos[0].toFixed(6),
            longitude: newStationPos[1].toFixed(6),
            charge_speed: "",
            price: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSave(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <br />
              <Field
                style={{ width: "100%", marginTop: "8px" }}
                disabled
                name="latitude"
                as={TextField}
                error={touched.latitude && Boolean(errors.latitude)}
                helperText={touched.latitude && errors.latitude}
                label="Latitude"
              />
              <br />
              <Field
                style={{ width: "100%", marginTop: "8px" }}
                disabled
                name="longitude"
                as={TextField}
                error={touched.longitude && Boolean(errors.longitude)}
                helperText={touched.longitude && errors.longitude}
                label="Longitude"
              />
              <br />
              <Field
                style={{ width: "100%", marginTop: "8px" }}
                name="charge_speed"
                as={TextField}
                error={touched.charge_speed && Boolean(errors.charge_speed)}
                helperText={touched.charge_speed && errors.charge_speed}
                label="Charge Speed"
              />
              <br />
              <Field
                style={{ width: "100%", marginTop: "8px" }}
                name="price"
                as={TextField}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                label="Price"
              />
              <br />
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddChargingStationModal;
