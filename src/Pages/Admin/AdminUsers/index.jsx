import {
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { mainEndpoint } from "../../../Assets/Components/const";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const AdminUsers = () => {
  useEffect(() => {
    // Check for the AuthToken in local storage
    const authToken = localStorage.getItem("AuthToken");
    const userName = localStorage.getItem("User Name");

    if (authToken && isValidBase64(authToken) && userName === "Admin Account") {
      // AuthToken is available, load the album data
      loadAllUsers();
    } else {
      // AuthToken is not available, navigate to the home page
      window.location.href = "/";
    }
  }, []);

  // State to hold form data
  const [formData, setFormData] = useState({
    userColumns: [
      { field: "Id", headerName: "User Id", flex: 4 },
      { field: "UserName", headerName: "User Name", flex: 4 },
      {
        field: "delete",
        headerName: "Delete",
        flex: 1,
        renderCell: (params) => (
          <IconButton
            onClick={() =>
              setDeleteConfirmation({
                openDialog: true,
                deleteRowId: params.row.Id,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    userRows: [],
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    openDialog: false,
    deleteRowId: "",
  });
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Validating the Auth Token
  const isValidBase64 = (str) => {
    try {
      const decoded = atob(str);
      return decoded.length === 32; // Check if the decoded string length is 32 bytes
    } catch (e) {
      return false;
    }
  };

  //   Add User
  const addUser = () => {
    setButtonLoader(true);
    // Check if any field is empty
    if (userName.trim() === "" || password.trim() === "") {
      // Display toast error message
      toast.error(`Please fill the All fields`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setButtonLoader(false);
      return;
    }

    axios
      .post(`${mainEndpoint}auth/register`, {
        UserName: userName,
        Password: password,
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(`User created successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // setUserName("");
        // setPassword("");
        loadAllUsers();
        setDialogOpen(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`${error.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    setButtonLoader(false);
  };

  const loadAllUsers = () => {
    setLoader(true);
    axios
      .get(`${mainEndpoint}auth/getallusers`)
      .then((response) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          userRows: response.data,
        }));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //   Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  //   handle close dialog box
  const onClose = () => {
    setDialogOpen(false);
    setUserName("");
    setPassword("");
  };

  // Handle delete Row from the Album Data Table
  const handleDeleteRow = (rowId) => {
    // Find the index of the row with the specified ID
    axios
      .delete(`${mainEndpoint}auth/deleteUserById/${rowId}`)
      .then((response) => {
        console.log("User deleted:", rowId);
        toast.success(`User Deleted!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        loadAllUsers();
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

      {/* Add Users Container */}
      <div
        className="w-[86%] mx-auto hidden md:block"
        style={{
          background: "#D9D9D950",
          borderRadius: "20px",
        }}
      >
        <Grid container spacing={0} sx={{ marginTop: 12 }}>
          <Grid item xs={12} sx={{}}>
            {/* Add Users Container */}
            <div className="w-full mx-auto my-4">
              <p className="font-OpenSans-SemiBold text-[25px]">Add New User</p>
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
                    marginLeft: 250,
                    marginRight: 250,
                    paddingTop: 30,
                    marginBottom: 60,
                  }}
                >
                  <ValidatorForm>
                    <Grid container>
                      <Grid item xs={12}>
                        {/* User Name */}
                        <TextValidator
                          name="UserName"
                          label="User Name"
                          variant="standard"
                          fullWidth
                          size="small"
                          sx={{
                            marginY: "5px",
                          }}
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* Password */}
                        <TextValidator
                          name="Password"
                          label="Password"
                          variant="standard"
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          size="small"
                          sx={{
                            marginY: "5px",
                          }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <IconButton onClick={toggleShowPassword}>
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}></Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "10px",
                        }}
                      >
                        {/* Add Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={addUser}
                          size="small"
                          fullWidth
                        >
                          {" "}
                          {buttonLoader ? <CircularProgress /> : "Add User"}
                        </Button>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </div>
                {/*User Table */}
                <div
                  style={{
                    minHeight: "200px",
                    height: "auto",
                    width: "100%",
                    marginTop: 40,
                    paddingLeft: 150,
                    paddingRight: 150,
                  }}
                >
                  {!loader ? (
                    <DataGrid
                      rows={formData.userRows}
                      columns={formData.userColumns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      // checkboxSelection
                      getRowId={(row) => row.Id}
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

      <Dialog open={dialogOpen} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Copy User Name and Password</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", alignItems: "center", padding: 2 }}
          >
            <Grid item xs={12}>
              <p style={{ marginBottom: "10px" }}>
                Please ensure that you copy the User Name and Password and share
                them with the user before closing this.
              </p>
            </Grid>
            <Grid item xs={11} sx={{ marginTop: "5px" }}>
              <TextField
                label="User Name"
                size="small"
                value={userName}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={1} sx={{ marginTop: "5px" }}>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(userName)}
              >
                <FileCopyIcon />
              </IconButton>
            </Grid>
            <Grid item xs={11} sx={{ marginTop: "5px" }}>
              <TextField
                label="Password"
                size="small"
                type="password"
                value={password}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={1} sx={{ marginTop: "5px" }}>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(password)}
              >
                <FileCopyIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              paddingTop: 0,
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                onClick={onClose}
                color="primary"
                size="small"
                variant="contained"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AdminUsers;


