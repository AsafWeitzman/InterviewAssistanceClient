import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";

import DeleteRowModal from "./DeleteRowModal";
import EditRowModal from "./EditRowModal";
import Status from "./Status";
import { RETRO_TITLES_2, STATUSES } from "../utils/constants";
import { InterviewsContext } from "../context/InterviewsContext";
import { divStyleBackgroundImageHexagon } from "../style/backgroundImageDivStyle";
import { Divider } from "@mui/material";

const RetroBoxes = ({ title, content }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(20, 20, 20, 0.8)",
        margin: "8px",
        padding: "16px",
        borderRadius: "8px",
        width: "25%",
      }}
    >
      <Typography variant="h5" gutterBottom component="div">
        {title}
      </Typography>
      <Divider sx={{ mb: "8px" }} />
      <Typography variant="h6">{content ? content : "-"}</Typography>
    </div>
  );
};

const TextInTheBox = ({ row }) => {
  const { comment, whatWentWell, whatCanBeImproved, actionItems } = row;
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <RetroBoxes title={RETRO_TITLES_2.COMMENT} content={comment} />

      <RetroBoxes
        title={RETRO_TITLES_2.WHAT_WENT_WELL}
        content={whatWentWell}
      />

      <RetroBoxes
        title={RETRO_TITLES_2.WHAT_CAN_BE_IMPROVED}
        content={whatCanBeImproved}
      />

      <RetroBoxes title={RETRO_TITLES_2.ACTION_ITEMS} content={actionItems} />
    </div>
  );
};

const Row = ({ row, setListOfInterviews, listOfInterviews }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { id, comment, whatWentWell, whatCanBeImproved, actionItems } = row;
  const shouldExpand =
    comment || whatCanBeImproved || whatWentWell || actionItems;

  const ts = new Date(row.dateAndTime);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" padding="checkbox">
          <Box sx={{ display: "flex" }}>
            <DeleteRowModal interviewId={id} />
            <EditRowModal interviewRow={row} />
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                navigate(`/interviews/byId/${row.id}`);
              }}
            >
              <OpenInNewIcon />
            </IconButton>
            {shouldExpand && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </Box>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.companyName}
        </TableCell>
        <TableCell align="left">{row.jobTitle}</TableCell>
        <TableCell align="left">{row.step}</TableCell>
        <TableCell align="left">
          <Status step={row.step} />
        </TableCell>
        <TableCell align="left">{ts.toLocaleString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TextInTheBox row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const InterviewsTable = () => {
  const { listOfInterviews } = useContext(InterviewsContext);

  const shouldPresentEmptyTable = !listOfInterviews.filter((interview) => {
    return (
      interview.status !== STATUSES.ENDED_BAD &&
      interview.status !== STATUSES.ENDED_GOOD
    );
  }).length;

  return (
    <div style={divStyleBackgroundImageHexagon}>
      <Typography
        variant="h4"
        sx={{
          m: "16px",
          textAlign: "center",
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        Open Interviews
      </Typography>
      <TableContainer
        sx={{
          m: "0 5% 5% 5%",
          width: "90%",
          backgroundColor: "rgba(39, 39, 39, 0.8)",
          borderRadius: "4px",
        }}
        block
      >
        <Table
          aria-label="collapsible table"
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={list}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Company Name</TableCell>
              <TableCell align="left">Job Title</TableCell>
              <TableCell align="left">Step</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Date And Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfInterviews.map((interview) => {
              return (
                interview.status !== STATUSES.ENDED_BAD &&
                interview.status !== STATUSES.ENDED_GOOD && (
                  <Row key={interview.id} row={interview} />
                )
              );
            })}
          </TableBody>
          {shouldPresentEmptyTable && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <Typography variant="h5" sx={{ padding: 4 }}>
                    Sorry, You Don’t Currently Have Interviews.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default InterviewsTable;
