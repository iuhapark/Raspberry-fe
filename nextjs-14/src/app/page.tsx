"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { API } from "./components/common/enums/API";
import Footer from "./components/common/module/footer";

type Inputs = {
  question: string;
  exampleRequired?: string;
};

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("input content : " + JSON.stringify(data));
    fetch(`${API.SERVER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.answer))
      .catch((error) => console.log("error:", error));
  };
  console.log(watch("question")); //모니터링, 상태 값이 변하면 찍어줌

  return (
    <div className="">
      <div className="px-6 pt-14 lg:px-8">
        <img
          aria-hidden="true"
          src="/backgrounds/425x425_bg02.svg"
          className="absolute right-0 top-0 transform scale-125 pointer-events-none"
        />
        <img
          aria-hidden="true"
          src="/backgrounds/425x425_bg02.svg"
          className="absolute -left-20 -bottom-24 transform pointer-events-none"
        />
        <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover, Chat, Connect.
            </h1>
            <p className="mt-6 text-3xl leading-8">Unlock your moments.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="flex items-center gap-2 text-white py-2 px-4 w-36 h-12 shadow-md hover:bg-purple-300 focus:outline-none focus:ring-2 dark:focus:ring-pink-300 focus:ring-purple-300">
                <img
                  alt="Logo"
                  src="/logo/logo.png"
                  className="h-8 w-auto hidden dark:block"
                />
                <img
                  alt="Logo"
                  src="/logo/favicon.ico"
                  className="h-8 w-auto dark:hidden"
                />
                Get started
              </button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        ></div>
      </div>
      <Footer />
    </div>
  );
}
