import axios from "axios";
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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";

import DeleteRowModal from "./DeleteRowModal";
import EditRowModal from "./EditRowModal";
import Status from "./Status";
import { STATUSES } from "../utils/constants";
import { InterviewsContext } from "../context/InterviewsContext";

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

  const ts = new Date(row.dateAndTime);

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
}

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function InterviewsTable() {
  const { listOfInterviews, setListOfInterviews } =
    useContext(InterviewsContext);

  return (
    <>
      <Typography variant="h4" sx={{ m: "16px", textAlign: "center" }}>
        Open Interviews
      </Typography>
      {listOfInterviews.length ? (
        <TableContainer
          component={Paper}
          sx={{ m: "0 5% 5% 5%", width: "90%" }}
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
                    <Row
                      key={interview.id}
                      row={interview}
                      listOfInterviews={listOfInterviews}
                      setListOfInterviews={setListOfInterviews}
                    />
                  )
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
}
