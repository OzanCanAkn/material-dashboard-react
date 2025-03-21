/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// LoginPage.js
import React from "react";
import { Formik, Field, Form } from "formik";
import api from "examples/api";
import { TextField } from "@mui/material";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const navigate = useNavigate();
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                console.log(values);
                try {
                  const response = await api.post("/users/login/", { user: values });
                  // Handle successful response here.
                  console.log(response.data);
                  localStorage.setItem("user", JSON.stringify(response.data.user));
                  localStorage.setItem("token", response.data.user.token);
                  localStorage.setItem("userId", JSON.stringify(response.data.user.id));
                  navigate("/dashboard");
                } catch (error) {
                  // Handle error here.
                  console.log(error);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    style={{ marginBottom: "8px", width: "100%" }}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    style={{ marginBottom: "8px", width: "100%" }}
                  />
                  <hr />
                  <MDButton variant="contained" type="submit">
                    Log In
                  </MDButton>
                </Form>
              )}
            </Formik>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
