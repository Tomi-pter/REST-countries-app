import Header from "./Header";
import Countries from "./Countries";
import Country from "./Country";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
