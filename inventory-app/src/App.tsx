import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginFinal from "./components/Login"
import SignUp from "./components/SignUp"
import Inventory from "./components/Inventory"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={< LoginFinal />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
