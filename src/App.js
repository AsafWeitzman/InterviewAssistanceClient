import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";

import InterviewsTable from "./Components/InterviewsTable";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import ClosedInterviewsTable from "./Components/ClosedInterviewsTable";
import SuccessfulInterviewsTable from "./Components/SuccessfulInterviewsTable";
import Home from "./Components/Home";
import Interview from "./Components/Interview";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/interviews" element={<InterviewsTable />}></Route>
        <Route path="/interviews/byId/:id" element={<Interview />}></Route>
        <Route
          path="/closedInterviews"
          element={<ClosedInterviewsTable />}
        ></Route>
        <Route
          path="/successfulInterviews"
          element={<SuccessfulInterviewsTable />}
        ></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
