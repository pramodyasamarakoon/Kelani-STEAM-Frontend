import {
  Grid,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../Assets/Components/NavBar";
import Footer from "../../../Assets/Components/Footer/Footer";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../../../Assets/Components/ScrollToTopButton";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../../Assets/Components/Loader";
import { mainEndpoint } from "../../../Assets/Components/const";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const AdminTShirt = () => {
  useEffect(() => {
    // Check for the AuthToken in local storage
    const authToken = localStorage.getItem("AuthToken");

    if (authToken) {
      // AuthToken is available, load the album data
      loadOrderData();
    } else {
      // AuthToken is not available, navigate to the home page
      window.location.href = "/";
    }
  }, []);

  const handleStatus = async (event, id) => {
    const newStatus = event.target.checked;
    if (newStatus !== null) {
      setTableLoader(true);
      // Update the local state
      setFormData((prevFormData) => {
        const updatedOrders = prevFormData.ordersData.map((order) => {
          if (order.Id === id) {
            return { ...order, Status: newStatus };
          }
          return order;
        });
        return { ...prevFormData, ordersData: updatedOrders };
      });

      // Send update request to the backend
      try {
        await axios.put(
          `${mainEndpoint}tshirtOrder/updateTshirtOrderById/${id}`,
          {
            Status: newStatus,
          }
        );
      } catch (error) {
        console.error("Failed to update status:", error);
      }
      setTableLoader(false);
    }
  };

  // State to hold form data
  const [formData, setFormData] = useState({
    orderColumns: [
      // {
      //   field: "Status",
      //   headerName: "Status",
      //   width: 150,
      //   renderCell: (params) => {
      //     // console.log("Rendering cell:", params.row);
      //     return (
      //       <ToggleButtonGroup
      //         value={params.row.Status}
      //         exclusive
      //         onChange={(event, newStatus) =>
      //           handleStatus(event, newStatus, params.row.Id)
      //         }
      //         aria-label="Status"
      //       >
      //         <Tooltip title="Not Yet Started">
      //           <ToggleButton value="NotYetStarted" aria-label="NotYetStarted">
      //             <AccessAlarmIcon />
      //           </ToggleButton>
      //         </Tooltip>
      //         <Tooltip title="In Process">
      //           <ToggleButton value="InProcess" aria-label="InProcess">
      //             <AirportShuttleIcon />
      //           </ToggleButton>
      //         </Tooltip>
      //         <Tooltip title="Delivered">
      //           <ToggleButton value="Delivered" aria-label="Delivered">
      //             <BeenhereIcon />
      //           </ToggleButton>
      //         </Tooltip>
      //       </ToggleButtonGroup>
      //     );
      //   },
      // },
      {
        field: "Status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          const isChecked = params.row.Status;
          return (
            <Checkbox
              checked={isChecked}
              onChange={(event) => handleStatus(event, params.row.Id)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
      { field: "Name", headerName: "Name", flex: 3 },
      { field: "Size", headerName: "Size", flex: 1 },
      { field: "PaymentAmount", headerName: "Amount", flex: 1 },
      { field: "Department", headerName: "Department", flex: 2 },
      { field: "StudentNumber", headerName: "Student Number", flex: 2 },
      { field: "ContactNumber", headerName: "Contact No.", flex: 2 },
      { field: "Email", headerName: "E Mail", flex: 3 },
      { field: "PaymentMethod", headerName: "Payment Method", flex: 2 },
      {
        field: "ImageUrl",
        headerName: "Payment Proof",
        flex: 2,
        renderCell: (params) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleViewButtonClick(params.row.ImageUrl)}
          >
            View
          </Button>
        ),
      },
    ],
    ordersData: [],
  });
  const [tableLoader, setTableLoader] = useState(false);

  // View the Payment Proof
  const handleViewButtonClick = (imageUrl) => {
    // Open a new tab or window with the specified URL
    window.open(imageUrl, "_blank");
  };

  // Load Data for the Table
  const loadOrderData = () => {
    setTableLoader(true);
    axios
      .get(`${mainEndpoint}tshirtOrder/getAll`)
      .then((response) => {
        const data = response.data;

        setFormData({
          ...formData,
          // ordersData: ordersRowsData,
          ordersData: data,
        });

        console.log("Orders data loaded:", data);
        setTableLoader(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <NavBar visibilityOfOrderButton={false} isAdmin={true} />
      <ScrollToTopButton />

      {/* Admin Home Container */}
      <div
        className="w-[86%] mx-auto hidden md:block"
        style={{
          background: "#D9D9D950",
          borderRadius: "20px",
          // display: { xs: "hidden", md: "block" },
        }}
      >
        <Grid container spacing={0} sx={{ marginTop: 12 }}>
          {/* Form Title */}
          <Grid item xs={12} sx={{ marginY: "10px" }}>
            <p className="font-OpenSans-SemiBold text-[25px]">
              T Shirt Order Details
            </p>
          </Grid>
          <Grid item xs={12} sx={{}}>
            {/* White background box */}
            <div
              className="w-full h-auto mx-auto"
              style={{
                background: "#FFFFFF90",
                padding: "30px",
                position: "relative",
              }}
            >
              {/*Table */}
              <div
                style={{ minHeight: "500px", height: "auto", width: "100%" }}
              >
                {tableLoader ? (
                  <Loader size="2rem" />
                ) : (
                  <DataGrid
                    getRowId={(row) => row.Id}
                    rows={formData.ordersData}
                    columns={formData.orderColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AdminTShirt;
