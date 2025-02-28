import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout1 from "./layouts/Layout1";
import Battle from "./pages/Battle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout1 />}>
          <Route path="/play/:id" element={<Battle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
