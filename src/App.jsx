import "./Globals.css";
import Index from "./components/Index";
import Task from "./components/pages/Task";
import AddTask from "./components/pages/AddTask";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks/:id" element={<Task />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
