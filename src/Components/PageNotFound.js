import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const backgroundImageUrl = "/Images/prisonMike.png";
const backgroundImageUrlSmall = "/Images/prisonMikeSM.png";

const boxStyleMD = {
  position: "fixed",
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100%",
  display: { xs: "none", md: "flex", lg: "flex" },
  flexDirection: "column",
  alignItems: "center",
  objectFit: "contain",
};

const boxStyleXS = {
  position: "fixed",
  backgroundImage: `url(${backgroundImageUrlSmall})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100%",
  display: { xs: "flex", md: "none" },
  flexDirection: "column",
  alignItems: "center",
  objectFit: "contain",
};

const PageNotFound = () => {
  return (
    <>
      <Box role="img" aria-label="Background image" sx={boxStyleMD}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "flex-end",
            mt: "10%",
          }}
        >
          <div
            style={{
              width: "50%",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "16px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                m: 2,
                display: { xs: "none", md: "flex" },
                width: "55ch",
                letterSpacing: ".2rem",
                color: "black",
              }}
            >
              Page Not Found!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                m: 2,
                display: { xs: "none", md: "flex" },
                width: "55ch",
                letterSpacing: ".3rem",
                color: "black",
              }}
            >
              Go to the Home Page: <Link to="/">Home Page</Link>
            </Typography>
          </div>
        </Box>
      </Box>

      <Box role="img" aria-label="Background image" sx={boxStyleXS}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "center",
            p: "10% 2% 0 2%",
          }}
        >
          <div
            style={{
              width: "40%",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "16px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                m: 2,
                display: "inherit",
                width: "55ch",
                letterSpacing: ".2rem",
                color: "black",
              }}
            >
              Page Not Found!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                m: 2,
                display: "inherit",
                width: "55ch",
                letterSpacing: ".3rem",
                color: "black",
              }}
            >
              Try this: <Link to="/">Home Page</Link>
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default PageNotFound;
