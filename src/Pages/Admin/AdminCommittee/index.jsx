import {
  Grid,
  Button,
  FormLabel,
  IconButton,
  Stack,
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fab,
  Paper,
  ToggleButton,
  Chip,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../Assets/Components/NavBar";
import Footer from "../../../Assets/Components/Footer/Footer";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../../../Assets/Components/ScrollToTopButton";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../Assets/Components/Loader";
import { Link } from "react-scroll";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import img from "../../../Assets/Images/Committee/ViDe/President.jpg";

const sidebarWidth = 250;
const videCommitteePoints = [
  {
    name: "Positions",
    to: "section01",
  },
  {
    name: "Names",
    to: "section02",
  },
  {
    name: "Preview",
    to: "section03",
  },
];

const AdminCommittee = () => {
  useEffect(() => {
    // Load album data when the component mounts
    loadAlbumData();
  }, []);

  // State to hold form data
  const [formData, setFormData] = useState({
    albumName: "",
    albumLink: "",
    photographedBy: [""],
    editedBy: [""],
    albumColumns: [
      { field: "albumName", headerName: "Album Name", width: 400 },
      { field: "photographedBy", headerName: "Photographed By", width: 280 },
      { field: "editedBy", headerName: "Edited By", width: 280 },
      {
        field: "delete",
        headerName: "Delete",
        width: 80,
        renderCell: (params) => (
          <IconButton
            onClick={() =>
              setDeleteConfirmation({
                openDialog: true,
                deleteRowId: params.row.id,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    albumRows: [],
    slideToggle: [
      {
        activeSlide: "",
      },
    ],
    committeeData: {
      committeeSlide1: [
        {
          name: "abs",
          position: "gfd",
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "abs",
          position: "gfd",
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "kfhs",
          position: "gfd",
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [albumLoader, setAlbumLoader] = useState(false);
  const [albumTableLoader, setAlbumTableLoader] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    openDialog: false,
    deleteRowId: "",
  });

  // Function to handle input changes and update formData
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("photographedBy-")) {
      // Handle changes for album names
      const index = parseInt(name.split("-")[1], 10);
      setFormData((prevData) => {
        const updatedPhotographedBy = [...prevData.photographedBy];
        updatedPhotographedBy[index] = value;
        return {
          ...prevData,
          photographedBy: updatedPhotographedBy,
        };
      });
    } else if (name.startsWith("editedBy-")) {
      // Handle changes for album names
      const index = parseInt(name.split("-")[1], 10);
      setFormData((prevData) => {
        const updatedEditedBy = [...prevData.editedBy];
        updatedEditedBy[index] = value;
        return {
          ...prevData,
          editedBy: updatedEditedBy,
        };
      });
    }
    // else if (name.startsWith("projects[0].")) {
    //   // Handle changes for projects[0]
    //   const fieldName = name.split("projects[0].")[1];
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     projects: [
    //       {
    //         ...prevData.projects[0],
    //         [fieldName]: value,
    //       },
    //       ...prevData.projects.slice(1), // Keep other projects unchanged
    //     ],
    //   }));
    // }
    else {
      // Handle changes for other fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    console.log(`Handling change for ${name}: ${value}`);
  };

  // Handle Add and Remove Fields
  const handleAddFieldPhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      photographedBy: [...prevData.photographedBy, ""],
    }));
  };

  const handleRemoveFieldPhoto = (index) => {
    setFormData((prevData) => {
      const updatedPhotographedBy = [...prevData.photographedBy];
      updatedPhotographedBy.splice(index, 1);
      return {
        ...prevData,
        photographedBy: updatedPhotographedBy,
      };
    });
  };

  const handleAddFieldEdit = () => {
    setFormData((prevData) => ({
      ...prevData,
      editedBy: [...prevData.editedBy, ""],
    }));
  };

  const handleRemoveFieldEdit = (index) => {
    setFormData((prevData) => {
      const updatedEditedBy = [...prevData.editedBy];
      updatedEditedBy.splice(index, 1);
      return {
        ...prevData,
        editedBy: updatedEditedBy,
      };
    });
  };

  // Handle Album Preview Image Uploads
  const handleFileChangeDemo = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // on Submit function for Albums
  const onSubmitAlbums = async () => {
    // Check if any field is empty
    if (
      formData.albumName.trim() === "" ||
      formData.albumLink.trim() === "" ||
      formData.photographedBy.some((item) => item.trim() === "") ||
      formData.editedBy.some((item) => item.trim() === "") ||
      selectedFiles.length !== 4
    ) {
      // Display toast error message
      toast.error(`Please fill the All fields`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Check each file size
    for (const file of selectedFiles) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert to megabytes

      if (fileSizeMB > 1) {
        toast.error(
          `File ${file.name} exceeds the maximum allowed size of 1MB`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Clear the input field
        return;
      }
    }

    setAlbumLoader(true);
    // Send Images to the cloud
    const uploadPromises = selectedFiles.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ughnxbxn");
      return axios.post(
        "https://api.cloudinary.com/v1_1/dbcrlylnv/image/upload",
        data
      );
    });

    try {
      const responses = await Promise.all(uploadPromises);
      const uploadedImageUrls = responses.map((response) => response.data.url);

      // Send all data to the database
      try {
        console.log("Before send it to the database:", uploadedImageUrls);
        const response = await axios.post(
          "http://localhost:8080/albums/create",
          {
            albumName: formData.albumName,
            albumLink: formData.albumLink,
            photographedBy: formData.photographedBy,
            editedBy: formData.editedBy,
            imageUrls: uploadedImageUrls,
          }
        );

        console.log("Album created successfully:");
        toast.success(`Album created successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error(
          "Error creating album:",
          error.response ? error.response.data : error.message
        );
        toast.error(`Error in Creating Album!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(`Error in Uploading Images!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setAlbumLoader(false);
    loadAlbumData();
    // Clear the variables at the end
    // setFormData({
    //   albumName: "",
    //   albumLink: "",
    //   photographedBy: [""],
    //   editedBy: [""],
    // });
    // setImageUrls([]);
    // setSelectedFiles([]);
  };

  // Load Album Data for the Table
  const loadAlbumData = () => {
    setAlbumTableLoader(true);
    axios
      .get("http://localhost:8080/albums/getAll")
      .then((response) => {
        // Assuming response.data is an array of albums
        const albums = response.data;

        const albumRowsData = albums.map((album) => ({
          id: album.id,
          albumName: album.albumName,
          photographedBy: album.photographedBy,
          editedBy: album.editedBy,
        }));

        setFormData({
          ...formData,
          albumRows: albumRowsData,
        });

        console.log("Album data loaded:", albumRowsData);
        setAlbumTableLoader(false);
      })
      .catch((error) => console.error(error));
  };

  // Handle delete Row from the Album Data Table
  const handleDeleteRow = (rowId) => {
    console.log("Clicked");
    // Find the index of the row with the specified ID
    setAlbumTableLoader(true);

    const params = {
      albumId: rowId,
    };
    axios
      .delete("http://localhost:8080/albums/delete", { params })
      .then((response) => {
        console.log("Album deleted:", rowId);
        setAlbumTableLoader(false);
        loadAlbumData();
        toast.success(`Album Deleted!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDialogClose = () => {
    // Close the dialog without deleting
    setDeleteConfirmation({
      openDialog: false,
      deleteRowId: "",
    });
  };

  const handleDeleteConfirm = () => {
    // Perform the delete action using deleteRowId
    console.log(`Deleting row with ID: ${deleteConfirmation.deleteRowId}`);
    handleDeleteRow(deleteConfirmation.deleteRowId);

    // Close the dialog
    setDeleteConfirmation({
      openDialog: false,
      deleteRowId: "",
    });
  };

  const [activeTitle, setActiveTitle] = useState("section01");

  //   const handleButtonClick = (gridId) => {
  //     setActiveButton(gridId);
  //   };

  const fabButtonStyle = {
    marginRight: "10px",
    backgroundColor: "#1976D2", // Fab button background color
    color: "#ffffff", // Fab button text color
  };

  //   Fab Button Data
  const data = [
    {
      id: "section01",
      name: "ViDe Positions",
    },
    {
      id: "section02",
      name: "ViDe Committee",
    },
    {
      id: "section03",
      name: "ViDe Preview",
    },
  ];

  //   Toggle Button
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&:not(:first-of-type)": {
        borderRadius: "30px",
      },
      "&:first-of-type": {
        borderRadius: "30px",
      },
    },
    "& .MuiToggleButtonGroup-grouped.Mui-selected": {
      backgroundColor: "#3f51b5", // Set the background color for the selected button
      color: "#ffffff", // Set the text color for the selected button
    },
  }));
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //   STEAM Positions
  const steamPositions = [
    {
      id: 1,
      position: "Director",
      name: "Pramodya Samarakoon",
    },
    {
      id: 2,
      position: "Main coordinator",
      name: "Kavishka Kodithuwakku",
    },
    {
      id: 3,
      position: "Assistant Head event management",
      name: "Pramodya Samarakoon",
    },
    {
      id: 4,
      position: "Assistant Secretary",
      name: "Kavishka Kodithuwakku",
    },
    {
      id: 5,
      position: "Director",
      name: "Pramodya Samarakoon",
    },
    {
      id: 6,
      position: "Main coordinator",
      name: "Kavishka Kodithuwakku",
    },
    {
      id: 7,
      position: "Secretary",
      name: "Pramodya Samarakoon",
    },
    {
      id: 8,
      position: "Assistant Secretary",
      name: "Kavishka Kodithuwakku",
    },
  ];

  //   Handle Slide bar Click
  const handleSlideToggle = () => {
    // Update formData with the new toggle value
    setFormData((prevFormData) => {
      const newSlideToggle = [...prevFormData.slideToggle];
      // newSlideToggle[0].slide1 = !newSlideToggle[0].slide1;
      if (newSlideToggle[0].activeSlide == "01") {
        newSlideToggle[0].activeSlide = "";
      } else {
        newSlideToggle[0].activeSlide = "01";
      }
      return {
        ...prevFormData,
        slideToggle: newSlideToggle,
      };
    });
  };

  return (
    <>
      <NavBar visibilityOfOrderButton={false} isAdmin={true} />
      <ScrollToTopButton />
      <div className="mt-[80px] relative w-full hidden md:block">
        {/* Toggle Button */}
        <div className="flex fixed justify-start ml-[10%] mb-2 z-20">
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
              borderRadius: "30px",
            }}
          >
            <StyledToggleButtonGroup
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton
                value="left"
                aria-label="left aligned"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
              >
                <p>Kelani STEAM</p>
              </ToggleButton>
              <ToggleButton
                value="center"
                aria-label="centered"
                style={{ width: "80px" }}
              >
                <p>ViDe</p>
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </div>

        {/* Flex Fab Buttons */}
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            top: "85px",
            left: "30%",
            zIndex: 20,
            // transform: "translateY(-50%)",
          }}
        >
          {data.map((data) => (
            <Link
              key={data.id}
              to={data.id}
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset based on your layout
              duration={500}
              onSetActive={() => setActiveTitle(data.id)}
            >
              <Fab
                variant="extended"
                color={data.id === activeTitle ? "primary" : "default"}
                size="small"
                sx={{
                  my: "4px",
                  width: "auto",
                  paddingX: 2,
                  marginRight: "5px",
                }}
              >
                <p className="text-[12px] ">{data.name}</p>
              </Fab>
            </Link>
          ))}
        </div> */}

        {/* Content */}
        <div
          className="absolute w-[90%] mx-[5%] mt-[55px]"
          style={{
            background: "#D9D9D950",
            borderRadius: "20px",
          }}
        >
          {/* Section 01 */}
          <Grid container spacing={0} id="section01">
            {/* Title Grid */}
            {/* <Grid
              item
              xs={8}
              style={{
                marginTop: 15,
                marginBottom: 5,
                textAlign: "left",
                paddingLeft: 30,
              }}
            >
              <p className="font-OpenSans-SemiBold text-[25px]">
                Kelani STEAM Committee Positions
              </p>
            </Grid> */}
            {/*  Update Button */}
            {/* <Grid
              item
              xs={4}
              style={{
                marginTop: 15,
                marginBottom: 5,
                textAlign: "right",
                paddingRight: 20,
              }}
            >
              <Button
                variant="outlined"
                //   onClick={handleCloseNavMenu}
                size="small"
                sx={{
                  mx: 4,
                  color: "black",
                  display: "end",
                  justifyContent: "end",
                }}
              >
                Update Positions
              </Button>
            </Grid> */}
            {/* Positions View */}
            {/* <Grid
              item
              xs={12}
              style={{
                marginTop: 15,
                marginBottom: 15,
                textAlign: "right",
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Grid container style={{ textAlign: "left" }}>
                <Grid item xs={12}>
                  <Grid container className="flex justify-center items-center">
                    <Grid item xs={5} style={{ padding: 10 }}>
                      <p className="font-OpenSans-regular text-[16px]">
                        Position
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{ padding: 5 }}
                      className="flex justify-center items-center"
                    >
                      <Avatar
                        alt="Natacha"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                    </Grid>

                    <Grid item xs={6} style={{ padding: 10 }}>
                      <p className="font-OpenSans-regular text-[16px]">Name</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
          <Grid
            container
            spacing={0}
            style={{
              textAlign: "left",
            }}
          >
            {/* Title Grid */}
            <Grid
              item
              xs={12}
              style={{
                marginTop: 15,
                marginBottom: 5,
                paddingLeft: 30,
              }}
            >
              <p className="font-OpenSans-SemiBold text-[24px]">
                Kelani STEAM Committee Positions
              </p>
            </Grid>
            {/* Content */}
            <Grid
              item
              xs={12}
              style={{
                marginTop: 15,
                marginLeft: 30,
                marginRight: 30,
              }}
            >
              {/* Slide 01 */}
              <Grid container style={{ marginBottom: 20 }}>
                {/* Slide Number Bar */}
                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: 10,
                    padding: 5,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={handleSlideToggle}
                >
                  <Grid container className="flex items-center">
                    <Grid
                      item
                      xs={11}
                      style={{
                        paddingLeft: 10,
                      }}
                    >
                      <p className="font-OpenSans-Regular text-[16px]">
                        Slide 01
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        textAlign: "right",
                        paddingRight: 10,
                      }}
                    >
                      <IconButton>
                        {formData.slideToggle[0].activeSlide === "01" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "01" ? (
                  <Grid
                    item
                    xs={12}
                    style={{
                      marginBottom: 10,
                      padding: 5,
                      backgroundColor: "#D9D9D9",
                      borderRadius: 5,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      className="flex items-center justify-center"
                      style={{
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    >
                      {/* Uploaded Member */}
                      {formData.committeeData.committeeSlide1 &&
                        formData.committeeData.committeeSlide1.map((member) => (
                          <Grid
                            item
                            xs={1.8}
                            style={{
                              height: "220px",
                              borderRadius: "5px",
                              textAlign: "center",
                              position: "relative",
                              cursor: "pointer",
                              marginLeft: 1,
                              marginRight: 1,
                              backgroundImage: `url(${member.url})`,
                              backgroundSize: "cover",
                              color: "#ffffff",
                            }}
                          >
                            {/* Text on the image */}
                            <div
                              style={{
                                position: "absolute",
                                //   top: "75%",
                                left: 0,
                                right: 0,
                                bottom: 0,
                                //   transform: "translate(-50%, -50%)",
                                backgroundColor: "#000000", // Black color for the box
                                padding: "10px", // Add padding for better visibility
                                color: "#ffffff", // Text color on the black box
                                textAlign: "center", // Center the text
                              }}
                            >
                              <div>
                                <p className="font-OpenSans-Regular text-[14px]">
                                  {member.name}
                                </p>
                              </div>
                              <div>
                                <p className="font-OpenSans-Regular text-[12px]">
                                  {member.position}
                                </p>
                              </div>
                            </div>
                          </Grid>
                        ))}

                      {/* Before Upload a Member */}
                      <Grid
                        item
                        xs={1.8}
                        style={{
                          height: "220px",
                          border: "1px dotted",
                          borderRadius: "5px",
                          textAlign: "center",
                          position: "relative",
                          cursor: "pointer",
                          marginLeft: 1,
                          marginRight: 1,
                        }}
                      >
                        {/* Plus Icon */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <AddCircleOutlineIcon style={{ fontSize: "40px" }} />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </div>

        {/* <Footer /> */}
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminCommittee;
