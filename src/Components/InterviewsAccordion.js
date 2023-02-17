import axios from "axios";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, Grid, Box } from "@mui/material";

const divStyle = {
  backgroundColor: "#343434",
  margin: "8px",
  padding: "16px",
  borderRadius: "8px",
};

const InterviewsAccordion = ({
  listOfInterviews,
  setListOfInterviews = () => {},
  style,
}) => {
  console.log("listOfInterviews: ", listOfInterviews);
  return (
    <div style={{ ...style }}>
      {listOfInterviews.map((interview) => {
        return (
          <Accordion key={interview.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">{`${interview.companyName} - ${interview.jobTitle}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                sx={{
                  display: { md: "flex", xs: "none" },
                }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div
                    style={{ ...divStyle, borderRadius: "16px 16px 0px 0px" }}
                  >
                    <Typography variant="h6">Comment</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>{interview.comment || "-"}</Typography>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <div style={{ ...divStyle, borderRadius: "0px 16px" }}>
                    <Typography variant="h6">What Went Well</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>{interview.whatWentWell || "-"}</Typography>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <div
                    style={{ ...divStyle, borderRadius: "16px 16px 0px 0px" }}
                  >
                    <Typography variant="h6">What Can Be Improved</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>
                      {interview.whatCanBeImproved || "-"}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <div style={{ ...divStyle, borderRadius: "16px 0px" }}>
                    <Typography variant="h6">Action Items</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>{interview.actionItems || "-"}</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: { md: "none", xs: "flex" },
                }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div
                    style={{ ...divStyle, borderRadius: "16px 16px 0px 0px" }}
                  >
                    <Typography variant="h6">Comment</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>{interview.comment || "-"}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div style={{ ...divStyle, borderRadius: "0px 0px 0px 0px" }}>
                    <Typography variant="h6">What Went Well</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>{interview.whatWentWell || "-"}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div style={{ ...divStyle, borderRadius: "0px 0px 0px 0px" }}>
                    <Typography variant="h6">What Can Be Improved</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>
                      {interview.whatCanBeImproved || "-"}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div
                    style={{ ...divStyle, borderRadius: "0px 0px 16px 16px" }}
                  >
                    <Typography variant="h6">Action Items</Typography>
                    <Divider sx={{ mb: "8px" }} />
                    <Typography>{interview.actionItems || "-"}</Typography>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
export default InterviewsAccordion;
