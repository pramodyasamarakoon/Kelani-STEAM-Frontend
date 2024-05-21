import {
  Grid,
  Button,
  FormLabel,
  IconButton,
  Stack,
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../Assets/Components/NavBar";
import Footer from "../../../Assets/Components/Footer/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../../../Assets/Components/ScrollToTopButton";
import { DataGrid } from "@mui/x-data-grid";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Loader from "../../../Assets/Components/Loader";
import {
  cloudinaryName,
  cloudinaryPreset,
  mainEndpoint,
} from "../../../Assets/Components/const";
import back20 from "../../../Assets/Images/Back20Small.jpg";

const AdminHome = () => {
  useEffect(() => {
    loadBookingData();
  }, []);

  // State to hold form data
  const [formData, setFormData] = useState({
    bookingData: [],
    Columns: [
      { field: "Name", headerName: "Society", flex: 3 },
      { field: "University", headerName: "University", flex: 2 },
      { field: "Event", headerName: "Event", flex: 4 },
      {
        field: "Actions",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => (
          <div>
            <Tooltip title="View">
              <IconButton onClick={() => handleView(params.row.Id)}>
                <FullscreenIcon />
              </IconButton>
            </Tooltip>

            {/* <IconButton onClick={() => handleView(params.row.Id)}>
              <FullscreenIcon />
            </IconButton> */}
          </div>
        ),
      },
    ],
  });
  const [tableLoader, setTableLoader] = useState(false);
  const [dialogLoader, setDialogLoader] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [handleDialog, setHandleDialog] = useState(false);

  const handleView = (id) => {
    setDialogLoader(true);
    setHandleDialog(true);
    console.log(`Clicked Id: ${id}`);

    // Find the object in the bookingData array
    // const booking = formData.bookingData.find(item => item.Id === id);

    // Log the found object
    // console.log('Found booking:', booking);

    // if (booking) {
    //     setSelectedBooking(booking);
    // } else {
    //     console.error('Booking not found');
    // }

    axios
      .get(`${mainEndpoint}booking/getBookingById/${id}`)
      .then((response) => {
        const booking = response.data;

        // Update the state with the fetched data
        setSelectedBooking(booking);

        console.log("Selected data loaded:", booking);
        setDialogLoader(false);
      })
      .catch((error) => {
        console.error("Error loading album data:", error);
        // setDialogLoader(false);
      });
  };

  // Load Album Data for the Table
  const loadBookingData = () => {
    setTableLoader(true);
    axios
      .get(`${mainEndpoint}booking/getAll`)
      .then((response) => {
        // Assuming response.data is an array of albums
        const bookings = response.data;

        // const bookingsData = bookings.map((booking) => ({
        //   id: album.id,
        //   albumName: album.albumName,
        //   photographedBy: album.photographedBy,
        //   editedBy: album.editedBy,
        // }));

        setFormData({
          ...formData,
          bookingData: bookings,
        });

        console.log("Booking data loaded:", bookings);
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
              Booking Details
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
                style={{ minHeight: "300px", height: "auto", width: "100%" }}
              >
                {tableLoader ? (
                  <Loader />
                ) : (
                  <DataGrid
                    getRowId={(row) => row.Id}
                    rows={formData.bookingData}
                    columns={formData.Columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {selectedBooking ? (
        <Dialog
          open={handleDialog}
          onClose={() => setHandleDialog(false)}
          PaperProps={{
            style: {
              // backgroundColor: "rgba(0, 0, 0)",
              background: `url(${back20})`, // Replace 'path/to/your/image.jpg' with the actual path to your background image
              backgroundSize: "cover", // Adjust the background size as needed
              // opacity: 0.8, // Set the opacity of the background image
              width: "900px",
            },
          }}
        >
          <DialogTitle
            style={{ textAlign: "center", margin: 15, marginBottom: 5 }}
          >
            Booking By {selectedBooking.Name}
          </DialogTitle>
          <DialogContent>
            <Grid container sx={{ padding: 2 }}>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">
                  University :
                </p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.University}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">Event :</p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.Event}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">Email :</p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.Email}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">Mobile :</p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.Mobile}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">
                  Description :
                </p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.Description}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">
                  Expectation :
                </p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.Expectation}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">
                  What We Get :
                </p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.WhatWeGet}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">
                  BookingDate :
                </p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.BookingDate}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className="font-OpenSans-Regular text-[12px]">Other :</p>
              </Grid>
              <Grid item xs={8}>
                <p className="font-OpenSans-Regular text-[12px]">
                  {selectedBooking.Other}
                </p>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      ) : null}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AdminHome;
