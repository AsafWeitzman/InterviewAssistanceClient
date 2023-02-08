import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      .get(`http://localhost:3001/interviews/byId/${id}`)
      .then((response) => {
        setInterviewObject(response.data);
      });
  });

  const ts = new Date(dateAndTime);

  return (
    <Card sx={{ m: "10%" }}>
      <CardHeader
        title={`${jobTitle} Interview (${companyName})`}
        subheader={dateAndTime && ts.toLocaleString()} // TODO: date format
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          blablabla
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {shouldExpand && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comment: {comment ? comment : "-"}</Typography>
          <Typography paragraph>
            What Went Well: {whatWentWell ? whatWentWell : "-"}
          </Typography>
          <Typography paragraph>
            What Can Be Improved: {whatCanBeImproved ? whatCanBeImproved : "-"}
          </Typography>
          <Typography paragraph>
            Action Items: {actionItems ? actionItems : "-"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Interview;
