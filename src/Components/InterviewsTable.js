import axios from "axios";
import React, { useEffect, useState } from "react";
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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";

import DeleteRowModal from "./DeleteRowModal";
import EditRowModal from "./EditRowModal";
import Status from "./Status";

function TextInTheBox({ row }) {
  const { comment, whatWentWell, whatCanBeImproved, actionItems } = row;
  return (
    <>
      {comment && (
        <Typography variant="h5" gutterBottom component="div">
          Comment:
        </Typography>
      )}
      <Typography variant="h6">{comment}</Typography>
      {whatWentWell && (
        <Typography variant="h5" gutterBottom component="div">
          What Went Well:
        </Typography>
      )}
      <Typography variant="h6" gutterBottom component="div">
        {whatWentWell}
      </Typography>
      {whatCanBeImproved && (
        <Typography variant="h5" gutterBottom component="div">
          What Can Be Improved:
        </Typography>
      )}
      <Typography variant="h6" gutterBottom component="div">
        {whatCanBeImproved}
      </Typography>
      {actionItems && (
        <Typography variant="h5" gutterBottom component="div">
          Action Items:
        </Typography>
      )}
      <Typography variant="h6" gutterBottom component="div">
        {actionItems}
      </Typography>
    </>
  );
}

function Row({ row, setListOfInterviews, listOfInterviews }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { id, comment, whatWentWell, whatCanBeImproved, actionItems } = row;
  const shouldExpand =
    comment || whatCanBeImproved || whatWentWell || actionItems;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" padding="checkbox">
          <Box sx={{ display: "flex" }}>
            <DeleteRowModal
              interviewId={id}
              listOfInterviews={listOfInterviews}
              setListOfInterviews={setListOfInterviews}
            />
            <EditRowModal
              interviewRow={row}
              listOfInterviews={listOfInterviews}
              setListOfInterviews={setListOfInterviews}
            />
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
}

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function InterviewsTable() {
  const [listOfInterviews, setListOfInterviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/interviews", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log("interviewTable response: ", response.data.error);
        } else {
          const interviews = response.data;
          setListOfInterviews(interviews);
        }
      });
  }, []);

  return listOfInterviews.length ? (
    <TableContainer component={Paper} block>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfInterviews.map((interview) => (
            <Row
              key={interview.id}
              row={interview}
              listOfInterviews={listOfInterviews}
              setListOfInterviews={setListOfInterviews}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
}
