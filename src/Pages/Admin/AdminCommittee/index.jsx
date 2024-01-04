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
  TextField,
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
import {
  cloudinaryName,
  cloudinaryPreset,
} from "../../../Assets/Components/const";
// import LoadingButton from "@mui/lab/LoadingButton";

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
        activeSlide: "01",
      },
    ],
    activeTab: "steam",
    committeeData: {},
    tempImage: null,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogFormData, setDialogFormData] = useState({
    id: "",
    club: formData.activeTab,
    name: "",
    position: "",
    imageUrl: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [albumLoader, setAlbumLoader] = useState(false);
  const [albumTableLoader, setAlbumTableLoader] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    openDialog: false,
    deleteRowId: "",
  });
  const [dialogUploadImageLoader, setDialogUploadImageLoader] = useState(false);
  const [saveDialogLoader, setSaveDialogLoader] = useState(false);
  const [slideContainerLoader, setSlideContainerLoader] = useState(false);
  const [activeSlideLength, setActiveSlideLength] = useState(0);

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
      data.append("upload_preset", cloudinaryPreset);
      return axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
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

  // const handleDialogClose = () => {
  //   // Close the dialog without deleting
  //   setDeleteConfirmation({
  //     openDialog: false,
  //     deleteRowId: "",
  //   });
  // };

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
    console.log(newAlignment);
    if (newAlignment === "center") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        activeTab: "vide",
      }));
    } else if (newAlignment === "left") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        activeTab: "steam",
      }));
    }
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
  const handleSlideToggle = (toggleSlide) => {
    console.log("Clicked Slide", toggleSlide);
    // Update formData with the new toggle value
    setFormData((prevFormData) => {
      const newSlideToggle = [...prevFormData.slideToggle];
      // newSlideToggle[0].slide1 = !newSlideToggle[0].slide1;
      if (newSlideToggle[0].activeSlide === toggleSlide) {
        newSlideToggle[0].activeSlide = "";
      } else {
        newSlideToggle[0].activeSlide = toggleSlide;
      }
      return {
        ...prevFormData,
        slideToggle: newSlideToggle,
      };
    });
  };

  const handleGridClick = (memberId) => {
    // Check if formData.slideToggle[0] exists before accessing activeSlide
    // const activeSlide = formData.slideToggle[0]?.activeSlide;
    console.log("Clicked Id", memberId);
    // console.log("Active Slide:", activeSlide);
    const activeSlideKey = `committeeSlide${formData.slideToggle[0].activeSlide}`;
    const activeSlideData = formData.committeeData[activeSlideKey];
    // console.log("activeSlideData", activeSlideData);

    // Finding is there any same ID
    const memberData = activeSlideData?.find(
      (member) => member.id === memberId
    );
    console.log("memberData", memberData);

    if (memberData) {
      // Clicked on an existing member grid
      const [slideNumber, position] = memberId.split("-");
      setDialogFormData({
        id: memberId,
        name: memberData.name,
        position: memberData.position,
        imageUrl: memberData.imageUrl,
      });
    } else {
      // Clicked on "Before Upload a Member" grid to add a new member
      setDialogFormData({
        id: memberId,
        name: "",
        position: "",
        imageUrl: "",
      });
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle Dialog Box Image Upload
  const handleImageUpload = (e) => {
    // Set dialogUploadImageLoader to true before the upload
    setDialogUploadImageLoader(true);

    // Set the tempImage in the state
    setFormData({
      ...formData,
      tempImage: e.target.files[0],
    });

    console.log("Set to the Temp Image");

    // Delay setting dialogUploadImageLoader to false by 1 second
    setTimeout(() => {
      setDialogUploadImageLoader(false);
    }, 1000);
  };

  // Handle Member Save from the Dialog Box
  const handleDialogSave = async () => {
    // Check if name and position are empty
    if (!dialogFormData.name || !dialogFormData.position) {
      toast.error("Name and Position are required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Check if the image is empty
    if (!formData.tempImage) {
      if (dialogFormData.imageUrl === "") {
        console.log("Empty Image");
        toast.error("Image is required", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    // Check Cover file size
    console.log("Going to Check the Size");
    const fileSizeMB = formData.tempImage.size / (1024 * 1024); // Convert to megabytes
    console.log("File Size", fileSizeMB);
    if (fileSizeMB > 1) {
      toast.error("Image size exceeds the maximum allowed size of 1MB", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Clear the input field
      return;
    }
    console.log("File Size is Okay");

    setSaveDialogLoader(true);
    // Upload Image to Cloudinary
    const data = new FormData();
    data.append("file", formData.tempImage);
    data.append("upload_preset", cloudinaryPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
        data
      );
      const uploadedImageUrl = response.data.url;
      console.log("Uploaded Image URL:", uploadedImageUrl);

      // Send all data to the database
      try {
        const response = await axios.post(
          "http://localhost:8080/committee/addCommittee",
          {
            id: dialogFormData.id,
            club: dialogFormData.club,
            name: dialogFormData.name,
            position: dialogFormData.position,
            imageUrl: uploadedImageUrl,
          }
        );

        console.log("Member Added successfully:");
        toast.success(`Committee Member Added successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setSaveDialogLoader(false);
        loadSlideData(formData.slideToggle[0].activeSlide);
      } catch (error) {
        setSaveDialogLoader(false);
        console.error(
          "Error Adding Member:",
          error.response ? error.response.data : error.message
        );
        toast.error(`Error in  Adding Member!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      // Close the dialog box after saving
      setDialogOpen(false);
    } catch (error) {
      setSaveDialogLoader(false);
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Handle Member Save from the Dialog Box
  const handleDialogUpdate = async () => {
    // Check if name and position are empty
    if (!dialogFormData.name || !dialogFormData.position) {
      toast.error("Name and Position are required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Check if the image is empty
    if (!formData.tempImage) {
      if (dialogFormData.imageUrl === "") {
        console.log("Empty Image");
        toast.error("Image is required", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    // Check Cover file size
    if (formData.tempImage) {
      console.log("Going to Check the Size");
      const fileSizeMB = formData.tempImage.size / (1024 * 1024); // Convert to megabytes
      console.log("File Size", fileSizeMB);
      if (fileSizeMB > 1) {
        toast.error("Image size exceeds the maximum allowed size of 1MB", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Clear the input field
        return;
      }
      console.log("File Size is Okay");
    }

    setSaveDialogLoader(true);

    if (formData.tempImage) {
      // Upload Image to Cloudinary
      const data = new FormData();
      data.append("file", formData.tempImage);
      data.append("upload_preset", cloudinaryPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
          data
        );
        const uploadedImageUrl = response.data.url;
        console.log("Uploaded Image URL:", uploadedImageUrl);

        // Send all data to the database
        try {
          const response = await axios.put(
            `http://localhost:8080/committee/updateCommittee/${dialogFormData.id}`,
            {
              club: dialogFormData.club,
              name: dialogFormData.name,
              position: dialogFormData.position,
              imageUrl: uploadedImageUrl,
            }
          );

          console.log("Member Added successfully:");
          toast.success(`Committee Member Added successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setSaveDialogLoader(false);
          loadSlideData(formData.slideToggle[0].activeSlide);
        } catch (error) {
          setSaveDialogLoader(false);
          console.error(
            "Error Adding Member:",
            error.response ? error.response.data : error.message
          );
          toast.error(`Error in  Adding Member!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        // Close the dialog box after saving
        setDialogOpen(false);
      } catch (error) {
        setSaveDialogLoader(false);
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      // Send all data to the database
      try {
        const response = await axios.put(
          `http://localhost:8080/committee/updateCommittee/${dialogFormData.id}`,
          {
            club: dialogFormData.club,
            name: dialogFormData.name,
            position: dialogFormData.position,
            imageUrl: dialogFormData.imageUrl,
          }
        );

        console.log("Member Updated successfully:");
        toast.success(`Committee Member Updated successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setSaveDialogLoader(false);
        loadSlideData(formData.slideToggle[0].activeSlide);
      } catch (error) {
        setSaveDialogLoader(false);
        console.error(
          "Error Updating Member:",
          error.response ? error.response.data : error.message
        );
        toast.error(`Error in  Updating Member!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      // Close the dialog box after saving
      setDialogOpen(false);
    }
  };

  // delete member by Id
  const deleteById = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/committee/deleteById",
        {
          params: {
            id: dialogFormData.id,
          },
        }
      );

      console.log("Member Deleted successfully:");
      toast.success(`Committee Member Deleted successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      loadSlideData(formData.slideToggle[0].activeSlide);
    } catch (error) {
      console.error(
        "Error Deleting Member:",
        error.response ? error.response.data : error.message
      );
      toast.error(`Error in  Deleting Member!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Use Effect
  useEffect(() => {
    // Call loadSlideData when the component mounts and whenever formData.activeSlide changes
    loadSlideData(formData.slideToggle[0].activeSlide);

    // Return a cleanup function if needed
    return () => {
      // Cleanup logic if needed
    };
  }, [formData.slideToggle[0].activeSlide, formData.activeTab]);

  // Load Slide Data
  const loadSlideData = (activeSlide) => {
    setSlideContainerLoader(true);
    axios
      .get("http://localhost:8080/committee/getByPartialId", {
        params: {
          partialId: `${formData.activeTab}-${activeSlide}`,
        },
      })
      .then((response) => {
        const activeSlide = formData.slideToggle[0].activeSlide;
        const committeeDataKey = `committeeSlide${activeSlide}`;
        const responseDataLength = response.data.length;
        console.log("Length of Slide", responseDataLength);

        setFormData((prevFormData) => ({
          ...prevFormData,
          committeeData: {
            ...prevFormData.committeeData,
            [committeeDataKey]: response.data,
          },
        }));
        setActiveSlideLength(responseDataLength);
      })
      .catch((error) => {
        console.error(error);
      });
    setSlideContainerLoader(false);
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

        {/* Content */}
        <div
          className="absolute w-[90%] mx-[5%] mt-[55px]"
          style={{
            background: "#D9D9D950",
            borderRadius: "20px",
          }}
        >
          {/* Section 01 */}
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
                {formData.activeTab === "steam"
                  ? "Kelani STEAM Committee Positions"
                  : formData.activeTab === "vide"
                  ? "ViDe Committee Positions"
                  : null}
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
                  onClick={() => handleSlideToggle("01")}
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Slide 02 */}
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
                  onClick={() => handleSlideToggle("02")}
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
                        Slide 02
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
                        {formData.slideToggle[0].activeSlide === "02" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "02" ? (
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Slide 03 */}
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
                  onClick={() => handleSlideToggle("03")}
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
                        Slide 03
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
                        {formData.slideToggle[0].activeSlide === "03" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "03" ? (
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Slide 04 */}
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
                  onClick={() => handleSlideToggle("04")}
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
                        Slide 04
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
                        {formData.slideToggle[0].activeSlide === "04" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "04" ? (
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Slide 05 */}
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
                  onClick={() => handleSlideToggle("05")}
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
                        Slide 05
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
                        {formData.slideToggle[0].activeSlide === "05" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "05" ? (
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Slide 06 */}
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
                  onClick={() => handleSlideToggle("06")}
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
                        Slide 06
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
                        {formData.slideToggle[0].activeSlide === "06" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "06" ? (
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Slide 07 */}
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
                  onClick={() => handleSlideToggle("07")}
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
                        Slide 07
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
                        {formData.slideToggle[0].activeSlide === "07" ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {formData.slideToggle[0].activeSlide === "07" ? (
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
                    {" "}
                    {!slideContainerLoader ? (
                      <Grid
                        container
                        // spacing={2}
                        className="flex items-center justify-center"
                      >
                        {/* Uploaded Member */}
                        {formData.committeeData[
                          `committeeSlide${formData.slideToggle[0].activeSlide}`
                        ] &&
                          formData.committeeData[
                            `committeeSlide${formData.slideToggle[0].activeSlide}`
                          ].map((member, index) => (
                            <Grid
                              item
                              xs={1.8}
                              key={`member-${formData.activeTab}-${
                                formData.slideToggle[0].activeSlide
                              }-${index + 1}`}
                              style={{
                                height: "220px",
                                borderRadius: "5px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer",
                                marginLeft: 1,
                                marginRight: 1,
                                backgroundImage: `url(${member.imageUrl})`,
                                backgroundSize: "cover",
                                color: "#ffffff",
                              }}
                              onClick={() =>
                                handleGridClick(
                                  `${formData.activeTab}-${
                                    formData.slideToggle[0].activeSlide
                                  }-${index + 1}`
                                )
                              }
                            >
                              {/* Text on the image */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#000000",
                                  padding: "10px",
                                  color: "#ffffff",
                                  textAlign: "center",
                                  borderRadius: "5px",
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
                        {activeSlideLength < 6 ? (
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
                            onClick={() =>
                              handleGridClick(
                                `${formData.activeTab}-${
                                  formData.slideToggle[0].activeSlide
                                }-${
                                  formData.committeeData[
                                    `committeeSlide${formData.slideToggle[0].activeSlide}`
                                  ]
                                    ? formData.committeeData[
                                        `committeeSlide${formData.slideToggle[0].activeSlide}`
                                      ].length + 1
                                    : 1
                                }`
                              )
                            }
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
                              <AddCircleOutlineIcon
                                style={{ fontSize: "40px" }}
                              />
                            </div>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : (
                      <Loader
                        size="2rem"
                        className="flex items-center justify-center my-4"
                      />
                    )}
                  </Grid>
                ) : null}
              </Grid>

              {/* Dialog Box */}
              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                style={{ padding: 40 }}
              >
                <DialogTitle style={{ marginTop: 20, marginBottom: 10 }}>
                  {dialogFormData.name === ""
                    ? "Add New Committee Member"
                    : "Edit Committee Member Details"}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} style={{ marginTop: 10 }}>
                      <TextField
                        label="Name"
                        fullWidth
                        value={dialogFormData.name}
                        onChange={(e) =>
                          setDialogFormData({
                            ...dialogFormData,
                            name: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Position"
                        fullWidth
                        value={dialogFormData.position}
                        onChange={(e) =>
                          setDialogFormData({
                            ...dialogFormData,
                            position: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    {dialogUploadImageLoader ? (
                      <Grid item xs={12}>
                        <Loader size="2rem" className="" />
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <input
                          // accept="image/*"
                          style={{ display: "none" }}
                          id="image-upload-button"
                          type="file"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload-button">
                          <Button
                            variant="contained"
                            component="span"
                            color="secondary"
                            size="small"
                          >
                            Upload Image
                          </Button>
                        </label>
                      </Grid>
                    )}
                  </Grid>

                  {dialogFormData.name === "" ? (
                    <Grid item xs={12} className="flex justify-center">
                      {saveDialogLoader ? (
                        <Loader
                          size="2rem"
                          className="flex items-center justify-center my-[40px]"
                        />
                      ) : (
                        <Button
                          onClick={handleDialogSave}
                          variant="contained"
                          color="primary"
                          style={{ marginTop: 40, marginBottom: 40 }}
                          size="small"
                        >
                          Save
                        </Button>
                      )}
                    </Grid>
                  ) : (
                    <Grid item xs={12} className="flex justify-center">
                      <Button
                        onClick={handleDialogUpdate}
                        variant="contained"
                        color="primary"
                        style={{
                          marginTop: 40,
                          marginBottom: 40,
                          marginRight: 5,
                        }}
                        size="small"
                      >
                        Update
                      </Button>

                      {parseInt(dialogFormData.id.slice(-1)) ===
                      activeSlideLength ? (
                        <Button
                          onClick={deleteById}
                          variant="contained"
                          color="primary"
                          style={{ marginTop: 40, marginBottom: 40 }}
                          size="small"
                        >
                          Delete
                        </Button>
                      ) : null}
                    </Grid>
                  )}
                </DialogContent>
              </Dialog>
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
