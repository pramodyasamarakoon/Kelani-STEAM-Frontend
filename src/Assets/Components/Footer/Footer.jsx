import { Box, Grid } from "@mui/material";

function Footer() {
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
          <p className="text-white font-Poppins-SemiBold xs:text-[12px] md:text-[16px] p-8">
            Copyright &copy; 2023 | Powered By කැලණි STEAM Team With &hearts;
          </p>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;
