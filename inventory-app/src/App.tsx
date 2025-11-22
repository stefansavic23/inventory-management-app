import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginFinal from "./components/Login"
import { SignIn } from "./components/SignIn"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={< LoginFinal />} />
        <Route path="/signup" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
