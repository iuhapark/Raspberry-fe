"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useParams } from "next/navigation";
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
  const { userId } = useParams();
  const token = parseCookies().accessToken;
  const [user, setUser] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Alice",
      text: "야야 모하냐 모하냐!",
      time: "14:26",
      avatar:
        "https://shore-molybdenum-274.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffbf9e931-f803-4042-ad0f-48224818e025%2Feb46381e-21f8-4332-b04d-7434559b4925%2F1c252d11-2cf0-498f-b81e-0c7c0ffbd0cf.png?table=block&id=c72cff10-4125-4cc5-8e16-0981defe6595&spaceId=fbf9e931-f803-4042-ad0f-48224818e025&width=780&userId=&cache=v2",
    },
    {
      id: 2,
      user: "You",
      text: "뭐가무가뭐가아아아아아ㅏ",
      time: "14:30",
      avatar:
        "https://shore-molybdenum-274.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffbf9e931-f803-4042-ad0f-48224818e025%2Feb46381e-21f8-4332-b04d-7434559b4925%2F1c252d11-2cf0-498f-b81e-0c7c0ffbd0cf.png?table=block&id=c72cff10-4125-4cc5-8e16-0981defe6595&spaceId=fbf9e931-f803-4042-ad0f-48224818e025&width=780&userId=&cache=v2",
      sentByMe: true,
    },
    {
      id: 1,
      user: "Alice",
      text: "밖에 비온다 비와",
      time: "14:32",
      avatar:
        "https://shore-molybdenum-274.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffbf9e931-f803-4042-ad0f-48224818e025%2Feb46381e-21f8-4332-b04d-7434559b4925%2F1c252d11-2cf0-498f-b81e-0c7c0ffbd0cf.png?table=block&id=c72cff10-4125-4cc5-8e16-0981defe6595&spaceId=fbf9e931-f803-4042-ad0f-48224818e025&width=780&userId=&cache=v2",
    },
    {
      id: 1,
      user: "Alice",
      text: "비 싫다ㅍㅠ",
      time: "15:09",
      avatar:
        "https://shore-molybdenum-274.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffbf9e931-f803-4042-ad0f-48224818e025%2Feb46381e-21f8-4332-b04d-7434559b4925%2F1c252d11-2cf0-498f-b81e-0c7c0ffbd0cf.png?table=block&id=c72cff10-4125-4cc5-8e16-0981defe6595&spaceId=fbf9e931-f803-4042-ad0f-48224818e025&width=780&userId=&cache=v2",
    },
  ]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false); // Adding a sending state to prevent duplicate sends

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API.SERVER}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API.SERVER}/messages/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchUser();
    fetchMessages();
  }, [userId, token]);

  const addMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      user: "You",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "/path/to/your-avatar.png",
      sentByMe: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSend = async () => {
    if (message.trim() && !sending) {
      setSending(true); // Set sending state to true to prevent duplicate sends
      const tempMessage = message;
      setMessage(""); // Clear the input field immediately to prevent double sending

      addMessage(tempMessage);

      try {
        await axios.post(
          `${API.SERVER}/messages`,
          { userId, message: tempMessage },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to send message", error);
      } finally {
        setSending(false); // Reset sending state after completion
      }
    }
  };

  return (
    <div className="flex justify-center h-screen w-full">
      <div
        className="mt-28 w-[73vh] h-[80vh] flex rounded-[3.5vh] shadow-2xl"
        style={{ backgroundColor: "var(--form-background)" }}
      >
        <div className="w-full p-[8.5vh] justify-center items-center">
          <div className="flex flex-col h-full overflow-hidden">
            {/* ChatHeader */}
            <div className="flex items-center justify-between p-4 bg-none">
              <h2 className="text-lg font-semibold">Chat with {user?.name}</h2>
              <button className="btn btn-sm btn-icon btn-light btn-clear">
                <i className="ki-filled ki-cross">hi</i>
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-col flex-grow p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-3.5 px-5 ${
                    msg.sentByMe ? "justify-end" : ""
                  }`}
                >
                  {!msg.sentByMe && (
                    <img
                      alt=""
                      className="rounded-full avatar"
                      src={msg.avatar}
                    />
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
                    <img
                      alt=""
                      className="rounded-full avatar"
                      src={msg.avatar}
                    />
                  )}
                </div>
              ))}
            </div>

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
                    <PaperClipIcon className="text-black" />
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
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
