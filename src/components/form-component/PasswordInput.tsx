"use client";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

type PasswordInputProps = {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-2xl border-gray-300 focus:border-none h-12 font-poppins focus-visible:ring-primary lg:text-base lg:font-normal"
      />
      {!showPassword ? (
        <FaRegEyeSlash
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/4 text-gray-500 cursor-pointer"
        />
      ) : (
        <FaRegEye
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/4 text-gray-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default PasswordInput;
