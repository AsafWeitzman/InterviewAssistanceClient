import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from "victory";

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

const TotalAxisChart = ({
  numberOfOpenInterviews,
  numberOfClosedInterviews,
  numberOfSuccessfulInterviews,
}) => {
  const data = [
    { status: "Open", count: numberOfOpenInterviews },
    { status: "Closed", count: numberOfClosedInterviews },
    { status: "Success", count: numberOfSuccessfulInterviews },
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
      <VictoryChart domainPadding={20} height={330} width={330}>
        <VictoryAxis
          animate={{
            duration: 2000,
            easing: "bounce",
          }}
          tickValues={[
            numberOfOpenInterviews,
            numberOfClosedInterviews,
            numberOfSuccessfulInterviews,
          ]}
          tickFormat={["Open", "Closed", "Success"]}
          style={{ tickLabels: { fill: "white" }, axis: { stroke: "white" } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={[
            numberOfOpenInterviews,
            numberOfClosedInterviews,
            numberOfSuccessfulInterviews,
          ]}
          style={{ tickLabels: { fill: "white" }, axis: { stroke: "white" } }}
        />
        <VictoryBar
          data={data}
          x="status"
          y="count"
          style={{ data: { fill: "#59b8bb", width: 30 } }}
        />
      </VictoryChart>
    </div>
  );
};

const OpenInterviewsStatusAxisChart = () => {
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

  const data = [
    { status: STATUSES.APPLIED, count: appliedNumber },
    { status: STATUSES.IN_PROGRESS, count: inProgressNumber },
    { status: STATUSES.OFFER, count: offerNumber },
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
      <VictoryChart domainPadding={20} height={330} width={330}>
        <VictoryAxis
          tickValues={[appliedNumber, inProgressNumber, offerNumber]}
          tickFormat={["Applied", "In Progress", "Offer"]}
          style={{ tickLabels: { fill: "white" }, axis: { stroke: "white" } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={[appliedNumber, inProgressNumber, offerNumber]}
          style={{ tickLabels: { fill: "white" }, axis: { stroke: "white" } }}
        />
        <VictoryBar
          data={data}
          x="status"
          y="count"
          style={{ data: { fill: "#ed264f", width: 30 } }}
        />
      </VictoryChart>
    </div>
  );
};

const ClosedInterviewsStatusAxisChart = () => {
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

  const data = [
    { status: STATUSES.ENDED_GOOD, count: endedGoodNumber },
    { status: STATUSES.ENDED_BAD, count: endedBadNumber },
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
      <VictoryChart domainPadding={20} height={330} width={330}>
        <VictoryAxis
          tickValues={[endedGoodNumber, endedBadNumber]}
          tickFormat={[STATUSES.ENDED_GOOD, STATUSES.ENDED_BAD]}
          style={{ tickLabels: { fill: "white" }, axis: { stroke: "white" } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={[endedGoodNumber, endedBadNumber]}
          style={{ tickLabels: { fill: "white" }, axis: { stroke: "white" } }}
        />
        <VictoryBar
          data={data}
          x="status"
          y="count"
          style={{ data: { fill: "#ffca85", width: 30 } }}
        />
      </VictoryChart>
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
    <>
      <Typography
        variant="h4"
        sx={{
          ml: "8px",
        }}
      >
        {TABS.STATISTICS}
      </Typography>
      <Divider sx={{ mb: "8px" }} />
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flexDirection: "column",
        }}
      >
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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TotalAxisChart
            numberOfOpenInterviews={numberOfOpenInterviews}
            numberOfClosedInterviews={numberOfClosedInterviews}
            numberOfSuccessfulInterviews={numberOfSuccessfulInterviews}
          />
          <OpenInterviewsStatusAxisChart />
          <ClosedInterviewsStatusAxisChart />
        </Box>
      </Box>
      <Box
        sx={{
          display: { md: "none", sm: "flex", xs: "flex" },
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TotalAxisChart
            numberOfOpenInterviews={numberOfOpenInterviews}
            numberOfClosedInterviews={numberOfClosedInterviews}
            numberOfSuccessfulInterviews={numberOfSuccessfulInterviews}
          />
          <OpenInterviewsStatusAxisChart />
          <ClosedInterviewsStatusAxisChart />
        </Box>
      </Box>
    </>
  );
};
export default Statistics;
