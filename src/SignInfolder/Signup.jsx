import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // ✅ Google icon

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://e-com-backend-j88f.onrender.com/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Signup response:", data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // later -> integrate Google OAuth
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Create Account
        </h2>

        {/* Firstname */}
        <div className="mb-3">
          <label className="block text-gray-600 mb-1 text-sm">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
        </div>

        {/* Lastname */}
        <div className="mb-3">
          <label className="block text-gray-600 mb-1 text-sm">Lastname</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-gray-600 mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-600 mb-1 text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded-lg pr-9 focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-600 text-sm"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition duration-200 text-sm"
        >
          Sign Up
        </button>

        {/* OR separator */}
        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-xs">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center border py-1.5 rounded-lg hover:bg-gray-50 transition duration-200 text-sm"
        >
          <FcGoogle className="text-lg mr-2" /> Sign up with Google
        </button>

        {/* Already have an account? */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;

// import React, { useState } from "react";

// function Signup() {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //  console.log("Submitted data:", formData);ui
//     // You can add validation and API calls here
//     const responce = async () => {
//       try {
//         const res = await fetch("https://backend1-7vdj.onrender.com/user", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });
//         const data = await res.json();
//         console.log("Response from server:", data);
//       } catch (error) {
//         console.error("Error during signup:", error);
//       }
//     };
//     responce();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className=" bg-amber-50 p-8 rounded-2xl shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Signup Form
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-600 mb-1">Firstname</label>
//           <input
//             type="text"
//             name="firstname"
//             value={formData.firstname}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-600 mb-1">Lastname</label>
//           <input
//             type="text"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-600 mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-600 mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//         >
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }
// export default Signup;
