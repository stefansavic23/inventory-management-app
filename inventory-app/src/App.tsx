import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginFinal from "./components/Login"
import SignUp from "./components/SignUp"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={< LoginFinal />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
