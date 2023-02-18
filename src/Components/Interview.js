import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

import RetroCard from "./RetroCard";
import { RETRO_TITLES } from "../utils/constants";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Interview = () => {
  let { id } = useParams();
  const [interviewObject, setInterviewObject] = useState({});

  const {
    companyName,
    jobTitle,
    step,
    dateAndTime,
    status,
    comment,
    whatWentWell,
    whatCanBeImproved,
    actionItems,
  } = interviewObject;

  const shouldExpand =
    actionItems || whatCanBeImproved || whatWentWell || comment;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/interviews/byId/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setInterviewObject(response.data);
      });
  });

  const ts = new Date(dateAndTime);

  return (
    <Card
      sx={{ borderRadius: "16px" }}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader
        sx={{
          backgroundImage: `linear-gradient(to bottom right, #1E1E1E, #474554)`,
        }}
        title={`${jobTitle} Interview (${companyName})`}
        subheader={dateAndTime && ts.toLocaleString()}
        action={
          shouldExpand && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <RetroCard
                retroTitle={RETRO_TITLES.COMMENT}
                content={comment ? comment : "-"}
              />
            </Grid>

            <Grid item lg={3} md={3} sm={3} xs={3}>
              <RetroCard
                retroTitle={RETRO_TITLES.WHAT_WENT_WELL}
                content={whatWentWell ? whatWentWell : "-"}
              />
            </Grid>

            <Grid item lg={3} md={3} sm={3} xs={3}>
              <RetroCard
                retroTitle={RETRO_TITLES.WHAT_CAN_BE_IMPROVED}
                content={whatCanBeImproved ? whatCanBeImproved : "-"}
              />
            </Grid>

            <Grid item lg={3} md={3} sm={3} xs={3}>
              <RetroCard
                retroTitle={RETRO_TITLES.ACTION_ITEMS}
                content={actionItems ? actionItems : "-"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Interview;
