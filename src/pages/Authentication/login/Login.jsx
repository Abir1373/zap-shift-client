import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../sociallogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  //sign in with email
  const on_submit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(on_submit)}>
        <fieldset className="fieldset">
          {/* email input  */}
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input"
            placeholder="Email"
          />
          {/* password input  */}
          <label className="label">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-400 text-base">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-400 text-base">Password is short</p>
          )}
          {/* forget password  */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          {/* login button  */}
          <button className="w-4/7 btn btn-primary text-black">Login</button>
        </fieldset>
        <p className="text-lg">
          <small>
            New To This Website ?
            <Link to="/register" className="text-primary pl-2">
              Register
            </Link>{" "}
          </small>
        </p>
      </form>
      <div className="w-4/7 text-center flex flex-col gap-3">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
