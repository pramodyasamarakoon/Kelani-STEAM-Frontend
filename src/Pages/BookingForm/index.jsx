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

const BookingForm = ({ onSubmit, onClose }) => {
  const universities = [
    "University of Kelaniya",
    "University of Colombo",
    "University of Peradeniya",
    "University of Moratuwa",
    "University of Sri Jayewardenepura",
    "University of Ruhuna",
    "University of Jaffna",
    "Eastern University, Sri Lanka",
    "Rajarata University of Sri Lanka",
    "Sabaragamuwa University of Sri Lanka",
    "Wayamba University of Sri Lanka",
    "Uva Wellassa University",
    "University of the Visual & Performing Arts",
    "South Eastern University of Sri Lanka",
    "Open University of Sri Lanka",
    "Sri Lanka Technological Campus (SLTC)",
    "Sri Lanka Institute of Information Technology (SLIIT)",
    // Add more universities as needed
  ];
  const [formData, setFormData] = useState({
    // Initialize form data here if needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted");
    // Handle form submission logic here
    onSubmit(formData);
    // Clear form data after submission if needed
    setFormData({
      // Reset form fields to initial state if needed
    });
    onClose();
  };
  return (
    <div
      className="w-[90%] m-auto mt-8"
      // style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
    >
      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Name of the Society" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Select the University</InputLabel>
              <Select label="Select the University">
                {universities.map((university, index) => (
                  <MenuItem key={index} value={university}>
                    {university}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Event" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="E-mail" type="email" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mobile Number" type="tel" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description of the Event"
              multiline
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Your Expectations" multiline required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="What do we get?" multiline required />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Proposal (PDF)</InputLabel>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              // onChange={(e) => handleFileChange(e.target.files[0])}
              style={{ marginTop: "8px" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Other" multiline />
          </Grid>
          <Grid item xs={3.5}></Grid>
          <Grid item xs={5}>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookingForm;
