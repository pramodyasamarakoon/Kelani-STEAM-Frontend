import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  cloudinaryName,
  cloudinaryPreset,
  mainEndpoint,
  universities,
} from "../../Assets/Components/const";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BookingForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Name: "",
    University: "",
    Event: "",
    Email: "",
    Mobile: "",
    Description: "",
    Expectation: "",
    WhatWeGet: "",
    ProposalLink: "",
    Other: "",
    tempImg: null,
  });
  const [formLoader, setFormLoader] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Validate the Mobile Number
    if (name === "Mobile") {
      handleContactNumberChange(event);
    }
    if (name === "Email") {
      handleEmailChange(event);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(`Edited : ${name}:`, value);
  };

  // Contact Number Validation
  const [contactNumberError, setContactNumberError] = useState("");
  const handleContactNumberChange = (event) => {
    const inputValue = event.target.value;

    // Perform real-time validation here
    if (!/^[0-9]{10}$/.test(inputValue)) {
      setContactNumberError("Invalid contact number");
    } else {
      setContactNumberError("");
    }

    // Update the state
    // setContactNumber(inputValue);
  };

  // E mail Number Validation
  const [EmailError, setEmailError] = useState("");
  const handleEmailChange = (event) => {
    const inputValue = event.target.value;

    // Perform real-time Email validation here
    if (!/^\S+@\S+\.\S+$/.test(inputValue)) {
      setEmailError("Invalid Email address");
    } else {
      setEmailError("");
    }

    // Update the state
    // setEmail(inputValue);
  };

  // Handle the Proposal
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(() => ({
      ...formData,
      tempImg: file,
    }));
    // setIsFileUploaded(true);
  };

  // handle Submit
  const handleSubmit = async () => {
    setFormLoader(true);
    // Check if any required fields are empty or null
    const requiredFields = [
      "Name",
      "University",
      "Event",
      "Email",
      "Mobile",
      "Description",
      "Expectation",
      "WhatWeGet",
      "tempImg",
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
      setFormLoader(false);
      return;
    } else if (contactNumberError) {
      console.error("Error: Please fix the contact number error");
      toast.error("Invalid contact number!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormLoader(false);
      return;
    } else if (EmailError) {
      console.error("Error: Please fix the e mail error");
      toast.error("Invalid E mail!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormLoader(false);
      return;
    } else {
      // Check the Image file size
      const fileSizeMB = formData.tempImg.size / (1024 * 1024); // Convert to megabytes
      console.log("File Size", fileSizeMB);
      if (fileSizeMB > 10) {
        toast.error("Proposal size exceeds the maximum allowed size of 10MB", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData((prevFormData) => ({
          ...prevFormData,
          tempImg: null,
        }));
        setFormLoader(false);
        // setIsFileUploaded(false);
        return;
      } else {
        try {
          const data = new FormData();
          data.append("file", formData.tempImg);
          data.append("upload_preset", cloudinaryPreset);
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
            data
          );
          const uploadedFileUrl = response.data.url;
          console.log("Uploaded File URL:", uploadedFileUrl);

          // Send Data to the Database
          try {
            const response = await axios.post(
              // "http://localhost:8080/bookings/createBooking",
              `${mainEndpoint}booking/create`,
              {
                Name: formData.Name,
                University: formData.University,
                Event: formData.Event,
                Email: formData.Email,
                Mobile: formData.Mobile,
                Description: formData.Description,
                Expectation: formData.Expectation,
                WhatWeGet: formData.WhatWeGet,
                ProposalLink: uploadedFileUrl,
                Other: formData.Other,
                Status: false,
              }
            );

            console.log("Booked successfully");
            toast.success("Booking Successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            // Clear all the fields
            setFormData({
              Name: "",
              University: "",
              Event: "",
              Email: "",
              Mobile: "",
              Description: "",
              Expectation: "",
              WhatWeGet: "",
              imageUrl: "",
              tempImg: null,
              Other: "",
            });
            setFormLoader(false);
            // onClose();
          } catch (error) {
            // setFormLoader(false);
            console.error(
              "Error Booking:",
              error.response ? error.response.data : error.message
            );
            toast.error(`Error in  the Booking!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setFormLoader(false);
          }
        } catch (error) {
          console.log("File Upload Booking2");
          toast.error(`Error in the Booking2!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setFormLoader(false);
        }
      }
    }
  };

  return (
    <div
      className="w-[90%] m-auto mt-8" 
      // style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
    >
      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name of the Society"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel size="small" >Select the University</InputLabel>
              <Select
                label="Select the University"
                name="University"
                value={formData.University}
                onChange={handleChange}
                inputProps={{
                  name: "University",
                  id: "University",
                }}
                size="small"
              >
                {universities.map((University, index) => (
                  <MenuItem key={index} value={University}>
                    {University}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event"
              name="Event"
              value={formData.Event}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={Boolean(EmailError) ? EmailError : "E-mail"}
              type="Email"
              name="Email"
              error={Boolean(EmailError)}
              value={formData.Email}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={
                Boolean(contactNumberError)
                  ? contactNumberError
                  : "Contact Number (Whatsapp Preferred)"
              }
              error={Boolean(contactNumberError)}
              type="tel"
              name="Mobile"
              value={formData.Mobile}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description of the Event"
              multiline
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Expectations"
              multiline
              name="Expectation"
              value={formData.Expectation}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="What do we get?"
              multiline
              name="WhatWeGet"
              value={formData.WhatWeGet}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Proposal (PDF)</InputLabel>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
              style={{ marginTop: "8px" }}
              // disabled={formData.tempImg != null}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Other"
              multiline
              name="Other"
              value={formData.Other}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid
            item
            xs={3.5}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid item xs={5} sx={{ display: { xs: "none", md: "flex" } }}>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={formLoader}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
                sx={{ marginLeft: 2 }}
                disabled={formLoader}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: "flex", md: "none" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                // disabled={true}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
                sx={{ marginLeft: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default BookingForm;
