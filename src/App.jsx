import "./App.css";
import Tasks from "./components/Tasks";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
