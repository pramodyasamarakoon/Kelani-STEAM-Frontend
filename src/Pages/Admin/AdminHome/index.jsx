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
} from "@mui/material";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { cloudinaryName, cloudinaryPreset } from "../../../Assets/Components/const";

// Event Data Table
const columns = [
  { field: "eventName", headerName: "Event", width: 500 },
  { field: "society", headerName: "Society", width: 330 },
  { field: "university", headerName: "University", width: 250 },
];
const rows = [
  {
    id: 1,
    eventName: "Leo Nanasara Athwala",
    society: "Leo Club",
    university: "University of Kelaniya",
  },
  {
    id: 2,
    eventName: "Quiz Competition 23'",
    society: "Society of Plant and Molecular Biology",
    university: "University of Kelaniya",
  },
  {
    id: 3,
    eventName: "Speacial Party",
    society: null,
    university: "University of Kelaniya",
  },
  // {
  //   id: 4,
  //   eventName: "Leo Nanasara Athwala",
  //   society: "Leo Club",
  //   university: "University of Kelaniya",
  // },
  // {
  //   id: 5,
  //   eventName: "Quiz Competition 23'",
  //   society: "Society of Plant and Molecular Biology",
  //   university: "University of Kelaniya",
  // },
  // {
  //   id: 6,
  //   eventName: "Speacial Party",
  //   society: null,
  //   university: "University of Kelaniya",
  // },
];

const AdminHome = () => {
  useEffect(() => {
    // Load album data when the component mounts
    // loadProjectData();
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
            // color="error"
            onClick={() => handleDeleteRow(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    albumRows: [],
    projectColumns: [
      { field: "projectName", headerName: "Project Name", width: 400 },
      { field: "projectDescription", headerName: "Description", width: 480 },
      {
        field: "delete",
        headerName: "Delete",
        width: 80,
        renderCell: (params) => (
          <IconButton onClick={() => handleDeleteProjectDataRow(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    projectRows: [],
    projectName: "",
    projectDescription: "",
    coverImage: null,
    projectPreviewImages: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [albumLoader, setAlbumLoader] = useState(false);
  const [albumTableLoader, setAlbumTableLoader] = useState(false);
  const [projectTableLoader, setProjectTableLoader] = useState(false);

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
      })
      .catch((error) => console.error(error));
  };

  // Handle Project's Cover Image
  const handleCoverImageChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0],
    });
  };
  const fileInputRef = useRef(null);
  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle Project's Preview Image Changes
  const handleProjectPreviewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      projectPreviewImages: [
        ...formData.projectPreviewImages,
        ...files.slice(0, 3),
      ],
    });
  };

  // on Submit function for Projects
  const onSubmitProjects = async () => {
    // Check if any field is empty
    if (
      formData.projectName.trim() === "" ||
      formData.projectDescription.trim() === ""
      // formData.coverImage.length !== 1 ||
      // formData.projectPreviewImages.length !== 3
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

    // Check Cover  file size
    const fileSizeMB = formData.coverImage.size / (1024 * 1024); // Convert to megabytes

    if (fileSizeMB > 1) {
      toast.error(
        `File ${formData.coverImage.name} exceeds the maximum allowed size of 1MB`,
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

    // Check Preview file sizes
    for (const file of formData.projectPreviewImages) {
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

    setProjectTableLoader(true);
    // Send Preview Images to the cloud
    const uploadPromisesForPreviewImages = formData.projectPreviewImages.map(
      (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", cloudinaryPreset);
        return axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
          data
        );
      }
    );
    // Upload Cover Image
    const data = new FormData();
    data.append("file", formData.coverImage);
    data.append("upload_preset", cloudinaryPreset);

    try {
      // Response for Cover Image
      const responseForCoverImage = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
        data
      );
      const uploadedCoverImageUrl = responseForCoverImage.data.url;
      console.log("Uploaded Cover Image URL:", uploadedCoverImageUrl);

      // Response For Preview Images
      const responsesForPreviewImages = await Promise.all(
        uploadPromisesForPreviewImages
      );
      const uploadedPreviewImageUrls = responsesForPreviewImages.map(
        (response) => response.data.url
      );
      console.log("Uploaded Preview Image URLs:", uploadedPreviewImageUrls);

      // Send all data to the database
      try {
        console.log(
          "Before send it to the database - Cover Image :",
          uploadedCoverImageUrl
        );
        console.log(
          "Before send it to the database - Preview Images :",
          uploadedPreviewImageUrls
        );
        const response = await axios.post(
          "http://localhost:8080/projects/create",
          {
            projectName: formData.projectName,
            projectDescription: formData.projectDescription,
            coverImageUrl: uploadedCoverImageUrl,
            previewImageUrls: uploadedPreviewImageUrls,
          }
        );

        console.log("Project created successfully:");
        toast.success(`Project created successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error(
          "Error creating Project:",
          error.response ? error.response.data : error.message
        );
        toast.error(`Error in Creating Project!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading images in Project:", error);
      toast.error(`Error in Uploading Images in Project!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setProjectTableLoader(false);
    loadProjectData();
  };

  // Load Project Data for the Table
  const loadProjectData = () => {
    setProjectTableLoader(true);
    axios
      .get("http://localhost:8080/projects/getAll")
      .then((response) => {
        // Assuming response.data is an array of albums
        const projects = response.data;

        const projectRowsData = projects.map((project) => ({
          id: project.id,
          projectName: project.projectName,
          projectDescription: project.projectDescription,
        }));

        setFormData({
          ...formData,
          projectRows: projectRowsData,
        });

        console.log("Project data loaded:", projectRowsData);
        setProjectTableLoader(false);
      })
      .catch((error) => console.error(error));
  };

  // Handle delete Row from the Project Data Table
  const handleDeleteProjectDataRow = (rowId) => {
    console.log("Delete Clicked in Project Data");
    // Find the index of the row with the specified ID
    setProjectTableLoader(true);

    const params = {
      id: rowId,
    };
    axios
      .delete("http://localhost:8080/projects/delete", { params })
      .then((response) => {
        console.log("Project deleted:", rowId);
        setProjectTableLoader(false);
        loadProjectData();
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
                style={{ minHeight: "500px", height: "auto", width: "100%" }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  // checkboxSelection
                />
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

export default AdminHome;
