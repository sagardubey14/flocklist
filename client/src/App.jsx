import Auth from "./Components/Auth";
import { Route, Routes } from "react-router-dom";
import MainList from "./Components/MainList";

function App() {
  return (
    <div className="bg-gray-100">
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/lists" element={<MainList />} />
          <Route path="/*" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
