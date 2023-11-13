import { Grid, TextField, Autocomplete } from "@mui/material";
import React from "react";
import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";
import TShirtSmall from "../../Assets/Images/TShirtImage/TShirtSmall.jpg";
import SizeChartSmall from "../../Assets/Images/TShirtImage/TSizeChartSmall.jpg";

const OrderTShirtFormPage = () => {
  const departments = ["IM", "PS", "BS", "ENCM", "PE", "ECS", "AC", "SS", "SE"];
  const sizeChart = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  return (
    <div>
      <NavBar />
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
                <div className="w-[331px] h-[331px] ">
                  <img className="" src={SizeChartSmall} alt="T Shirt Flyer" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "67.5%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "left",
                    width: "600px",
                  }}
                >
                  <form>
                    {/* Name */}
                    <TextField
                      id="name"
                      label="Name"
                      variant="standard"
                      fullWidth
                      sx={{
                        "& label": {
                          color: "black",
                        },
                        "& input": {
                          color: "black",
                        },
                        marginY: 1,
                      }}
                    />

                    {/* Department */}
                    <Autocomplete
                      options={departments}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select an option"
                          variant="standard"
                          fullWidth
                          sx={{
                            "& label": {
                              color: "black",
                            },
                            "& input": {
                              color: "black",
                            },
                            marginY: 1,
                          }}
                        />
                      )}
                    />

                    {/* Student Number */}
                    <TextField
                      id="StudentNumber"
                      label="Student Number"
                      variant="standard"
                      fullWidth
                      sx={{
                        "& label": {
                          color: "black",
                        },
                        "& input": {
                          color: "black",
                        },
                        marginY: 1,
                      }}
                    />

                    {/* Contact Number (Whatsapp Preferred) */}
                    <TextField
                      id="ContactNumber"
                      label="Contact Number (Whatsapp Preferred)"
                      variant="standard"
                      fullWidth
                      sx={{
                        "& label": {
                          color: "black",
                        },
                        "& input": {
                          color: "black",
                        },
                        marginY: 1,
                      }}
                    />

                    {/* E-mail */}
                    <TextField
                      id="E-mail"
                      label="E-mail"
                      variant="standard"
                      fullWidth
                      sx={{
                        "& label": {
                          color: "black",
                        },
                        "& input": {
                          color: "black",
                        },
                        marginY: 1,
                      }}
                    />

                    {/* Size */}
                    <Autocomplete
                      options={sizeChart}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select an option"
                          variant="standard"
                          fullWidth
                          sx={{
                            "& label": {
                              color: "black",
                            },
                            "& input": {
                              color: "black",
                            },
                            marginY: 1,
                          }}
                        />
                      )}
                    />
                  </form>
                </div>
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
