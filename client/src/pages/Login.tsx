import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    // Handle login logic (e.g., API call)
    console.log("Logging in with:", data);
    await axiosInstance.post(import.meta.env.VITE_API_BASE_URL+'auth/login', data).then((res: any) => { 
      if(res){
        toast.success('Login successful!');
        navigate('/expenses')
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('user',JSON.stringify(res.data.user))
      }else{
        toast.error('Login failed!');
      }
    })
    // reset(); // Reset form after successful submission
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset it
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;