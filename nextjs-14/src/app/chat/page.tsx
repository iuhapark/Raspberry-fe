"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { API } from "@/app/components/common/enums/API";
import { IUser } from "@/app/components/user/model/user";
import { PaperClipIcon } from "@heroicons/react/24/outline";

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  avatar: string;
  sentByMe?: boolean;
}

const ChatRoom: React.FC = () => {
  const token = parseCookies().accessToken;
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API.SERVER}/all`);
        const users = response.data.filter((user: IUser) =>
          [101].includes(user.id!)
        );
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "1",
      text: "I have checked the features, can not wait to demo them!",
      time: "14:26",
      avatar: "/path/to/avatar1.png",
    },
    {
      id: 2,
      user: "2",
      text: "I have looked over the rollout plan, and everything seems spot on. I am ready on my end and can not wait for the user feedback.",
      time: "15:09",
      avatar: "/path/to/avatar2.png",
    },
    {
      id: 3,
      user: "You",
      text: "Haven't seen the build yet, I'll look now.",
      time: "15:52",
      avatar: "/path/to/avatar3.png",
      sentByMe: true,
    },
    {
      id: 3,
      user: "You",
      text: "Checking the build now.",
      time: "15:52",
      avatar: "/path/to/avatar3.png",
      sentByMe: true,
    },
    {
      id: 1,
      user: "1",
      text: "Tomorrow, I will send the link for the meeting",
      time: "17:40",
      avatar: "/path/to/avatar1.png",
    },
  ]);

  const [message, setMessage] = useState("");

  const addMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      user: "You",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "/path/to/avatar3.png",
      sentByMe: true,
    };
    setMessages([...messages, newMessage]);
  };

  const handleSend = () => {
    if (message.trim()) {
      addMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* ChatHeader */}
      <div className="flex bg-none">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button className="btn btn-sm btn-icon btn-light btn-clear">
          <i className="ki-filled ki-cross"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-3.5 px-5 ${
              msg.sentByMe ? "justify-end" : ""
            }`}
          >
            {!msg.sentByMe && (
              <img alt="" className="rounded-full avatar" src={msg.avatar} />
            )}
            <div className="flex flex-col gap-1.5">
              <div
                className={`bubble shadow-none flex ${
                  msg.sentByMe ? "text-light send" : "get"
                } flex-col gap-2.5 p-3 rounded-bl-none`}
              >
                <p className="bubble-text font-medium">{msg.text}</p>
              </div>
              <div
                className={`flex items-center ${
                  msg.sentByMe ? "justify-end" : ""
                } relative`}
              >
                <span className="text-2xs font-medium text-gray-600 mr-6">
                  {msg.time}
                </span>
                {msg.sentByMe && (
                  <i className="ki-filled ki-double-check text-lg absolute text-gray-400"></i>
                )}
              </div>
            </div>
            {msg.sentByMe && (
              <img alt="" className="rounded-full avatar" src={msg.avatar} />
            )}
          </div>
        ))}
      </div>

      {/* UserJoinRequest */}
      {users.map((user) => (
        <div
          key={user.id}
          className="flex gap-2 p-5 rounded-none mb-2.5"
          style={{ backgroundColor: "var(--form-background)" }}
        >
          <div className="relative shrink-0">
            <img
              alt=""
              className="rounded-full small-avatar"
              src={user.profile || ""}
            />
            <span className="badge badge-circle bg-gray-400 absolute top-7 end-0.5 ring-1 ring-light transform -translate-y-1/2"></span>
          </div>
          <div className="flex items-center justify-between gap-3 grow">
            <div className="flex flex-col">
              <div className="text-2sm mb-px">
                <a
                  className="hover:text-primary-active font-semibold text-gray-900 dark:text-white"
                  href="#"
                >
                  {user.name}
                </a>
                <span className="text-gray-600"> wants to join chat</span>
              </div>
              <span className="flex items-center text-2xs font-medium text-gray-500">
                {"1 day ago"}
                <span className="badge badge-circle bg-gray-500 size-1 mx-1.5"></span>
                {"Design Team"}
              </span>
            </div>
            <div className="flex gap-2.5">
              <button className="chat-button btn btn-light btn-xs bg-white text-black">
                Decline
              </button>
              <button className="chat-button btn btn-dark btn-xs bg-black text-white">
                Accept
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ChatInput */}
      <div className="mb-2.5 px-5">
        <div className="relative grow">
          <input
            className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2"
            placeholder="Write a message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div className="flex items-center gap-2.5 absolute right-3 top-1/2 -translate-y-1/2">
            <button
              className="btn btn-sm btn-icon btn-light btn-clear bg-none shadow-none w-6 h-6"
              onClick={handleSend}
            >
              <PaperClipIcon 
              className="text-black"/>
              <i className="ki-filled ki-exit-up"></i>
            </button>
            <button
              className="chat-button btn btn-dark btn-sm"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
