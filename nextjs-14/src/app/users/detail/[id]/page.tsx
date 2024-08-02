"use client";

import { API } from "@/app/components/common/enums/API";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "@/app/components/user/service/user-slice";
import {
  updateUser,
  deleteUser,
  findUserByEmail,
} from "@/app/components/user/service/user-service";
import { IUser } from "@/app/components/user/model/user";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "@/app/components/common/module/footer";

export default function UserDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = parseCookies().accessToken;
  const [showImage, setShowImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const user: IUser = useSelector(getUserById);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("decoded: ", decoded);
        dispatch(findUserByEmail(decoded.sub));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token is missing");
    }

    // if (token !== "" && user?.id) {
    //       console.log("user id in Mypage : " + decoded.id);
    //       fetch(`${API.SERVER}/${user.id}`, {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${parseCookies().accessToken}`,
    //         },
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           console.log("Fetched data: ", data);
    //           reset(data);
    //         })
    //         .catch((error) => console.log("error: ", error));
    //     }

    if (user?.profile !== null && user?.profile !== undefined) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  }, [dispatch, reset, user?.id]);

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    try {
      dispatch(updateUser(data) as any); //TODO check this
      alert("Update success.");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }
  };

  const deleteHandler = () => {
    if (user.id) {
      if (confirm("Are you sure you want to delete your account?")) {
        dispatch(deleteUser(user.id))
          .then((res: any) =>
            res.payload.status === 200
              ? alert("Delete failed")
              : alert("Delete success")
          )
          .catch((error: any) => alert("Delete failed"))
          .finally(() => {
            destroyCookie(null, "accessToken");
            router.push(`/`);
          });
      }
    }
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0 gap-10">
      <div
        className="mt-28 w-[54vh] h-[67vh] flex rounded-[3.5vh] shadow-2xl overflow-x-auto"
        style={{ backgroundColor: "var(--form-background)" }}
      >
        <div className="w-full p-[8.5vh] justify-center items-center">
          {showImage && (
            <img
              className="w-32 h-32 rounded-full object-cover"
              src={user?.profile || ""}
            ></img>
          )}
          {!showImage && (
            <AccountCircleIcon
              sx={{ fontSize: 145, color: "var(--profile)" }}
            />
          )}
          <p className="text-3xl font-bold dark:light:text-gray-700 mb-20 mt-7">
            {user?.name || ""}
          </p>
          <div className="mt-6 w-full grid grid-cols-2 mb-10 gap-y-7">
            <div>
              <p className="light:text-gray-700 font-bold">Email</p>
              <p>{user?.email || ""}</p>
            </div>
            <div>
              <p className="light:text-gray-700 font-bold">Name</p>
              <p>{user?.name || ""}</p>
            </div>
            <div>
              <p className="light:text-gray-700 font-bold">Phone</p>
              <p>{user?.phone || ""}</p>
            </div>
            <div>
              <p className="light:text-gray-700 font-bold">Age</p>
              <p>{user?.age || ""}</p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[73vh] h-[67vh]">
        <div className="w-full p-[8.5vh] justify-center items-center overflow-y-auto">
          <p className="text-xl font-bold light:text-gray-700 mb-20 text-center">
            Update info
          </p>
          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Email
            </label>
            <input
              type="text"
              className="h-[6vh] light:text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              className="h-[6vh] light:text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("password")}
            />
          </div>

          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              className="h-[6vh] light:text-gray-700 light:bg-gray-200 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-none"
              value={user?.name || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Phone
            </label>
            <input
              type="text"
              className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("phone")}
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700  text-sm mb-2">
              Age
            </label>
            <input
              type="text"
              className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("age")}
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700  text-sm mb-2">
              Sex
            </label>
            <input
              type="text"
              className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("gender")}
            />
          </div>
          <div className="flex justify-center mt-10">
            <button type="submit">Save changes</button>
          </div>
          <div
            onClick={deleteHandler}
            className="cursor-pointer mt-6 static text-xs light:text-gray-500 text-center w-full"
          >
            Delete account
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}
