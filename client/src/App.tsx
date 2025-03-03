import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BoardProvider } from "./contexts/BoardContext";

import Layout1 from "./layouts/Layout1";
import Battle from "./pages/Battle";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Without Layout */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* With layout */}
        <Route element={<Layout1 />}>
          <BoardProvider>
            <Route path="/play/:id" element={<Battle />} />
          </BoardProvider>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
