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
  const [error, setError] = useState(null);

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
        setUser({
          id: res.data.id,
          name: res.data.username,
          wishlist: res.data.wishlist,
        });
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
      setError(err.response?.data.message || err.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/lists");
  }, [user]);

  return (
    <div className="bg-[#F9FAFB] flex flex-col items-center justify-center">
      <div className="mb-4 mt-16 text-3xl md:text-4xl font-bold underline text-[#6366F1] text-center">
        Flock-List
      </div>
      <div className="flex items-start justify-center px-4 bg-[#F9FAFB] ">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 space-y-6 rounded shadow-md bg-[#E5E7EB]">
          <div className="flex justify-center mb-4 gap-2">
            <button
              className={`w-1/2 px-4 py-2 font-semibold rounded-l ${
                !isRegister
                  ? "bg-[#6366F1] text-white"
                  : "bg-[#E5E7EB] text-[#111827]"
              }`}
              onClick={() => setIsRegister(false)}
            >
              Sign In
            </button>
            <button
              className={`w-1/2 px-4 py-2 font-semibold rounded-r ${
                isRegister
                  ? "bg-[#6366F1] text-white"
                  : "bg-[#E5E7EB] text-[#111827]"
              }`}
              onClick={() => setIsRegister(true)}
            >
              Register
            </button>
          </div>

          <div
            className={`transition-all duration-500 overflow-hidden w-[290px] ${
              isRegister ? "h-[410px]" : "h-[250px]"
            }`}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegister && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#6B7280]">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1] bg-white text-[#111827]"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium text-[#6B7280]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1] bg-white text-[#111827]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-[#6B7280]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1] bg-white text-[#111827]"
                  required
                />
              </div>

              {isRegister && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#6B7280]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1] bg-white text-[#111827]"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 text-white bg-[#6366F1] rounded hover:bg-indigo-600 transition"
              >
                {isRegister ? "Register" : "Sign In"}
              </button>
              {error && (
              <p className="text-x text-[#EF4444] flex justify-center rounded">
                {error}
              </p>
            )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
