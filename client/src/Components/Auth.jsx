import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "bob@example.com",
    password: "bob123",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const res = await axios.post("http://localhost:3000/auth/register", {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        });
        setIsRegister(false);
        console.log("Register Success:", res.data);
      } else {
        const res = await axios.post("http://localhost:3000/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log("Login Success:", res.data);
        setUser({ username: res.data.username, wishlist: res.data.wishlist });
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/lists");
  }, [user]);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 mt-16 text-3xl md:text-4xl font-bold underline text-blue-400 text-center">
        Flock-List
      </div>
      <div className="flex items-start justify-center pt-10 px-4 bg-gray-100">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 space-y-6 rounded shadow-md">
          <div className="flex justify-center mb-4 gap-2">
            <button
              className={`w-1/2 px-4 py-2 font-semibold rounded-l ${
                !isRegister ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setIsRegister(false)}
            >
              Sign In
            </button>
            <button
              className={`w-1/2 px-4 py-2 font-semibold rounded-r ${
                isRegister ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setIsRegister(true)}
            >
              Register
            </button>
          </div>

          <div
            className={`transition-all duration-500 overflow-hidden w-[290px] ${
              isRegister ? "h-[370px]" : "h-[220px]"
            }`}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegister && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {isRegister && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              >
                {isRegister ? "Register" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
