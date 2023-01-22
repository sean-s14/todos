import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidebar from "src/sidebar";
import Todo from "src/todo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Sidebar />
      <Todo />
    </ThemeProvider>
  );
}

export default App;
