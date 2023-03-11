import { useContext, useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { motion } from "framer-motion";

import { InterviewsContext } from "../context/InterviewsContext";
import { GRID_SIZE, STATUSES, TABS } from "../utils/constants";
import { FONT_WEIGHT } from "../style/textStyle";

const START_OF_WEEK = moment().startOf("week");
const END_OF_WEEK = moment().endOf("week");

const itemVariants = {
  initial: { x: 0, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

const InterviewDetailsCard = ({ interview, index }) => {
  const ts = new Date(interview.dateAndTime);

  return (
    <Box
      component={motion.div}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: index * 0.2 }}
      sx={{
        backgroundColor: "#4e4e4e",
        m: "4px",
        p: "2px",
        borderRadius: "8px 16px 16px 8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          m: "0 8px 0 8px",
        }}
      >
        {`${interview.jobTitle} (${
          interview.companyName
        }) - ${ts.toLocaleString()}`}
      </Typography>
    </Box>
  );
};

const CurrentWeekDays = () => {
  const [daysOfWeek, setDaysOfWeek] = useState([{}]);

  useEffect(() => {
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");

    const daysOfWeek = [];

    for (
      let day = startOfWeek;
      day <= endOfWeek;
      day = day.clone().add(1, "d")
    ) {
      daysOfWeek.push({
        day: day.format("ddd MMM D").split(" ")[0],
        month: day.format("ddd MMM D").split(" ")[1],
        dayNumber: day.format("ddd MMM D").split(" ")[2],
      });
    }

    setDaysOfWeek(daysOfWeek);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          justifyContent: "space-between",
        }}
      >
        {daysOfWeek.map((dayOfWeek, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px",
              margin: "4px",
              borderRadius: "16px",
              border: "solid 1px",
              minWidth: "50px",
            }}
          >
            <Typography
              variant="p"
              sx={{
                textAlign: "center",
                fontWeight: FONT_WEIGHT.X_LARGE,
              }}
            >
              {dayOfWeek.dayNumber}
            </Typography>
            <Typography
              variant="p"
              sx={{
                textAlign: "center",
              }}
            >
              {dayOfWeek.day}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: { md: "none", sm: "flex", xs: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            margin: "4px",
            borderRadius: "16px",
            border: "solid 1px",
            minWidth: "50px",
          }}
        >
          <Typography
            variant="p"
            sx={{
              textAlign: "center",
              fontWeight: FONT_WEIGHT.X_LARGE,
            }}
          >
            {`${daysOfWeek[0].dayNumber} ${daysOfWeek[0].day} - ${
              daysOfWeek[daysOfWeek.length - 1].dayNumber
            } ${daysOfWeek[daysOfWeek.length - 1].day}`}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const InterviewsSchedule = () => {
  const { listOfInterviews } = useContext(InterviewsContext);
  const [openInterviews, setOpenInterviews] = useState({});

  useEffect(() => {
    setOpenInterviews(
      listOfInterviews.filter((interview) => {
        return (
          interview.status !== STATUSES.ENDED_BAD &&
          interview.status !== STATUSES.ENDED_GOOD
        );
      })
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
        {TABS.INTERVIEWS_SCHEDULE}
      </Typography>
      <Divider sx={{ m: "8px 0 8px 0" }} />
      <Grid
        container
        sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
      >
        <Grid
          item
          xs={GRID_SIZE.MEDIUM_LENGTH}
          sm={GRID_SIZE.MEDIUM_LENGTH}
          md={GRID_SIZE.MEDIUM_LENGTH}
          lg={GRID_SIZE.MEDIUM_LENGTH}
        >
          <Box
            sx={{
              bgcolor: "#272727",
              margin: "8px",
              padding: "24px 16px 24px 16px",
              borderRadius: "16px 32px 32px 16px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                mb: "8px",
              }}
            >
              THIS WEEK
            </Typography>
            <CurrentWeekDays />
            <Divider sx={{ m: "8px 0 8px 0" }} />

            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                m: "16px 0px",
              }}
            >
              {!!openInterviews.length
                ? "INCOMING INTERVIEWS"
                : "SORRY YOU DON'T HAVE INCOMING INTERVIEWS"}
            </Typography>
            {!!openInterviews.length &&
              openInterviews
                .filter((interview) => {
                  let compareDate = moment(interview.dateAndTime);
                  return compareDate.isBetween(START_OF_WEEK, END_OF_WEEK);
                })
                .map((interview, index) => {
                  return (
                    <InterviewDetailsCard
                      index={index}
                      key={interview.id}
                      interview={interview}
                    />
                  );
                })}
          </Box>
        </Grid>
        <Grid
          item
          xs={GRID_SIZE.MEDIUM_LENGTH}
          sm={GRID_SIZE.MEDIUM_LENGTH}
          md={GRID_SIZE.MEDIUM_LENGTH}
          lg={GRID_SIZE.MEDIUM_LENGTH}
        >
          <Box
            sx={{
              bgcolor: "#272727",
              margin: "8px",
              padding: "24px 16px 24px 16px",
              borderRadius: "16px 32px 32px 16px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                mb: "8px",
              }}
            >
              THIS MONTH
            </Typography>
            <Divider sx={{ m: "8px 0 8px 0" }} />
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                m: "16px 0px",
              }}
            >
              {!!openInterviews.length
                ? "INCOMING INTERVIEWS"
                : "SORRY YOU DON'T HAVE INCOMING INTERVIEWS"}
            </Typography>
            {!!openInterviews.length &&
              openInterviews
                .filter((interview) => {
                  return moment(interview.dateAndTime).isSame(
                    new Date(),
                    "month"
                  );
                })
                .map((interview, index) => {
                  return (
                    <InterviewDetailsCard
                      index={index}
                      key={interview.id}
                      interview={interview}
                    />
                  );
                })}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
        }}
      >
        <Grid
          item
          xs={GRID_SIZE.LARGE_LENGTH}
          sm={GRID_SIZE.LARGE_LENGTH}
          md={GRID_SIZE.LARGE_LENGTH}
          lg={GRID_SIZE.LARGE_LENGTH}
        >
          <Box
            sx={{
              bgcolor: "#272727",
              margin: "8px",
              padding: "24px 16px 24px 16px",
              borderRadius: "16px 32px 32px 16px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                mb: "8px",
              }}
            >
              THIS WEEK
            </Typography>
            <CurrentWeekDays />
            <Divider sx={{ m: "8px 0 8px 0" }} />

            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                m: "16px 0px",
              }}
            >
              {!!openInterviews.length
                ? "INCOMING INTERVIEWS"
                : "SORRY YOU DON'T HAVE INCOMING INTERVIEWS"}
            </Typography>
            {!!openInterviews.length &&
              openInterviews
                .filter((interview) => {
                  let compareDate = moment(interview.dateAndTime);
                  return compareDate.isBetween(START_OF_WEEK, END_OF_WEEK);
                })
                .map((interview, index) => {
                  return (
                    <InterviewDetailsCard
                      index={index}
                      key={interview.id}
                      interview={interview}
                    />
                  );
                })}
          </Box>
        </Grid>
        <Grid
          item
          xs={GRID_SIZE.LARGE_LENGTH}
          sm={GRID_SIZE.LARGE_LENGTH}
          md={GRID_SIZE.LARGE_LENGTH}
          lg={GRID_SIZE.LARGE_LENGTH}
        >
          <Box
            sx={{
              bgcolor: "#272727",
              margin: "8px",
              padding: "24px 16px 24px 16px",
              borderRadius: "16px 32px 32px 16px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                mb: "8px",
              }}
            >
              THIS MONTH
            </Typography>
            <Divider sx={{ m: "8px 0 8px 0" }} />
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".1rem",
                m: "16px 0px",
              }}
            >
              {!!openInterviews.length
                ? "INCOMING INTERVIEWS"
                : "SORRY YOU DON'T HAVE INCOMING INTERVIEWS"}
            </Typography>
            {!!openInterviews.length &&
              openInterviews
                .filter((interview) => {
                  return moment(interview.dateAndTime).isSame(
                    new Date(),
                    "month"
                  );
                })
                .map((interview, index) => {
                  return (
                    <InterviewDetailsCard
                      index={index}
                      key={interview.id}
                      interview={interview}
                    />
                  );
                })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default InterviewsSchedule;
