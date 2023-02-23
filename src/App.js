import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";

import InterviewsTable from "./Components/InterviewsTable";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import ClosedInterviewsTable from "./Components/ClosedInterviewsTable";
import SuccessfulInterviewsTable from "./Components/SuccessfulInterviewsTable";
import Home from "./Components/Home";
import Interview from "./Components/Interview";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import PageNotFound from "./Components/PageNotFound";
import { InterviewsContextProvider } from "./context/InterviewsContext";
import Profile from "./Components/Profile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthContextProvider>
        <InterviewsContextProvider>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/interviews"
              element={
                <ProtectedRoute>
                  <InterviewsTable />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/interviews/byId/:id"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/closedInterviews"
              element={
                <ProtectedRoute>
                  <ClosedInterviewsTable />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/successfulInterviews"
              element={
                <ProtectedRoute>
                  <SuccessfulInterviewsTable />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </InterviewsContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
