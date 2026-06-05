import "../../../index.css";
import { useState } from "react";
import { FormField, PasswordField } from "../components/form.fields.jsx";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/spinner.jsx";

export default function SignInPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const new_form = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(new_form);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const responsejson = await response.json();
        console.log(responsejson);
        throw new Error("Query unsuccessful");
      }
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setLoading(false);
        navigate("/dashboard");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Error: ", error);
      console.log("Error when submitting form", error);
    }
  };

  return (
    <div
      className="w-screen h-screen flex bg-cover bg-center flex-col justify-center align-center"
      style={{
        backgroundImage: "url('/background.jpeg')",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col bg-gray-100 gap-4 w-[30%] mx-auto my-auto px-10 rounded-lg shadow-lg">
          <h1 className="text-2xl font-extrabold my-10 mx-auto">
            Welcome back!
          </h1>
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <FormField
              labelText="Email"
              type="email"
              placeholder="Type Email"
              name="email"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-md px-3 py-2 pr-10"
              />

              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <a
              onClick={() => {
                navigate("/forgot-password");
              }}
              className="underline text-blue-600 self-end text-sm my-2"
            >
              Forgot password?
            </a>
            <button
              type="submit"
              className="btn bg-blue-600 p-2 w-full font-semibold text-white rounded-md"
            >
              Sign In
            </button>
          </form>
          <p className="mx-auto my-2">or</p>
          <div className="flex flex-row gap-5 mx-auto ">
            <button className="btn bg-gray-100 p-1 rounded-md border border-gray-200 text-sm flex flex-row gap-1">
              <img className="w-[1.2rem] h-[1.2rem]" src="/google.png" />
              <p> Sign in with Google</p>
            </button>
            <button className="btn bg-gray-100 rounded-md border border-gray-200 text-sm p-1 flex flex-row gap-1">
              <img className="w-[1.2rem] h-[1.2rem]" src="/apple.png" />
              <p>Sign in with Apple</p>
            </button>
          </div>
          <div className="flex flex-row gap-2 my-4 mx-auto text-sm">
            <p>Have an account</p>
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="underline text-blue-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
