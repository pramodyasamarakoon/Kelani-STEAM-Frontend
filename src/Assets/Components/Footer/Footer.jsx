import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { mainEndpoint } from "../const";
import Loader from "../Loader";

function Footer() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSignIn = () => {
    setLoader(true);
    let valid = true;

    if (username.trim() === "") {
      setUsernameError("User Name is required");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }
    // Send credentials to backend
    axios
      .post(`${mainEndpoint}auth/login`, {
        UserName: username,
        Password: password,
      })
      .then((response) => {
        // Check if the response contains the authToken
        if (response.data && response.data.Token) {
          // Save authToken to localStorage
          localStorage.setItem("AuthToken", response.data.Token);
          localStorage.setItem("User Name", username);
          // Navigate to the home page
          window.location.href = "../AdminAlbums";
        }
      })
      .catch((error) => {
        setError("Invalid username or password");
      });
    console.log("Signing in with:", username, password);
    setLoader(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <Grid>
      <Grid
        item
        xs={12}
        className="h-[100px] flex justify-center items-center"
        sx={{ display: { xs: "flex", md: "flex" } }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            onClick={() => setDialogOpen(true)}
            className="text-white font-Poppins-SemiBold xs:text-[12px] md:text-[16px] p-8 cursor-pointer"
          >
            <PermIdentityIcon />
          </p>
          <p className="text-white font-Poppins-SemiBold xs:text-[12px] md:text-[16px] p-8">
            Copyright &copy; 2023 | Powered By කැලණි STEAM Team With &hearts;
          </p>
        </Box>
      </Grid>

      {/* Login Dialog */}
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            size="small"
            label="User Name"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            margin="dense"
            size="small"
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            error={!!passwordError}
            helperText={passwordError}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions sx={{ marginRight: "10px", marginBottom: "10px" }}>
          <Button
            onClick={handleSignIn}
            color="primary"
            variant="contained"
            size="small"
            disabled={loader}
          >
            {loader ? <Loader /> : "Sign In"}
          </Button>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Footer;
