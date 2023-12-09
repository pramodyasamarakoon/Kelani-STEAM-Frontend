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

const AdminAlbums = () => {
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

  return (
    <div>
      <NavBar visibilityOfOrderButton={false} isAdmin={true} />
      <ScrollToTopButton />

      {/* Admin Albums Container */}
      <div
        className="w-[86%] mx-auto hidden md:block"
        style={{
          background: "#D9D9D950",
          borderRadius: "20px",
        }}
      >
        <Grid container spacing={0} sx={{ marginTop: 12 }}>
          <Grid item xs={12} sx={{}}>
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
                      <div className="mt-[20px] flex flex-row-reverse">
                        {/* Hidden file inputs for each plus mark */}
                        <Box sx={{ width: "50%" }}>
                          {[0, 1, 2, 3].map((index) => (
                            <input
                              key={index}
                              id="fileInput"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                handleFileChangeDemo(e);
                                // uploadImage(e.target.files[0]);
                              }}
                            />
                          ))}
                        </Box>

                        {/* Preview Images */}
                        <Box sx={{ width: "50%" }}>
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
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>

                        {/* Plus mark divs (hidden upload buttons) */}
                        {selectedFiles.length < 4 &&
                          Array.from({ length: 4 - selectedFiles.length }).map(
                            (_, index) => (
                              <div
                                key={index}
                                // onClick={() => handleUploadButtonClick(index)}
                                onClick={() =>
                                  document.getElementById("fileInput").click()
                                }
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  backgroundColor: "#BFBFBF",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                  marginRight: "10px", // adjust spacing as needed
                                }}
                              >
                                +
                              </div>
                            )
                          )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={onSubmitAlbums}
                      size="small"
                      disabled={albumLoader}
                    >
                      Submit
                    </Button>
                  </ValidatorForm>
                </div>
                {/*Album Table */}
                <div
                  style={{
                    minHeight: "200px",
                    height: "auto",
                    width: "100%",
                    marginTop: 40,
                  }}
                >
                  {!albumTableLoader ? (
                    <DataGrid
                      rows={formData.albumRows}
                      columns={formData.albumColumns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      // checkboxSelection
                    />
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </Grid>

          {/* Delete confirmation dialog */}
          <Dialog
            open={deleteConfirmation.openDialog}
            onClose={handleDialogClose}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AdminAlbums;
