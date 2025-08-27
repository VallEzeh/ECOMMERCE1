import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ eye icons

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // ✅ state for toggle
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responce = async () => {
      try {
        const res = await fetch(
          "https://e-com-backend-j88f.onrender.com/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await res.json();
        console.log("Response from server:", data);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };
    responce();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className=" bg-amber-50 p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Signup Form
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Lastname</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* ✅ Password with eye toggle */}
        <div className="mb-6 relative">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-4"
        >
          Signup
        </button>

        {/* ✅ Login Button */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Go to Login
        </button>
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
