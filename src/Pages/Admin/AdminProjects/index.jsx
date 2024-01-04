import {
  Grid,
  Button,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../Assets/Components/Loader";
import { cloudinaryName, cloudinaryPreset } from "../../../Assets/Components/const";

const AdminProjects = () => {
  useEffect(() => {
    // Load album data when the component mounts
    loadProjectData();
  }, []);

  // State to hold form data
  const [formData, setFormData] = useState({
    projectColumns: [
      { field: "projectName", headerName: "Project Name", width: 400 },
      { field: "projectDescription", headerName: "Description", width: 550 },
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
    projectRows: [],
    projectName: "",
    projectDescription: "",
    coverImage: null,
    projectPreviewImages: [],
  });
  const [projectTableLoader, setProjectTableLoader] = useState(false);
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
        toast.success(`Project Deleted!`, {
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
    handleDeleteProjectDataRow(deleteConfirmation.deleteRowId);

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
          <Grid item xs={12} sx={{}}>
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
                      name="projectName"
                      label="Project Name"
                      variant="standard"
                      fullWidth
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.projectName}
                      onChange={handleChange}
                    />

                    {/* Description */}
                    <TextValidator
                      name="projectDescription"
                      label="Project Description"
                      variant="standard"
                      fullWidth
                      multiLine
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.projectDescription}
                      onChange={handleChange}
                    />

                    {/* Upload Cover */}
                    <div className="w-full my-8">
                      {/* File Upload Button */}
                      <label
                        htmlFor="file"
                        style={{ color: "black", marginRight: "4px" }}
                      >
                        Upload Cover Image
                      </label>
                      <div className="mt-[20px] flex">
                        {/* Hidden file input */}
                        <input
                          ref={fileInputRef}
                          id="file"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleCoverImageChange}
                        />

                        {/* Preview Image */}
                        {formData.coverImage && (
                          <img
                            src={URL.createObjectURL(formData.coverImage)}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                        )}

                        {/* Plus mark div (hidden upload button) */}
                        {!formData.coverImage && (
                          <div
                            onClick={handlePlusClick}
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
                        )}
                      </div>
                    </div>

                    {/* Upload Preview Images */}
                    <div className="w-full my-8">
                      {/* File Upload Button */}
                      <label
                        htmlFor="file"
                        style={{ color: "black", marginRight: "4px" }}
                      >
                        Upload 3 images for preview
                      </label>
                      <div className="mt-[20px] flex ">
                        {/* Hidden file input */}
                        {[...Array(3)].map((_, index) => (
                          <input
                            key={index}
                            id={`fileInput-${index}`}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleProjectPreviewImageChange}
                          />
                        ))}

                        {/* Preview Images */}
                        {formData.projectPreviewImages.map((file, index) => (
                          <div key={index} style={{ marginRight: "10px" }}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))}

                        {/* Plus mark div (hidden upload button) */}
                        {[
                          ...Array(3 - formData.projectPreviewImages.length),
                        ].map((_, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              document
                                .getElementById(`fileInput-${index}`)
                                .click()
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
                              marginRight: "10px",
                            }}
                          >
                            +
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={onSubmitProjects}
                      size="small"
                      disabled={projectTableLoader}
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
                  {!projectTableLoader ? (
                    <DataGrid
                      rows={formData.projectRows}
                      columns={formData.projectColumns}
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

export default AdminProjects;
