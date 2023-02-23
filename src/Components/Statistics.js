import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { VictoryPie } from "victory-pie";

import { InterviewsContext } from "../context/InterviewsContext";
import { INTERVIEWS_CATEGORY, STATUSES, TABS } from "../utils/constants";

const SmallBoxes = ({ title, count }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(39, 39, 39, 0.8)",
        margin: "8px",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          m: "16px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ m: "8px" }} />
      <Typography
        variant="h3"
        sx={{
          m: "16px",
          textAlign: "center",
        }}
      >
        {count}
      </Typography>
    </div>
  );
};

const TotalPie = ({
  numberOfOpenInterviews,
  numberOfClosedInterviews,
  numberOfSuccessfulInterviews,
}) => {
  const pieData = [
    { x: "Open", y: numberOfOpenInterviews },
    { x: "Closed", y: numberOfClosedInterviews },
    { x: "Success", y: numberOfSuccessfulInterviews },
  ];

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
        }}
      >
        Total Processes
      </Typography>
      <VictoryPie
        height={330}
        width={330}
        padding={16}
        data={pieData}
        colorScale={["#F06071", "#FFF4F4", "#D3FBD8"]}
        style={{
          labels: {
            fill: "black",
          },
          data: { opacity: 1 },
        }}
        innerRadius={68}
        labelRadius={80}
      />
    </div>
  );
};

const OpenInterviewsStatusPie = () => {
  const { listOfInterviews } = useContext(InterviewsContext);
  const [appliedNumber, setAppliedNumber] = useState(0);
  const [inProgressNumber, setInProgressNumber] = useState(0);
  const [offerNumber, setOfferNumber] = useState(0);

  useEffect(() => {
    setAppliedNumber(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.APPLIED;
      }).length
    );
    setInProgressNumber(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.IN_PROGRESS;
      }).length
    );
    setOfferNumber(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.OFFER;
      }).length
    );
  }, []);

  const pieData = [
    { x: STATUSES.APPLIED, y: appliedNumber },
    { x: STATUSES.IN_PROGRESS, y: inProgressNumber },
    { x: STATUSES.OFFER, y: offerNumber },
  ];

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
        }}
      >
        Open Processes (Status)
      </Typography>
      <VictoryPie
        height={330}
        width={330}
        padding={16}
        data={pieData}
        colorScale={["#ACABAB", "#00ADAD", "#D3FBD8"]}
        style={{
          labels: {
            fill: "black",
          },
        }}
        innerRadius={68}
        labelRadius={80}
      />
    </div>
  );
};

const ClosedInterviewsStatusPie = () => {
  const { listOfInterviews } = useContext(InterviewsContext);
  const [endedGoodNumber, setEndedGoodNumber] = useState(0);
  const [endedBadNumber, setEndedBadNumber] = useState(0);

  useEffect(() => {
    setEndedGoodNumber(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.ENDED_GOOD;
      }).length
    );
    setEndedBadNumber(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.ENDED_BAD;
      }).length
    );
  }, []);

  const pieData = [
    { x: STATUSES.ENDED_GOOD, y: endedGoodNumber },
    { x: STATUSES.ENDED_BAD, y: endedBadNumber },
  ];

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
        }}
      >
        Cloed Processes (Status)
      </Typography>
      <VictoryPie
        height={330}
        width={330}
        padding={16}
        data={pieData}
        colorScale={["#FDEDF1", "#AE7384"]}
        style={{
          labels: {
            fill: "black",
          },
        }}
        innerRadius={68}
        labelRadius={80}
      />
    </div>
  );
};

const Statistics = () => {
  const { listOfInterviews } = useContext(InterviewsContext);
  const [numberOfTotalInterviews, setNumberOfTotalInterviews] = useState(0);
  const [numberOfOpenInterviews, setNumberOfOpenInterviews] = useState(0);
  const [numberOfClosedInterviews, setNumberOfClosedInterviews] = useState(0);
  const [numberOfSuccessfulInterviews, setNumberOfSuccessfulInterviews] =
    useState(0);

  useEffect(() => {
    setNumberOfTotalInterviews(listOfInterviews.length);
    setNumberOfOpenInterviews(
      listOfInterviews.filter((interview) => {
        return (
          interview.status !== STATUSES.ENDED_BAD &&
          interview.status !== STATUSES.ENDED_GOOD
        );
      }).length
    );
    setNumberOfClosedInterviews(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.ENDED_BAD;
      }).length
    );
    setNumberOfSuccessfulInterviews(
      listOfInterviews.filter((interview) => {
        return interview.status === STATUSES.ENDED_GOOD;
      }).length
    );
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          m: "0 0 0 8px",
        }}
      >
        {TABS.STATISTICS}
      </Typography>
      <Divider sx={{ mb: "8px" }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SmallBoxes
          title={INTERVIEWS_CATEGORY.TOTAL_INTERVIEWS}
          count={numberOfTotalInterviews}
        />
        <SmallBoxes
          title={INTERVIEWS_CATEGORY.OPEN_INTERVIEWS}
          count={numberOfOpenInterviews}
        />
        <SmallBoxes
          title={INTERVIEWS_CATEGORY.CLOSED_INTERVIEWS}
          count={numberOfClosedInterviews}
        />
        <SmallBoxes
          title={INTERVIEWS_CATEGORY.SUCCESSFUL_INTERVIEWS}
          count={numberOfSuccessfulInterviews}
        />
      </Box>
      <Divider sx={{ m: "8px 0 8px 0" }} />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TotalPie
          numberOfOpenInterviews={numberOfOpenInterviews}
          numberOfClosedInterviews={numberOfClosedInterviews}
          numberOfSuccessfulInterviews={numberOfSuccessfulInterviews}
        />
        <OpenInterviewsStatusPie />
        <ClosedInterviewsStatusPie />
      </Box>
    </Box>
  );
};
export default Statistics;
