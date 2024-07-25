"use client";

import { API } from "@/app/components/common/enums/API";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageSave } from "@/app/components/post/service/post-slice";
import { savePost } from "@/app/components/post/service/post-service";
import { ThumbUpAlt, FmdGood, AttachFile } from "@mui/icons-material";
import { MyTypography } from "@/app/components/common/style/cell";
import { IPost } from "@/app/components/post/model/post";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { PG } from "@/app/components/common/enums/PG";

export default function SavePostPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const message = useSelector(getMessageSave);
  const [post, setPost] = useState({} as IPost);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>();
  const [content, setContent] = useState("");
  // const boardSelector = useSelector()

  const selectHandler = (e: any) => {
    setContent(e.target.value);
  };

  const handelCancel = () => {
    console.log("Posting Cancled");
  };

  const options = [
    { boardId: 1, title: "free", content: "자유게시판" },
    { boardId: 2, title: "qna", content: "질문게시판" },
    { boardId: 3, title: "reiviews", content: "리뷰" },
  ];

  const insertTitleHandler = (e: any) => {
    setPost({ ...post, title: e.target.value });
  };

  const insertCotentHandler = (e: any) => {
    setPost({ ...post, content: e.target.value });
  };

  // const handleChangeSelect = (e: any) => {
  //   setPost({ ...post, boardId: e.target.value })
  // }

  // const handleChangeTitle = (e: any) => {
  //   setPost({ ...post, title: e.target.value })
  // }

  // const handleChangeContent = (e: any) => {
  //   setPost({ ...post, content: e.target.value })
  // }

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    dispatch(savePost(data))
      .then((res: any) => {
        alert(`게시글 작성 완료 ${res.payload}`);
        const boardId = data.boardId;
        // router.push(`${PG.POST}/detail/${boardId}`)
        router.push(`${PG.POST}/list/${boardId}`);
      })
      .catch((err: any) => {});
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0">
      <form className="mt-28 w-[100vh] h-[73vh] flex rounded-[3.5vh] shadow-2xl overflow-y-auto">
        <div className="w-full p-[8.5vh] justify-center items-center">
          <p className="text-2xl text-center font-bold">
            Ask a question
          </p>
          <select
            {...register("boardId", { required: true })}
            id="boardId"
            className="mt-10 bg-gray-100 dark:bg-gray-100 border border-gray-300 dark:border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 "
          >
            {options.map((item, index) => (
              <option
                key={item.boardId}
                value={item.boardId}
                title={item.title}
              >
                {item.content}
              </option>
            ))}
          </select>
          <input
            {...register("writerId", { required: true })}
            type="hidden"
            value={jwtDecode<any>(parseCookies().accessToken).id}
            readOnly
          />
          <div className="mt-4">
            <input
              {...register("title", { required: true, maxLength: 50 })}
              onChange={insertTitleHandler}
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              required
              placeholder="Title"
              type="text"
              name="title"
            />
          </div>
          <div className="mt-4">
            <textarea
              {...register("content", { required: true, maxLength: 330 })}
              onChange={insertCotentHandler}
              className="h-[20vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              placeholder="Describe everything about this post here."
              name="content"
            ></textarea>
          </div>
          <div className="icons flex text-gray-500 m-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <ThumbUpAlt component={ThumbUpAlt}></ThumbUpAlt>
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <FmdGood component={FmdGood}></FmdGood>
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <AttachFile component={AttachFile}></AttachFile>
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/300
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex">
              <button
                className="m-10 btn overflow-hidden relative p-3 px-8 uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
              before:bg-blue-500 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="flex">
              <button
                className="m-10 btn overflow-hidden relative p-3 px-8 uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
              before:bg-blue-500 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
                onClick={handelCancel}
              >
                Cancle
              </button>
            </div>
          </div>
          <div className="w-full text-center items-end">
            <Link
              href="#"
              className="text-xs text-blue-500 hover:text-gray-900 w-full mt-2"
            >
              Back to the list
            </Link>
            <br />
          </div>
          <svg className="h-20"></svg>
        </div>
      </form>
    </div>
  );
}
