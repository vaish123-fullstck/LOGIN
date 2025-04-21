import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

const InputField = ({ label, error, registration, ...props }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
        }`}
        {...registration}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
