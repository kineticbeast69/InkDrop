import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handlesubmit function
  const loginSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "login",
        { email, password },
        { withCredentials: true }
      );
      // console.log(response.data);
      navigate(`/${response.data.id}/notes`);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        // console.log(error.response);
      }
    }
  };
  return (
    <div className="w-[85%] md:w-[50%] lg:w-[25%] shadow-lg md:shadow-xl lg:shadow-2xl px-5 py-3">
      <h1 className="text-2xl mb-3 md:mb-5 lg:mb-7">Login</h1>
      <form onSubmit={handleSubmit(loginSubmit)}>
        {/* email field */}
        <div>
          <input
            type="email"
            placeholder="email"
            className="input-box"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter valid email address.",
              },
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        {/* password field */}
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input-box"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters",
              },
              pattern: {
                value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message:
                  "Password must have at least one uppercase, one lowercase, one number, and one special character (@$!%*?&)",
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
          <div className="flex my-1 md:my-2 lg:my-3 gap-1">
            <input
              type="checkbox"
              id="check"
              className="bg-white focus:bg-primary"
              onClick={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="check" className="text-[15px]">
              {showPassword ? "Hide" : "Show"} Password
            </label>
          </div>
        </div>
        {/* server error is here */}
        {error && <p className="italic text-danger text-sm">{error}</p>}

        {/* login button */}
        <button className="btn-primary">Login</button>
      </form>
      <p className="text-sm lg:text-lg text-left md:text-center mt-2 md:mt-3 lg:mt-4">
        Not registered yet ?{" "}
        <Link
          to="/register"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Sign-Up
        </Link>
      </p>
    </div>
  );
}
export default Form;
