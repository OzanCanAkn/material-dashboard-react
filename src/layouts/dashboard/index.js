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

// @mui material components
import Grid from "@mui/material/Grid";
import { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Card, Button } from "@mui/material";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import StationsMap from "examples/stationsMap";

function Dashboard() {
  const [isSelectorVisible, SetIsSelectorVisible] = useState(false);
  const [newStationPos, setNewStationPos] = useState([39.976512, 32.811111]);
  console.log(newStationPos);
  const toggleSelector = () => {
    if (isSelectorVisible) {
      SetIsSelectorVisible(false);
    } else {
      SetIsSelectorVisible(true);
    }
  };
  console.log(newStationPos, "db");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="electric_car"
                title="Total Charged Cars"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="bolt"
                title="Total Charged Watt"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Total Charge Stations"
                count="7"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="attach_money"
                title="Total Revenue"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid mb={3}>
          <Card pb={3}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3} mb={3}>
              <MDBox>
                <MDTypography variant="h6" gutterBottom>
                  Stations
                </MDTypography>
                <MDBox display="flex" alignItems="center" lineHeight={0}>
                  <StationsMap
                    isSelectorVisible={isSelectorVisible}
                    setNewStationPos={setNewStationPos}
                    newStationPos={newStationPos}
                  />
                  <Button onClick={toggleSelector}>
                    {!isSelectorVisible ? "Add New Station" : "Confirm"}
                  </Button>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
