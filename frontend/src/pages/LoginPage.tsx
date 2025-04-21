import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import InputField from "../components/InputField";

const loginSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: LoginForm) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.uid,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.message || "Something went wrong. Please try again.");
      } else {
        setSuccessMessage("Login successful!");
      }
    } catch (error) {
      setServerError("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-6 py-8 rounded shadow-md w-full max-w-sm border"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>

        <InputField
          label="UID"
          type="text"
          registration={register("uid")}
          error={errors.uid?.message}
        />

        <InputField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password?.message}
        />

        {/* Show server or success messages here */}
        {serverError && (
          <div className="text-red-600 text-sm mt-2 text-center">{serverError}</div>
        )}

        {successMessage && (
          <div className="text-green-600 text-sm mt-2 text-center">{successMessage}</div>
        )}

        <button
          type="submit"
          className="bg-[#1F2A55] hover:bg-[#1a2347] text-white font-semibold py-2 px-4 rounded w-full mt-4 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
