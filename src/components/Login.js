import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function SignUp() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const validateForm = () => {
    let isValid = true;

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

    return isValid;
  };

  function fetchData() {
    axios
      .get("http://localhost:3030/login")
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);

    // Check for empty email and password fields
    if (!formState.email.trim() || !formState.password.trim()) {
      console.log("Form validation failed");
      return;
    }

    const result = data.filter(
      (da) => da.email === formState.email && da.password === formState.password
    );

    if (result.length > 0) {
      setLogin(true);
    } else {
      console.log("Invalid email or password");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="  flex flex-col w-full md:w-[420px]">
      <p className="m-[-6px] text-[18px] tracking-wide font-[500] font-sans">
        ADMIN SIGNUP
      </p>
      <p className="m-1 text-[13px] tracking-normal font-[50] text-[#8B8989] ">
        Please enter your details.
      </p>
      <form
        className="flex flex-col w-full px-2 mt-5 justify-center items-center md:px-0 "
        onSubmit={handleSubmit}
      >
        <label className="w-full text-left pl-3">Email</label>
        <input
          className="w-full rounded-[5px]  text-[14px] h-[39px] m-1.5 pl-[12px] border-[0.5px] bg-[#dceaff4d] shadow-shado2 placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[45px]  md:placeholder:text-[14px] md:pl-[17px]"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {formErrors.email && <span>{formErrors.email}</span>}
        <label className="w-full text-left pl-3">Password</label>
        <input
          className="w-full rounded-[5px]  text-[14px] h-[39px] m-2 pl-[12px] border-[0.5px]  bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[45px] md:placeholder:text-[14px] md:pl-[17px]"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        {formErrors.password && <span>{formErrors.password}</span>}

        <div className="flex justify-between mt-2 mb-3 w-full pl-3 pr-3  ">
          <div className=" flex justify-center gap-2 items-center text-center  ">
            <input className="w-[18px] h-[18px]" type="checkbox"></input>
            <div className="text-[13px]">Remember me</div>
          </div>
          <div>
            <p className="text-[#09329D] text-[13px]">Forgot password</p>
          </div>
        </div>

        <button
          className="  w-full h-[40px] mt-4 rounded-[10px] font-poppins font-[800] text-[15px] bg-[#60BFE5] md:w-[400px] text-white  "
          type="submit"
        >
          Sign in
        </button>

        <p className="mt-4 font-poppins text-[#474749]">
          Don’t have an account?
          <Link to="/signup">
            <span className="text-[#1E4AE9] font-[600] "> Sign up</span>
          </Link>
          {login ? <Navigate to="home" /> : null}
        </p>
      </form>
    </div>
  );
}
