import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginFinal from "./components/Login"
import SignUp from "./components/SignUp"
import Inventory from "./components/Inventory"
import MenuComponent from "./components/Menu"
import { CssVarsProvider, Typography } from "@mui/joy"
import ModeToggle from "./components/ModeToggle"
import Grid from "@mui/joy/Grid"

function App() {
  return (
    <>
      <CssVarsProvider defaultMode="system">
        <Grid container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            p: 2
          }}>
          <Grid sx={{ display: "flex", justifyContent: "flex-start", flex: 1 }}>
            <CssVarsProvider>
              <ModeToggle />
            </CssVarsProvider>
          </Grid>

          <Grid sx={{ textAlign: "center", flex: 1 }}>
            <Typography level="h1" textAlign={'center'}>Inventory</Typography >
          </Grid>

          <Grid sx={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
            <MenuComponent />
          </Grid>
        </Grid>

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={< LoginFinal />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </BrowserRouter>
      </CssVarsProvider>
    </>
  )
}

export default App
