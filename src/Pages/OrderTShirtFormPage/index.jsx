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
  LinearProgress,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import Loader from "../../Assets/Components/Loader";
import {
  cloudinaryName,
  cloudinaryPreset,
} from "../../Assets/Components/const";

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
    imageUrl: "",
    tempImg: null,
  });
  const [formLoader, setFormLoader] = useState(false);

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

  //  Handle Radio Buttons
  const handleChangeRadio = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log("Payment Method", formData.paymentMethod);
  };

  //  Handle File Uploading
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(() => ({
      ...formData,
      tempImg: file,
    }));
    setIsFileUploaded(true);
  };

  // Submit Function
  const handleSubmit = async () => {
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
      return;
    } else if (emailError) {
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
      return;
    } else {
      // Check the Image file size
      const fileSizeMB = formData.tempImg.size / (1024 * 1024); // Convert to megabytes
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          tempImg: null,
        }));
        setIsFileUploaded(false);
        return;
      } else {
        setFormLoader(true);
        // Send payment proof to the Cloudinary
        const data = new FormData();
        data.append("file", formData.tempImg);
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
              "http://localhost:8080/tshirt-orders/addTShirtOrder",
              {
                name: formData.name,
                department: formData.department,
                studentNumber: formData.studentNumber,
                contactNumber: formData.contactNumber,
                email: formData.email,
                size: formData.size,
                paymentMethod: formData.paymentMethod,
                paymentAmount: formData.paymentAmount,
                imageUrl: uploadedImageUrl,
              }
            );

            console.log("Order Placed successfully");
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
            setFormLoader(false);

            // Clear all the fields
            setFormData((prevFormData) => ({
              ...prevFormData,
              name: "",
              department: "",
              studentNumber: "",
              contactNumber: "",
              email: "",
              size: "",
              paymentMethod: "",
              paymentAmount: "",
              imageUrl: "",
              tempImg: null,
            }));
          } catch (error) {
            setFormLoader(false);
            console.error(
              "Error Order:",
              error.response ? error.response.data : error.message
            );
            toast.error(`Error in  the Order!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          setFormLoader(false);
        }
      }
    }
  };

  return (
    <div>
      <NavBar visibilityOfOrderButton={false} />
      <ScrollToTopButton />

      {/* T shirt form Container PC */}
      <div
        className="w-[86%] mx-auto hidden md:block"
        style={{
          background: "#D9D9D950",
          borderRadius: "30px",
          // display: { xs: "hidden", md: "block" },
        }}
      >
        <Grid container sx={{ marginTop: 8 }}>
          {/* Form Title */}
          <Grid item xs={12} sx={{ marginY: "30px" }}>
            <p className="font-OpenSans-SemiBold text-[30px]">
              Kelani STEAM Member's T Shirt Order Form
            </p>
          </Grid>
          <Grid container sx={{ background: "#FFFFFF90" }}>
            <Grid
              item
              xs={4}
              sx={{
                padding: "30px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Shirt Image */}
              <div className="w-full h-auto">
                <img className="" src={TShirtSmall} alt="T Shirt Flyer" />
              </div>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                padding: "20px",
                paddingRight: "-10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <Grid container>
                  {/* T shirt details */}
                  <Grid item xs={12} sx={{}}>
                    <p className="font-OpenSans-SemiBold text-[14px]">
                      T-Shirt Details
                    </p>
                    <Grid container spacing={1}>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[12px]">
                          Color - Black
                        </p>
                      </Grid>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[12px]">
                          Material: 220 gsm crocodile
                        </p>
                      </Grid>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[12px]">
                          Price: 1800.00 LKR
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Instructions */}
                  <Grid item xs={12} sx={{ marginTop: 1 }}>
                    <Grid item xs={12} sx={{}}>
                      <p className="font-OpenSans-SemiBold text-[14px]">
                        Online Payment Details
                      </p>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{}}>
                          <p className="font-OpenSans-regular text-[12px]">
                            ***Note that if you are willing to do the initial
                            payment using online payment method, you have to do
                            the payment before submitting the form.
                          </p>
                        </Grid>
                        <Grid item xs={4} sx={{}}>
                          <p className="font-OpenSans-regular text-[12px]">
                            Account No: 055200420012203 <br />
                            Account Holder: SNYA GUNASEKARA
                            <br />
                            Bank: Peoples' Bank
                            <br />
                            Branch: Kelaniya
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 1 }}>
                    <Grid item xs={12} sx={{}}>
                      <p className="font-OpenSans-SemiBold text-[14px]">
                        Handover Details
                      </p>
                    </Grid>
                    <Grid item xs={12} sx={{}}>
                      <p className="font-OpenSans-regular text-[12px]">
                        ***Note that if you are willing to hand over the initial
                        payment, you have to do the payment to one of below
                        mentioned members before submitting the form.
                        <br />
                        Sithumi: 071 495 6554
                        <br />
                        Pathum: 077 217 3607
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>

            {/* Form */}
            <div className="w-[960px] mx-auto my-10">
              <p className="font-OpenSans-semiBold text-[24px]">
                Order Details
              </p>
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
                <ValidatorForm>
                  <div className="flex justify-between">
                    {/* Payment Amount Radio Group */}
                    <FormControl id="paymentAmount">
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
                    <FormControl>
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
                      {formData.paymentMethod === "BankDeposit/OnlinePayment"
                        ? "Upload an image of your payment proof"
                        : formData.paymentMethod === "CashOnHand"
                        ? "Upload the payment proof image you got"
                        : "Please select the Payment Method"}
                    </FormLabel>
                    {/* <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      disabled={formData.paymentMethod === ""}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button> */}
                    <label>
                      <Button
                        component="span"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        disabled={isFileUploaded || !formData.paymentMethod}
                      >
                        {isFileUploaded ? "Done" : "Upload file"}
                      </Button>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        // disabled={uploadProgress > 0 || isFileUploaded}
                      />
                    </label>

                    {/* Progress Bar */}
                    {/* {uploadProgress > 0 && !isFileUploaded && (
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                      />
                    )} */}
                  </div>

                  {/* Submit Button */}
                  {formLoader ? (
                    <Loader size="2rem" />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </ValidatorForm>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* T shirt form Container Mobile */}
      <div
        className="w-[86%] mx-auto block md:hidden"
        style={{
          background: "#D9D9D950",
          borderRadius: "30px",
          // display: { xs: "hidden", md: "block" },
        }}
      >
        <Grid container spacing={0} sx={{ marginTop: 8 }}>
          {/* Form Title */}
          <Grid item xs={12} sx={{ marginY: "20px" }}>
            <p className="font-OpenSans-SemiBold text-[20px]">
              Kelani STEAM Member's T Shirt Order Form
            </p>
          </Grid>
          <Grid item xs={12} sx={{}}>
            {/* White background box */}
            <div
              className="w-full h-auto mx-auto"
              style={{
                background: "#FFFFFF90",
                padding: "15px",
                position: "relative",
              }}
            >
              {/* Shirt Image */}
              <div className="w-full h-auto ">
                <img className="" src={TShirtSmall} alt="T Shirt Flyer" />
              </div>
              {/* Right text grid */}
              <div
                style={{
                  // position: "absolute",
                  // left: "69%",
                  // top: "50%",
                  // transform: "translate(-50%, -50%)",
                  marginTop: 15,
                  width: "full",
                  textAlign: "left",
                }}
              >
                <Grid container spacing={1}>
                  {/* T shirt details */}
                  <Grid item xs={12} sx={{}}>
                    <p className="font-OpenSans-SemiBold text-[16px]">
                      T-Shirt Details
                    </p>
                    <Grid container spacing={1}>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[14px]">
                          Color - Black
                        </p>
                      </Grid>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[14px]">
                          Material: 220 gsm crocodile
                        </p>
                      </Grid>
                      <Grid item xs={4} sx={{}}>
                        <p className="font-OpenSans-regular text-[14px]">
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
                          width: "full",
                          color: "black",
                          fontSize: 16,
                          fontFamily: "Open Sans",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        Online Payment Details
                      </div>
                      <div
                        style={{
                          color: "black",
                          fontSize: 14,
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
                          // width: "full",
                          color: "black",
                          fontSize: 16,
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
                          fontSize: 14,
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
              {/* <div
                style={{
                  // position: "absolute",
                  // left: "20%",
                  // top: "90%",
                  // transform: "translate(-50%, -50%)",
                  // width: "415px",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                <p className="font-OpenSans-SemiBold text-[18px]">
                  Deadline: 30th October 2023
                </p>
              </div> */}
            </div>

            {/* Form */}
            <div className="w-full mx-auto my-10">
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
              <div className="w-full my-2" style={{ position: "relative" }}>
                {/* Shirt Image */}
                <div className="w-full h-auto ">
                  <img className="" src={SizeChartSmall} alt="T Shirt Flyer" />
                </div>
                <div
                  style={{
                    // position: "absolute",
                    // left: "68%",
                    // top: "50%",
                    // transform: "translate(-50%, -50%)",
                    textAlign: "left",
                    // width: "570px",
                    marginTop: 10,
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
              <div className="w-full mt-6">
                <ValidatorForm>
                  <div className="">
                    {/* Payment Amount Radio Group */}
                    <FormControl id="paymentAmount">
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
                    <FormControl>
                      <FormLabel
                        sx={{ color: "black", marginTop: 5 }}
                        id="paymentMethod"
                      >
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
                      {formData.paymentMethod === "BankDeposit/OnlinePayment"
                        ? "Upload an image of your payment proof"
                        : formData.paymentMethod === "CashOnHand"
                        ? "Upload the payment proof image you got"
                        : "Please select the Payment Method"}
                    </FormLabel>
                    {/* <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      disabled={formData.paymentMethod === ""}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button> */}
                    <label>
                      <Button
                        component="span"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        disabled={
                          uploadProgress > 0 ||
                          isFileUploaded ||
                          !formData.paymentMethod
                        }
                      >
                        {isFileUploaded ? "Done" : "Upload file"}
                      </Button>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        disabled={uploadProgress > 0 || isFileUploaded}
                      />
                    </label>

                    {/* Progress Bar */}
                    {/* {uploadProgress > 0 && !isFileUploaded && (
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                      />
                    )} */}
                  </div>

                  {/* Submit Button */}

                  {formLoader ? (
                    <Loader size="2rem" />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </ValidatorForm>
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

export default OrderTShirtFormPage;
