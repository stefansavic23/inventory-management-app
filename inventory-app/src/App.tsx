import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginFinal from "./components/Login"
import SignUp from "./components/SignUp"
import Inventory from "./components/Inventory"
import MenuComponent from "./components/Menu"
import { CssVarsProvider, Typography } from "@mui/joy"
import ModeToggle from "./components/ModeToggle"

function App() {
  return (
    <>
      <CssVarsProvider>
        <ModeToggle />
      </CssVarsProvider>
      <MenuComponent />
      <Typography level="h1" textAlign={'center'}>Inventory</Typography >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={< LoginFinal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
