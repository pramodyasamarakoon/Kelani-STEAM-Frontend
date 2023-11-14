import {
  Grid,
  TextField,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";
import TShirtSmall from "../../Assets/Images/TShirtImage/TShirtSmall.jpg";
import SizeChartSmall from "../../Assets/Images/TShirtImage/TSizeChartSmall.jpg";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const OrderTShirtFormPage = () => {
  const departments = ["IM", "PS", "BS", "ENCM", "PE", "ECS", "AC", "SS", "SE"];
  const sizeChart = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // File Upload Button Styles
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
  const [emailError, setEmailError] = useState("");
  const handleEmailChange = (event) => {
    const inputValue = event.target.value;

    // Perform real-time email validation here
    if (!/^\S+@\S+\.\S+$/.test(inputValue)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    // Update the state
    // setEmail(inputValue);
  };

  // Form Payment Method Handling
  const [paymentMethod, setPaymentMethod] = useState("");

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    studentNumber: "",
    contactNumber: "",
    email: "",
    size: "",
    paymentMethod: "",
    paymentAmount: "",
    file: null,
  });

  // Function to handle input changes and update formData
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Handling change for ${name}: ${value}`);
    if (name === "contactNumber") {
      handleContactNumberChange(event);
    }
    if (name === "email") {
      handleEmailChange(event);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeRadio = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

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
      // You may want to display an error message to the user here
      return;
    }

    if (contactNumberError) {
      console.error("Error: Please fix the contact number error");
      return;
    }
    if (emailError) {
      console.error("Error: Please fix the e mail error");
      return;
    }

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
    // axios
    //   .post("your_api_endpoint", formDataToSend)
    //   .then((response) => {
    //     console.log("Data sent successfully:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending data:", error);
    //   });
  };

  return (
    <div>
      <NavBar visibilityOfOrderButton={false} />
      {/* T shirt form Container */}
      <div
        className="w-[86%] mx-auto my-10"
        style={{ background: "#D9D9D950", borderRadius: "30px" }}
      >
        <Grid container spacing={0} sx={{ marginTop: 12 }}>
          {/* Form Title */}
          <Grid item xs={12} sx={{ marginY: "30px" }}>
            <p className="font-OpenSans-SemiBold text-[30px]">
              Kelani STEAM Member's T Shirt Order Form
            </p>
          </Grid>
          <Grid item xs={12} sx={{}}>
            {/* White background box */}
            <div
              className="w-[1172px] h-[507px] mx-auto"
              style={{
                background: "#FFFFFF90",
                padding: "30px",
                position: "relative",
              }}
            >
              {/* Shirt Image */}
              <div className="w-[403px] h-[403px] ">
                <img className="" src={TShirtSmall} alt="T Shirt Flyer" />
              </div>
              {/* Right text grid */}
              <div
                style={{
                  position: "absolute",
                  left: "69%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "700px",
                  textAlign: "left",
                }}
              >
                <Grid container spacing={1}>
                  {/* T shirt details */}
                  <Grid item xs={12} sx={{}}>
                    <p className="font-OpenSans-SemiBold text-[18px]">
                      T-Shirt Details
                    </p>
                    <Grid container spacing={1}>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[16px]">
                          Color - Black
                        </p>
                      </Grid>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[16px]">
                          Material: 220 gsm crocodile
                        </p>
                      </Grid>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[16px]">
                          Price: 1800.00 LKR
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Instructions */}
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 673,
                          color: "black",
                          fontSize: 18,
                          fontFamily: "Open Sans",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        Online Payment Details
                      </div>
                      <div
                        style={{
                          width: 664,
                          color: "black",
                          fontSize: 16,
                          fontFamily: "Open Sans",
                          fontWeight: "400",
                          wordWrap: "break-word",
                        }}
                      >
                        ***Note that if you are willing to do the initial
                        payment using online payment method, you have to do the
                        payment before submitting the form.
                        <br />
                        <br />
                        Account No: 055200420012203
                        <br />
                        Account Holder: SNYA GUNASEKARA
                        <br />
                        Bank: Peoples' Bank
                        <br />
                        Branch: Kelaniya
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 673,
                          color: "black",
                          fontSize: 18,
                          fontFamily: "Open Sans",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        Handover Details
                      </div>
                      <div
                        style={{
                          width: "100%",
                          color: "black",
                          fontSize: 16,
                          fontFamily: "Open Sans",
                          fontWeight: "400",
                          wordWrap: "break-word",
                        }}
                      >
                        ***Note that if you are willing to hand over the initial
                        payment, you have to do the payment to one of below
                        mentioned members before submitting the form.
                        <br />
                        <br />
                        Sithumi: 071 495 6554
                        <br />
                        Pathum: 077 217 3607
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              {/* Deadline */}
              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  top: "90%",
                  transform: "translate(-50%, -50%)",
                  width: "415px",
                  textAlign: "center",
                }}
              >
                <p className="font-OpenSans-SemiBold text-[22px]">
                  Deadline: 30th October 2023
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="w-[960px] mx-auto my-10">
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "black",
                  fontSize: 24,
                  fontFamily: "Open Sans",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                Order Details
              </div>
              <div className="w-full my-8" style={{ position: "relative" }}>
                {/* Shirt Image */}
                <div className="w-[350px] h-[350px] ">
                  <img className="" src={SizeChartSmall} alt="T Shirt Flyer" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "68%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "left",
                    width: "570px",
                  }}
                >
                  <ValidatorForm>
                    {/* Name */}
                    <TextValidator
                      name="name"
                      label="Name"
                      variant="standard"
                      fullWidth
                      required
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.name}
                      onChange={handleChange}
                    />

                    {/* Department */}
                    <SelectValidator
                      fullWidth
                      label="Department"
                      variant="standard"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      sx={{ marginY: "5px" }}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </SelectValidator>

                    {/* Student Number */}
                    <TextValidator
                      name="studentNumber"
                      label="Student Number"
                      variant="standard"
                      fullWidth
                      required
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.studentNumber}
                      onChange={handleChange}
                    />

                    {/* Contact Number (Whatsapp Preferred) */}
                    <TextValidator
                      name="contactNumber"
                      label={
                        Boolean(contactNumberError)
                          ? contactNumberError
                          : "Contact Number (Whatsapp Preferred)"
                      }
                      variant="standard"
                      fullWidth
                      required
                      error={Boolean(contactNumberError)}
                      // onChange={handleContactNumberChange}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />

                    {/* E-mail */}
                    <TextValidator
                      name="email"
                      label={Boolean(emailError) ? emailError : "E-mail"}
                      variant="standard"
                      fullWidth
                      required
                      error={Boolean(emailError)}
                      // onChange={handleEmailChange}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      sx={{
                        marginY: "5px",
                      }}
                      value={formData.email}
                      onChange={handleChange}
                    />

                    {/* Size */}
                    <SelectValidator
                      fullWidth
                      label="Size"
                      variant="standard"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      sx={{ marginY: "5px" }}
                    >
                      {sizeChart.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </SelectValidator>
                  </ValidatorForm>
                </div>
              </div>
              <div className="w-full my-2">
                <ValidatorForm
                // onSubmit={handleSubmit}
                >
                  <div className="flex justify-between">
                    {/* Payment Amount Radio Group */}
                    <FormControl
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      id="paymentAmount"
                    >
                      <FormLabel sx={{ color: "black" }}>
                        Payment Amount
                      </FormLabel>
                      <RadioGroup
                        row
                        name="paymentAmount"
                        value={formData.paymentAmount}
                        onChange={handleChangeRadio}
                      >
                        <FormControlLabel
                          value="1800"
                          control={<Radio />}
                          label="Full Payment (LKR 1800)"
                        />
                        <FormControlLabel
                          value="1000"
                          control={<Radio />}
                          label="Half Payment (LKR 1000)"
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* Payment Method Radio Group */}
                    <FormControl
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    >
                      <FormLabel sx={{ color: "black" }} id="paymentMethod">
                        Payment Method
                      </FormLabel>
                      <RadioGroup
                        row
                        name="paymentMethod"
                        // onChange={handlePaymentMethodChange}
                        value={formData.paymentMethod}
                        onChange={handleChangeRadio}
                      >
                        <FormControlLabel
                          value="BankDeposit/OnlinePayment"
                          control={<Radio />}
                          label="Bank Deposit/Online Payment"
                        />
                        <FormControlLabel
                          value="CashOnHand"
                          control={<Radio />}
                          label="Cash on hand"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="w-full my-8">
                    {/* File Upload Button */}
                    <FormLabel
                      sx={{ color: "black", marginRight: 4 }}
                      id="file"
                    >
                      {paymentMethod === "BankDeposit/OnlinePayment"
                        ? "Upload an image of your payment proof"
                        : paymentMethod === "CashOnHand"
                        ? "Upload the payment proof image you got"
                        : "Please select the Payment Method"}
                    </FormLabel>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      disabled={formData.paymentMethod === ""}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </ValidatorForm>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default OrderTShirtFormPage;
