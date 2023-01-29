import axios from "axios";
import React, { useEffect, useState } from "react";
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

function TextInTheBox({ row }) {
  const { comment, whatWentWell, whatCanBeImproved, ActionItems } = row;
  console.log(comment);
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
      {ActionItems && (
        <Typography variant="h5" gutterBottom component="div">
          Action Items:
        </Typography>
      )}
      <Typography variant="h6" gutterBottom component="div">
        {ActionItems}
      </Typography>
    </>
  );
}

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const { comment, whatWentWell, whatCanBeImproved, actionItems } = row;
  const shouldExpand =
    comment || whatCanBeImproved || whatWentWell || actionItems;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {shouldExpand && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.companyName}
        </TableCell>
        <TableCell align="left">{row.jobTitle}</TableCell>
        <TableCell align="left">{row.step}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
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

export default function InterviewsTable() {
  const [listOfInterviews, setListOfInterviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/interviews").then((response) => {
      console.log(response.data);
      const interviews = response.data;
      setListOfInterviews(interviews);
    });
  }, []);

  return listOfInterviews.length ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
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
            <Row key={interview.id} row={interview} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <h1>Miss Interviews</h1>
  );
}
