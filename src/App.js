import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import InterviewsTable from "./Components/InterviewsTable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <h1>hello</h1>
        <InterviewsTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
