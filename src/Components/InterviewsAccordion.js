import { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, Grid } from "@mui/material";
import DeleteRowModal from "./DeleteRowModal";
import EditRowModal from "./EditRowModal";
import { InterviewsContext } from "../context/InterviewsContext";
import Status from "./Status";

const divStyle = {
  backgroundColor: "#343434",
  margin: "8px",
  padding: "16px",
  borderRadius: "8px",
};

const InterviewsAccordion = ({ endedStatus, style }) => {
  const { listOfInterviews, setListOfInterviews } =
    useContext(InterviewsContext);

  return (
    <div style={{ ...style }}>
      {listOfInterviews.map((interview) => {
        return (
          interview.status === endedStatus && (
            <Accordion key={interview.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  variant="h5"
                  sx={{ pr: "16px" }}
                >{`${interview.companyName} - ${interview.jobTitle}`}</Typography>
                <Status step={interview.step} />
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "8px" }}
                >
                  <DeleteRowModal
                    interviewId={interview.id}
                    listOfInterviews={listOfInterviews}
                    setListOfInterviews={setListOfInterviews}
                  />
                  <EditRowModal
                    interviewRow={interview}
                    listOfInterviews={listOfInterviews}
                    setListOfInterviews={setListOfInterviews}
                  />
                </div>
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
                    <div
                      style={{ ...divStyle, borderRadius: "0px 0px 0px 0px" }}
                    >
                      <Typography variant="h6">What Went Well</Typography>
                      <Divider sx={{ mb: "8px" }} />
                      <Typography>{interview.whatWentWell || "-"}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{ ...divStyle, borderRadius: "0px 0px 0px 0px" }}
                    >
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
          )
        );
      })}
    </div>
  );
};
export default InterviewsAccordion;
