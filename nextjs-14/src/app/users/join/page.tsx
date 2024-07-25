"use client";

import { IUser } from "@/app/components/user/model/user";
import {
  existsEmail,
  existsUsername,
  findUserById,
  join,
} from "@/app/components/user/service/user-service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { PG } from "@/app/components/common/enums/PG";
import { getExistsUsername, getExistsEmail } from "@/app/components/user/service/user-slice";
import Footer from "@/app/components/common/module/footer";

export default function Join({ params }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState({} as IUser);
  const [isTruePw, setIsTruePw] = useState(false);
  const [isWrongPw, setIsWrongPw] = useState(false);
  const [isTrueEmail, setIsTrueEmail] = useState(false);
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isTruePhone, setIsTruePhone] = useState(false);
  const [isWrongPhone, setIsWrongPhone] = useState(false);
  const [beforeSubmit, setBeforeSubmit] = useState(true);
  const [len, setLen] = useState("");
  const existsUsernameSelector = useSelector(getExistsUsername);
  const existsEmailSelector = useSelector(getExistsEmail);

  const {
    register,
    // handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  useEffect(() => {
    console.log("Params id: ", params.id);
    if (params.id) {
      dispatch(findUserById(params.id))
        .then((res: any) => {
          const userData = res.payload.values;
          reset(userData);
        })
        .catch((error: any) => console.log("error: ", error));
    }
  }, [dispatch, reset, params.id]);

  const handleSubmit = async () => {
    try {
      const response = await dispatch(join(user));
      if (response.payload.message === "SUCCESS") {
        alert("회원가입에 성공했습니다!");
        router.push(`${PG.USER}/login`);
      } else if (response.payload.message === "FAILURE") {
        alert("회원가입에 실패했습니다.");
        window.location.reload();
      }
    } catch (error) {
      console.log("회원가입 중 에러 발생 : ", error);
    }
  };

  const handleEmail = async (e: any) => {
    dispatch(existsEmail(e.target.value));
    const EMAIL_CHECK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setUser({
      ...user,
      email: e.target.value,
    });
    setLen(e.target.value);
    setBeforeSubmit(true);

    if (EMAIL_CHECK.test(len)) {
      try {
        const response = await dispatch(existsEmail(e.target.value));
        setIsWrongEmail(!response.payload);
        setIsTrueEmail(true);
      } catch (error) {
        console.error("Error checking email:", error);
        setErrorMessage("Failed to check email. Please try again.");
      }
      setIsWrongEmail(false);
      setIsTrueEmail(true);
    } else {
      setIsWrongEmail(true);
      setIsTrueEmail(false);
    }
  };

  const handlePassword = (e: any) => {
    const PW_CHECK =
      /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?]{6,9}$/g;
    setLen(e.target.value);
    setBeforeSubmit(true);

    if (PW_CHECK.test(len)) {
      setIsWrongPw(false);
      setIsTruePw(true);
      setUser({
        ...user,
        password: e.target.value,
      });
    } else {
      setIsWrongPw(true);
      setIsTruePw(false);
    }
  };



  const handleName = (e: any) => {
    setUser({ ...user, name: e.target.value });
  };

  const handlePhone = (e: any) => {
    setUser({ ...user, phone: e.target.value });
    const PHONE_CHECK = /^\d{3}-\d{4}-\d{4}$/;

    setBeforeSubmit(true);

    if (PHONE_CHECK.test(e.target.value)) {
      setIsWrongPhone(false);
      setIsTruePhone(true);
    } else {
      setIsWrongPhone(true);
      setIsTruePhone(false);
    }
  };

  const handleAge = (e: any) => {
    setUser({ ...user, age: e.target.value });
  };

  const handleSex = (e: any) => {
    setUser({ ...user, gender: e.target.value });
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0 pb-20">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="w-[73vh] h-[67vh] flex overflow-y-auto"
      >
        <div className="w-full p-[8.5vh] justify-center items-center">
          <p className="text-2xl text-center font-bold mb-20 light:text-black">
            Create your account
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="block light:text-gray-700  text-sm">
              Email
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 mt-2"
              onChange={handleEmail}
              // {...register("email", {
              //   required: "Email is required",
              //   pattern: {
              //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              //     message: "Invalid email address",
              //   },
              // })}
            />
            {isWrongEmail && (
              <p className="font-sans text-red-500 text-sm">
                Invalid email address
              </p>
            )}
            {isTrueEmail && len?.length > 1 && (
              <pre>
                <p className="font-sans text-blue-500 text-sm">
                  Valid email addrress.
                </p>
              </pre>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block light:text-gray-700  text-sm">
              Password
            </label>{" "}
            <input
              type="password"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 mt-2"
              onChange={handlePassword}
              // {...register("password", { required: "Password is required" })}
            />
            {isWrongPw && (
              <pre>
                <p className="font-sans text-red-500 text-xs">
                  Invalid password. Must contain 4 to 10 uppercase letters,
                  lowercase letters, <br />
                  numbers and special characters.
                </p>
              </pre>
            )}
            {isTruePw && len?.length > 1 && (
              <pre>
                <p className="font-sans text-blue-500 text-sm">
                  Valid password.
                </p>
              </pre>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block light:text-gray-700  text-sm">
              Name
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 mt-2"
              onChange={handleName}
              // {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block light:text-gray-700  text-sm">
              Phone
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 mt-2"
              onChange={handlePhone}
              // {...register("phone", { required: "Phone is required" })}
            />
            {isWrongPhone && (
              <p className="font-sans text-red-500 text-sm">
                Invalid phone number
              </p>
            )}
            {isTruePhone && len?.length > 1 && (
              <pre>
                <p className="font-sans text-blue-500 text-sm">
                  Valid phone number.
                </p>
              </pre>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block light:text-gray-700  text-sm">
              Age
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 mt-2"
              onChange={handleAge}
              // {...register("age", { required: "Job is required" })}
            />
            {errors.job && <p className="text-red-500">{errors.job.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block light:text-gray-700  text-sm">
              Sex
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 mt-2"
              onChange={handleSex}
              // {...register("age", { required: "Job is required" })}
            />
            {errors.job && <p className="text-red-500">{errors.job.message}</p>}
          </div>
          <div className="flex justify-center">
            <button onClick={handleSubmit} className="static m-11 w-36">
              Sign up
            </button>
          </div>
          <div className="text-center">
            <Link
              href="/users/login"
              className="text-xs text-gray-500 text-center w-full"
            >
              <span className="text-blue-500">Already have an account?</span>
            </Link>
          </div>
          <svg className="h-20"></svg>
        </div>
      </form>
      <Footer />
    </div>
  );
}
