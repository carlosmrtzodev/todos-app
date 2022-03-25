import "./App.css";
import Tasks from "./components/Tasks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./components/pages/Task";
import AddTask from "./components/pages/AddTask";

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
