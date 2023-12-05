import {
  Grid,
  Button,
  FormLabel,
  IconButton,
  Stack,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import NavBar from "../../../Assets/Components/NavBar";
import Footer from "../../../Assets/Components/Footer/Footer";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../../../Assets/Components/ScrollToTopButton";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

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
  {
    id: 4,
    eventName: "Leo Nanasara Athwala",
    society: "Leo Club",
    university: "University of Kelaniya",
  },
  {
    id: 5,
    eventName: "Quiz Competition 23'",
    society: "Society of Plant and Molecular Biology",
    university: "University of Kelaniya",
  },
  {
    id: 6,
    eventName: "Speacial Party",
    society: null,
    university: "University of Kelaniya",
  },
];

const AdminHome = () => {
  // Album Data Table
  const albumColumns = [
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
  ];
  const albumRows = [
    {
      id: 1,
      albumName: "Leo Nanasara Athwala",
      photographedBy: "Leo Club",
      editedBy: ["Edit01", "edit02", "edit03"],
    },
    {
      id: 2,
      albumName: "Leo Nanasara Athwala",
      photographedBy: "Leo Club",
      editedBy: ["Edit01", "edit02", "edit03"],
    },
    {
      id: 3,
      albumName: "Leo Nanasara Athwala",
      photographedBy: "Leo Club",
      editedBy: ["Edit01", "edit02", "edit03"],
    },
    {
      id: 4,
      albumName: "Leo Nanasara Athwala",
      photographedBy: "Leo Club",
      editedBy: ["Edit01", "edit02", "edit03"],
    },
  ];

  // State to hold form data
  const [formData, setFormData] = useState({
    albumName: "",
    albumLink: "",
    photographedBy: [""],
    editedBy: [""],
    date: null,
    img01: null,
    img02: null,
    img03: null,
    img04: null,
    projects: [
      {
        projectName: "",
        projectDescription: "",
        projectCoverPhoto: null,
        projectPreviewImages: [null, null, null],
      },
    ],
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
    } else if (name.startsWith("projects[0].")) {
      // Handle changes for projects[0]
      const fieldName = name.split("projects[0].")[1];
      setFormData((prevData) => ({
        ...prevData,
        projects: [
          {
            ...prevData.projects[0],
            [fieldName]: value,
          },
          ...prevData.projects.slice(1), // Keep other projects unchanged
        ],
      }));
    } else {
      // Handle changes for other fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    console.log(`Handling change for ${name}: ${value}`);
  };

  //  Handle File Uploading
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     file,
  //   }));

  //   // Simulating file upload progress (remove this in actual implementation)
  //   const interval = setInterval(() => {
  //     setUploadProgress((prevProgress) =>
  //       prevProgress < 100 ? prevProgress + 10 : prevProgress
  //     );
  //   }, 500);

  //   // Simulating file upload completion (remove this in actual implementation)
  //   setTimeout(() => {
  //     clearInterval(interval);
  //     setUploadProgress(100);
  //     setIsFileUploaded(true);
  //   }, 3000);
  // };

  // Submit Function
  const handleSubmit = () => {
    // Check if any required fields are empty or null
    const requiredFields = [
      "name",
      "department",
      "studentNumber",
      "contactNumber",
      "email",
      "size",
      "paymentMethod",
      "paymentAmount",
      "file",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      console.error(
        `Error: Please fill in the following required fields: ${emptyFields.join(
          ", "
        )}`
      );
      toast.error(" Please fill in the required fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      // send data to the database
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("studentNumber", formData.studentNumber);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("paymentMethod", formData.paymentMethod);
      formDataToSend.append("paymentAmount", formData.paymentAmount);
      formDataToSend.append("file", formData.file);
      // Log the entered data
      console.log("Data Stored successfully:");
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }
      toast.success("Successfully Placed the Order!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // axios
      //   .post("your_api_endpoint", formDataToSend)
      //   .then((response) => {
      //     console.log("Data sent successfully:", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error sending data:", error);
      //   });
    }
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

  // File upload handling
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    // Check if exactly 4 files are selected
    if (selectedFiles.length !== 4) {
      toast.error("Please select exactly 4 files for upload", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the input field
      event.target.value = null;
      return;
    }

    // Check each file size
    for (let i = 0; i < selectedFiles.length; i++) {
      const fileSizeMB = selectedFiles[i].size / (1024 * 1024); // Convert to megabytes

      if (fileSizeMB > 1) {
        toast.error(
          `File ${selectedFiles[i].name} exceeds the maximum allowed size of 1MB`,
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
        event.target.value = null;
        return;
      }
    }

    const files = Array.from(event.target.files);
    handleUpload();
    // Display only the first 4 selected files
    setSelectedFiles(files.slice(0, 4));
  };

  const handleProjectCoverChange = (event) => {
    const selectedFiles = event.target.files;

    // Check if exactly 1 file is selected
    if (selectedFiles.length !== 1) {
      toast.error("Please Upload only 1 photo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the input field
      event.target.value = null;
      return;
    }

    // Check the file size
    const fileSizeMB = selectedFiles[0].size / (1024 * 1024); // Convert to megabytes

    if (fileSizeMB > 1) {
      toast.error(
        `File ${selectedFiles[0].name} exceeds the maximum allowed size of 1MB`,
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
      event.target.value = null;
      return;
    }

    // Update the formData state for projectCoverPhoto
    setFormData((prevData) => ({
      ...prevData,
      projects: [
        {
          ...prevData.projects[0],
          projectCoverPhoto: selectedFiles[0],
        },
      ],
    }));

    // Handle the rest of your logic (e.g., handleUpload, setSelectedFiles, etc.)
    const files = Array.from(selectedFiles);
    handleUpload();
    // Display only the first selected file
    setSelectedFiles(files.slice(0, 1));
  };

  const handleAlbumPreviewImages = (event) => {
    const selectedFiles = event.target.files;

    // Check if exactly 3 files are selected
    if (selectedFiles.length !== 3) {
      toast.error("Please Upload exactly 3 photos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the input field
      event.target.value = null;
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
        event.target.value = null;
        return;
      }
    }

    // Update the formData state for projectPreviewImages
    setFormData((prevData) => ({
      ...prevData,
      projects: [
        {
          ...prevData.projects[0],
          projectPreviewImages: [...selectedFiles],
        },
      ],
    }));

    // Handle the rest of your logic (e.g., handleUpload, setSelectedFiles, etc.)
    // const files = Array.from(selectedFiles);
    // handleUpload();
    // Display only the selected files
  };

  const handleUpload = () => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  // Handle delete Row from the Album Data Table
  const handleDeleteRow = (rowId) => {
    // Find the index of the row with the specified ID
    const rowIndex = albumRows.findIndex((row) => row.id === rowId);

    if (rowIndex !== -1) {
      // Create a new array without the deleted row
      const updatedRows = [
        ...albumRows.slice(0, rowIndex),
        ...albumRows.slice(rowIndex + 1),
      ];

      // Update the state or perform any other necessary actions
      // setAlbumRows(updatedRows);
      console.log("Row deleted:", rowId);
    }
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
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  // checkboxSelection
                />
              </div>
            </div>

            {/* Album Container */}
            <div className="w-full mx-auto my-10">
              <p className="font-OpenSans-SemiBold text-[25px]">
                Add Recent Albums
              </p>
              <div
                className="w-full px-[5%] mx-auto my-4 pb-8"
                style={{
                  background: "#FFFFFF90",
                }}
              >
                {/* Form */}
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <ValidatorForm>
                    {/* Name */}
                    <TextValidator
                      name="albumName"
                      label="Album Name"
                      variant="standard"
                      fullWidth
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.albumName}
                      onChange={handleChange}
                    />

                    {/* Link */}
                    <TextValidator
                      name="albumLink"
                      label="Album Link"
                      variant="standard"
                      fullWidth
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.albumLink}
                      onChange={handleChange}
                    />

                    {/* Photographed By */}
                    <div className="flex">
                      {formData.photographedBy.map((photographedBy, index) => (
                        <Stack
                          key={index}
                          direction="row"
                          alignItems="center"
                          marginRight={4}
                        >
                          <TextValidator
                            name={`photographedBy-${index}`}
                            label={`Photographed By ${index + 1}`}
                            variant="standard"
                            fullWidth
                            value={photographedBy}
                            onChange={(event) => handleChange(event, index)}
                          />
                          <div className="flex mt-3 ml-1">
                            {index === formData.photographedBy.length - 1 &&
                            index < 3 ? (
                              <IconButton
                                sx={{ width: 20, height: 20 }}
                                onClick={handleAddFieldPhoto}
                              >
                                <AddIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                sx={{ width: 20, height: 20 }}
                                onClick={() => handleRemoveFieldPhoto(index)}
                              >
                                <RemoveIcon />
                              </IconButton>
                            )}
                          </div>
                        </Stack>
                      ))}
                    </div>

                    {/* Edited By */}
                    <div className="flex w-full">
                      {formData.editedBy.map((editedBy, index) => (
                        <Stack
                          key={index}
                          direction="row"
                          alignItems="center"
                          marginRight={4}
                          // width="30%"
                        >
                          <TextValidator
                            name={`editedBy-${index}`}
                            label={`Edited By ${index + 1}`}
                            variant="standard"
                            fullWidth
                            value={editedBy}
                            onChange={(event) => handleChange(event, index)}
                          />
                          <div className="flex mt-3 ml-1">
                            {index === formData.editedBy.length - 1 &&
                            index < 3 ? (
                              <IconButton
                                sx={{ width: 20, height: 20 }}
                                onClick={handleAddFieldEdit}
                              >
                                <AddIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                sx={{ width: 20, height: 20 }}
                                onClick={() => handleRemoveFieldEdit(index)}
                              >
                                <RemoveIcon />
                              </IconButton>
                            )}
                          </div>
                        </Stack>
                      ))}
                    </div>

                    {/* Upload */}
                    <div className="w-full my-8">
                      {/* File Upload Button */}
                      <FormLabel
                        sx={{ color: "black", marginRight: 4 }}
                        id="file"
                      >
                        Upload 4 images for preview
                      </FormLabel>
                      <label>
                        <Button
                          component="span"
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          size="small"
                          // onClick={handleUpload}
                          // disabled={
                          //   uploadProgress > 0 || selectedFiles.length === 0
                          // }
                        >
                          {/* {uploadProgress > 0 ? "Uploading..." : "Upload files"} */}
                          Upload files
                        </Button>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          accept="image/*"
                          multiple
                        />
                      </label>

                      {/* Progress Bar */}
                      {/* {uploadProgress > 0 && (
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress}
                        />
                      )} */}

                      {/* Preview Images */}
                      <Box mt={2} sx={{ width: "50%" }}>
                        <ImageList cols={4}>
                          {selectedFiles.map((file, index) => (
                            <ImageListItem key={index}>
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              {/* <IconButton
                                color="error"
                                onClick={() => {
                                  const updatedFiles = [...selectedFiles];
                                  updatedFiles.splice(index, 1);
                                  setSelectedFiles(updatedFiles);
                                }}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                              >
                                <CloudUploadIcon />
                              </IconButton> */}
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Box>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      size="small"
                    >
                      Submit
                    </Button>
                  </ValidatorForm>
                </div>
                {/*Album Table */}
                <div style={{ height: "auto", width: "100%", marginTop: 40 }}>
                  <DataGrid
                    rows={albumRows}
                    columns={albumColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                  />
                </div>
              </div>
            </div>

            {/* Project Container */}
            <div className="w-full mx-auto my-10">
              <p className="font-OpenSans-SemiBold text-[25px]">Add Projects</p>
              <div
                className="w-full px-[5%] mx-auto my-4 pb-8"
                style={{
                  background: "#FFFFFF90",
                }}
              >
                {/* Form */}
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <ValidatorForm>
                    {/* Name */}
                    <TextValidator
                      name="projects[0].projectName"
                      label="Project Name"
                      variant="standard"
                      fullWidth
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.projects[0].projectName}
                      onChange={handleChange}
                    />

                    {/* Description */}
                    <TextValidator
                      name="projects[0].projectDescription"
                      label="Project Description"
                      variant="standard"
                      fullWidth
                      multiLine
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.projects[0].projectDescription}
                      onChange={handleChange}
                    />

                    {/* Upload Cover */}
                    <div className="w-full my-8">
                      {/* File Upload Button */}
                      <FormLabel
                        sx={{ color: "black", marginRight: 4 }}
                        id="file"
                      >
                        Upload Cover Image
                      </FormLabel>
                      <label>
                        <Button
                          component="span"
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          size="small"
                          // onClick={handleUpload}
                          // disabled={
                          //   uploadProgress > 0 || selectedFiles.length === 0
                          // }
                        >
                          {/* {uploadProgress > 0 ? "Uploading..." : "Upload files"} */}
                          Upload file
                        </Button>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleProjectCoverChange}
                          accept="image/*"
                          multiple
                        />
                      </label>

                      {/* Preview Images */}
                      <Box mt={2} sx={{ width: "50%" }}>
                        <ImageList cols={4}>
                          {formData.projects[0].projectCoverPhoto && (
                            <ImageListItem>
                              <img
                                src={URL.createObjectURL(
                                  formData.projects[0].projectCoverPhoto
                                )}
                                alt={`Project Cover`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </ImageListItem>
                          )}
                        </ImageList>
                      </Box>
                    </div>

                    {/* Upload Preview Images */}
                    <div className="w-full my-8">
                      {/* File Upload Button */}
                      <FormLabel
                        sx={{ color: "black", marginRight: 4 }}
                        id="file"
                      >
                        Upload Preview 3 Images
                      </FormLabel>
                      <label>
                        <Button
                          component="span"
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          size="small"
                          // onClick={handleUpload}
                          // disabled={
                          //   uploadProgress > 0 || selectedFiles.length === 0
                          // }
                        >
                          {/* {uploadProgress > 0 ? "Uploading..." : "Upload files"} */}
                          Upload file
                        </Button>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleAlbumPreviewImages}
                          accept="image/*"
                          multiple
                        />
                      </label>

                      {/* Preview Images */}
                      {formData.projects[0].projectPreviewImages && (
                        <Box mt={2} sx={{ width: "50%" }}>
                          <ImageList cols={3}>
                            {formData.projects[0].projectPreviewImages.map(
                              (image, index) => (
                                <ImageListItem key={index}>
                                  {image && (
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt={`Project Image ${index + 1}`}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                </ImageListItem>
                              )
                            )}
                          </ImageList>
                        </Box>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      size="small"
                    >
                      Submit
                    </Button>
                  </ValidatorForm>
                </div>
                {/*Album Table */}
                <div style={{ height: "auto", width: "100%", marginTop: 40 }}>
                  <DataGrid
                    rows={albumRows}
                    columns={albumColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                  />
                </div>
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
