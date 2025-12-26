import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../sociallogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const axoisInstance = useAxios();

  const { createUser, updateUserProfile } = useAuth();

  const [profilePic, setProfilePic] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // update userinfo in the database

        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axoisInstance.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

        await updateUserProfile(userProfile)
          .then(() => {
            "profile name pic updated";
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const formData = new FormData();
    formData.append("image", imageFile);

    const imageURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    const res = await axios.post(imageURL, formData);
    console.log(res.data.data.url);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold">Create An Account!</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* input name  */}
            <label className="label">Your Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-400 text-bold">Name is required</p>
            )}

            {/* input file  */}
            <label className="label">Your Name</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="input"
              placeholder="Your profile picture"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-400 text-bold">Name is required</p>
            )}

            {/* input email  */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-400 text-bold">Email is required</p>
            )}
            {/* input password  */}
            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-400 text-bold">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-bold">Password is small</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black mt-4">
              <Link state={{ from }}>Register</Link>
            </button>
          </fieldset>
          <p className="text-lg">
            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>{" "}
            </small>
          </p>
        </form>
        <div className="text-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
