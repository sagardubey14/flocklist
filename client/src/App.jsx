import Auth from "./Components/Auth";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="mb-4 mt-16 text-3xl md:text-4xl font-bold underline text-blue-400 text-center">
          Flock-List
        </div>
        <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/about" element={<Auth />} />
        <Route path="/*" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
