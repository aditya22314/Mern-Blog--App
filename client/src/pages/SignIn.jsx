import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signinStart,
  signInSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../Components/Oauth";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signinFailure("Please fill all the fields"));
    }
    try {
      dispatch(signinStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signinFailure(err.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center text-4xl  font-bold dark:text-white "
          >
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              Adi&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign in with your email and password to enter my Blog
          </p>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <div className="">
            <form className="flex flex-col gap-4">
              <div>
                <Label value="Your Email" />
                <TextInput
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput
                  type="password  "
                  placeholder="************"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToBlue"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />{" "}
                    <span className="pl-3">Loading ...</span>
                  </>
                ) : (
                  "SignIn"
                )}
              </Button>
              <Oauth />
            </form>
            <div className="flex gap-2 text-sm mt-3">
              <span>Dont have an account ?</span>
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
          {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
