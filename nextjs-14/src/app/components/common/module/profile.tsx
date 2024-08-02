"use client";

import { API } from "@/app/components/common/enums/API";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { findUserByEmail, findUserById, login, logout } from "../../user/service/user-service";
import { getUserById } from "../../user/service/user-slice";
import { IUser } from "../../user/model/user";
import { PG } from "../enums/PG";
import { jwtDecode } from "jwt-decode";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IssueList from "../../issue/module/IssueList";
import ThemeIcon from "../../theme/ThemeButton";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;

  useEffect(() => {
    const token = parseCookies().accessToken;
    console.log("Token in Profile:", token);
  
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

    if (token !== "") {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [parseCookies().accessToken]);

  const profileHandler = () => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("User id in Profile:", decoded.id);
        dispatch(findUserById(decoded.id));
        fetch(`${API.SERVER}/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parseCookies().accessToken}`,
          },
        });
        if (user?.profile !== null && user?.profile !== undefined) {
          setShowImage(false);
        } else {
          setShowImage(true);
        }
        router.push(`${PG.USER}${PG.DETAIL}/${decoded.id}`);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push(`${PG.USER}/login`);
      }
    } else {
      router.push(`${PG.USER}/login`);
    }
  };

  const logoutHandler = () => {
    console.log("Before logout:", parseCookies().accessToken);
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null, "accessToken");
        setShowProfile(false);
        router.push("/");
        console.log("After logout:", parseCookies().accessToken);
      })
      .catch((err: any) => {
        console.log("Error occurred when executing logout.: " + err);
      });
  };

  return (
    <nav className="z-50">
      <div className="-m-1.5 p-1.5 flex items-center gap-2">
        <Menu as="div" className="relative z-20">
          <MenuButton className="w-8 h-8 bg-transparent rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 shadow-none transition-none bg-none p-0 m-0 flex items-center justify-center">
            <span className="sr-only">Open notifications menu</span>
            <BellIcon
              aria-hidden="true"
              className="h-6 w-6 light:text-gray-700"
            />
          </MenuButton>
          <MenuItems
            transition
            className="absolute  right-0 top-full mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            style={{ backgroundColor: "var(--form-background)" }}
          >
            <MenuItem>
              <IssueList  />
            </MenuItem>
          </MenuItems>
        </Menu>

        {showProfile && (
          <Menu as="div" className="relative z-20">
            <MenuButton className="w-10 h-10 bg-transparent rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 shadow-none transition-none bg-none p-0 m-0 flex items-center justify-center">
              <span className="sr-only">Open user menu</span>
              {token ? (
                token && showImage ? (
                  <img
                    alt=""
                    src={user?.profile || ""}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  token &&
                  !showImage && (
                    <AccountCircleIcon
                      sx={{ fontSize: 30 }}
                      className="text-gray-400"
                    />
                  )
                )
              ) : (
                <UserIcon className="h-6 w-6 light:text-gray-700" />
              )}
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  onClick={profileHandler}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Your Profile
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Sign out
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
      </div>
    </nav>
  );
}
