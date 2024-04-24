import { Grid, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../Assets/Components/NavBar";
import Footer from "../../../Assets/Components/Footer/Footer";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../../../Assets/Components/ScrollToTopButton";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../../Assets/Components/Loader";

const AdminTShirt = () => {
  useEffect(() => {
    loadOrderData();
  }, []);

  // State to hold form data
  const [formData, setFormData] = useState({
    orderColumns: [
      { field: "name", headerName: "Name", width: 200 },
      { field: "size", headerName: "Size", width: 70 },
      { field: "paymentAmount", headerName: "Amount", width: 80 },
      { field: "department", headerName: "Department", width: 100 },
      { field: "studentNumber", headerName: "Student Number", width: 130 },
      { field: "contactNumber", headerName: "Contact No.", width: 130 },
      { field: "email", headerName: "E Mail", width: 200 },
      { field: "paymentMethod", headerName: "Payment Method", width: 200 },
      {
        field: "imageUrl",
        headerName: "Payment Proof",
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleViewButtonClick(params.row.imageUrl)}
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
      .get("http://localhost:8080/tshirt-orders/getAll")
      .then((response) => {
        const data = response.data;

        const ordersRowsData = data.map((data) => ({
          id: data.id,
          name: data.name,
          size: data.size,
          paymentAmount: data.paymentAmount,
          department: data.department,
          studentNumber: data.studentNumber,
          contactNumber: data.contactNumber,
          email: data.email,
          paymentMethod: data.paymentMethod,
          imageUrl: data.imageUrl,
        }));

        setFormData({
          ...formData,
          ordersData: ordersRowsData,
        });

        console.log("Orders data loaded:", ordersRowsData);
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
