import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./components/MainPage/MainPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
      </Routes>
    </Router>
  );
}
