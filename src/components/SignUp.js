import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [login, setLogin] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const validateForm = () => {
    let isValid = true;

    if (!formState.name) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Name is required",
      }));
      isValid = false;
    } else if (formState.name.length < 3) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Name should be at least 3 characters long",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (!formState.email) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(formState.email)) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "Email is invalid",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
    if (!formState.phoneNumber) {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Phone number is required",
      }));
      isValid = false;
    } else if (!/^[0-9]{10}$/i.test(formState.phoneNumber)) {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Phone number is invalid",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "",
      }));
    }

    if (!formState.password) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      isValid = false;
    } else if (formState.password.length < 6) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "Password should be at least 6 characters long",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "",
      }));
    }

    if (!formState.confirmPassword) {
      setFormErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Confirm Password is required",
      }));
      isValid = false;
    } else if (formState.confirmPassword !== formState.password) {
      setFormErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Confirm Password does not match",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }

    return isValid;
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    if (validateForm()) {
      axios
        .post("http://localhost:3030/login", formState)
        .then((res) => {
          setFormState({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
          });
          setLogin(true);

          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: sanitizedValue,
    }));
  };

  return (
    <div className="flex flex-col w-full md:w-[420px] ">
      <p className="m-[-6px] text-[18px] tracking-wide font-[500] font-sans">
        ADMIN SIGNUP
      </p>
      <p className="m-1 text-[13px] tracking-normal font-[50] text-[#8B8989] ">
        Please enter your details.
      </p>
      <form
        className="flex flex-col w-full mt-4 justify-center items-center px-2 md:px-0 "
        onSubmit={handleSubmit}
      >
        <input
          className=" rounded-[5px] w-full text-[14px] h-[39px] m-1.5 pl-[12px] border-[0.5px] bg-[#dceaff4d] shadow-shado2   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 placeholder:text-[13px] placeholder:text-[#8B8989] md:w-[400px] md:h-[45px] md:placeholder:text-[14px] md:pl-[17px]"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {formErrors.name && <span>{formErrors.name}</span>}

        <input
          className="w-full rounded-[5px]  text-[14px] h-[39px] m-1.5 pl-[12px] border-[0.5px] bg-[#dceaff4d] shadow-shado2 placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[45px]  md:placeholder:text-[14px] md:pl-[17px]"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {formErrors.email && <span>{formErrors.email}</span>}

        <input
          className="w-full rounded-[5px] text-[14px] h-[39px] m-1.5 pl-[12px] border-[0.5px] bg-[#dceaff4d] shadow-shado2 placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[45px]  md:placeholder:text-[14px] md:pl-[17px]"
          type="tel"
          name="phoneNumber"
          onChange={handlePhoneNumberChange}
          value={formState.phoneNumber}
          placeholder="Enter your contact"
        />
        {formErrors.phoneNumber && <span>{formErrors.phoneNumber}</span>}

        <input
          className="w-full rounded-[5px]  text-[14px] h-[39px] m-2 pl-[12px] border-[0.5px]  bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[45px] md:placeholder:text-[14px] md:pl-[17px]"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {formErrors.password && <span>{formErrors.password}</span>}

        <input
          className="w-full rounded-[5px]  text-[14px] h-[39px] m-2 pl-[12px] border-[0.5px]  bg-[#dceaff4d] shadow-shado2 placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[45px] md:placeholder:text-[14px] md:pl-[17px]"
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {formErrors.confirmPassword && (
          <span>{formErrors.confirmPassword}</span>
        )}
        <button
          className="  w-full h-[40px] rounded-[10px] font-poppins font-[800] text-[15px] bg-[#60BFE5] md:w-[400px] text-white mt-3 "
          type="submit"
        >
          Sign Up
        </button>
        <p className=" w-full  mt-1 text-[11px] text-[#474749] md:w-[400px]">
          By signing up, you agree to the Neutroline User Agreement, Privacy
          Policy, and Cookie Policy.
        </p>
        <p className="mt-4 font-poppins text-[#474749]">
          Already have an account?
          <Link to="/">
            <span className="text-[#1E4AE9] font-[600] "> Sign in</span>
            {login ? <Navigate to="/" /> : null}
          </Link>
        </p>
      </form>
      <div className="relative border w-[200px] h-[500px]">
        <input
          className={`border h-10 px-2 outline-none focus:ring-2 focus:ring-blue-500 ${
            isFocused ? "placeholder-transparent" : ""
          }`}
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <label
          className={`absolute left-2 top-2 transition-all duration-300 text-gray-500 text-sm ${
            isFocused ? "-translate-y-1/2 text-[8px]" : ""
          }`}
        >
          hello
        </label>
      </div>
    </div>
  );
}
