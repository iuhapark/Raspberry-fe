import React from "react";
import { IUser } from "@/app/components/user/model/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface UserCardProps {
  user: IUser;
  onSelect: () => void;
  showImage: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect, showImage }) => {
  const hasPicture = user?.picture !== null && user?.picture !== "";

  return (
    <div
      className="justify-center w-[40vh] h-[67vh] flex rounded-[3.5vh] shadow-2xl overflow-y-auto border-gray-100 border"
      style={{ backgroundColor: "var(--form-background)" }}
    >
      <div className="w-full p-[4.5vh] flex flex-col items-center">
        <div className="flex items-start justify-between mb-7 gap-7">
          <svg
            width="50"
            height="50"
            viewBox="0 0 85 85"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "var(--pink)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "var(--dark-purple)", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
                c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
                v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
                C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
                h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
                v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
                h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
                h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
              fill="url(#gradient1)"
            />
          </svg>
          <p className="text-2xl font-bold light:text-gray-700">
            {user?.name || ""}, {user?.age || ""}
          </p>
        </div>
        {hasPicture && showImage && (
          <img
            className="w-52 h-52 rounded-2xl object-cover"
            src={user?.picture || ""}
            alt="Profile Picture"
          />
        )}
        {!hasPicture && (
          <AccountCircleIcon sx={{ fontSize: 145, color: "var(--profile)" }} />
        )}
        <div className="grid grid-cols-1 mt-2 w-full mb-10 gap-y-7 justify-center">
          <div>
            <p className="light:text-gray-700 font-bold">Email</p>
            <p className="text-sm">{user?.email || ""}</p>
          </div>
          <div>
            <p className="light:text-gray-700 font-bold">Mobile</p>
            <p className="text-sm">{user?.phone || ""}</p>
          </div>
          <button onClick={onSelect}>채팅하기</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
