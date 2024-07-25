'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { parseCookies } from "nookies";
import UserCard from "@/app/atoms/card/UserCard";
import { IUser } from "@/app/components/user/model/user";
import { API } from "@/app/components/common/enums/API";
import { useRouter } from "next/navigation";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const token = parseCookies().accessToken;
  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get(`${API.SERVER}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("User data is not an array", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    loadUsers();
  }, [token]);

  const handleChatClick = (userId: number) => {
    router.push(`/chat/${userId}`);
  };

  return (
    <div className="overflow-y-auto h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 mb-8 pl-12 text-2xl">친구 리스트</div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {users.length === 0 ? (
            <p className="mt-10">친구가 존재하지 않습니다.</p>
          ) : (
            users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={() => user.id && handleChatClick(user.id)}
                showImage={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;

// 'use client';
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { parseCookies } from "nookies";
// import UserCard from "@/app/atoms/card/UserCard";
// import { IUser } from "@/app/components/user/model/user";
// import { API } from "@/app/components/common/enums/API";

// const UserList: React.FC = () => {
//   const dispatch = useDispatch();
//   const token = parseCookies().accessToken;
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const response = await axios.get(`${API.SERVER}/all`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (Array.isArray(response.data)) {
//           setUsers(response.data);
//         } else {
//           console.error("User data is not an array", response.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch users", error);
//       }
//     };
//     loadUsers();
//   }, [token]);

//   const handleProductSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedUserId = Number(event.target.value);
//     const selectedUser = users.find((user) => user.id === selectedUserId);
//     if (selectedUser) {
//       setSelectedUserId(selectedUserId);
//     }
//   };

//   return (
//     <div className=" overflow-y-auto h-screen">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <div className="mt-6 mb-8 pl-12 text-2xl">친구 리스트</div>
//         <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
//           {users.length === 0 ? (
//             <p className="mt-10">친구가 존재하지 않습니다.</p>
//           ) : (
//             users.map((user) => (
//               <UserCard key={user.id} user={user} onSelect={handleProductSelect} showImage={true} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;
