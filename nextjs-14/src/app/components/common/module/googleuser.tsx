import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { findUserByEmail } from "@/app/components/user/service/user-service";
import { setUser } from "@/app/components/user/service/user-slice";
import { RootState } from "@/redux";
import { IUser } from "@/app/components/user/model/user";

const GoogleUser = () => {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const user = useSelector((state: RootState) => state.user.json);
  const token = parseCookies().accessToken;

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        dispatch(findUserByEmail(decoded.sub));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token is missing");
    }

    setShowProfile(!!token);
  }, [token, dispatch]);

  if (!showProfile) {
    return null;
  }

  return (
    <div>
      {user ? (
        <div>
          <img src={user.profile} alt={user.name} />
          <p> {user.id || 0} </p>
          <h1>{user.name || ""}</h1>
          <p>{user.email || ""}</p>
          <p>{user.phone || ""}</p>
          <p>{user.job || ""}</p>
          <p>{user.age || ""}</p>
          <p>{user.gender || ""}</p>
          <p>{user.profile || ""}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GoogleUser;
