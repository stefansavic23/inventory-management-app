import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginFinal from "./components/Login"
import SignUp from "./components/SignUp"
import Inventory from "./components/Inventory"
import MenuComponent from "./components/Menu"
import { CssVarsProvider, Typography } from "@mui/joy"
import ModeToggle from "./components/ModeToggle"
import Grid from "@mui/joy/Grid"
import { useColorScheme } from "@mui/joy"

function AppContent() {
  const { mode } = useColorScheme();
  document.body.style.margin = "0";
  document.body.style.backgroundColor = mode === "dark" ? "#000" : "#fff";
  document.documentElement.style.backgroundColor = mode === "dark" ? "#000" : "#fff";
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: mode === "dark" ? "#000" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      {/* HEADER */}
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          p: 2
        }}
      >
        <Grid sx={{ display: "flex", justifyContent: "flex-start", flex: 1 }}>
          <ModeToggle />
        </Grid>

        <Grid sx={{ textAlign: "center", flex: 1 }}>
          <Typography level="h1">
            Inventory
          </Typography>
        </Grid>

        <Grid sx={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
          <MenuComponent />
        </Grid>
      </Grid>

      {/* ROUTING */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFinal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <AppContent />
    </CssVarsProvider>
  )
}

export default App
