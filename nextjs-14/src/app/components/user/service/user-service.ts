import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  findAllUsersAPI,
  findUserByIdAPI,
  loginAPI,
  existsUsernameAPI,
  existsEmailAPI,
  logoutAPI,
  updateUserAPI,
  deleteUserAPI,
  joinAPI,
  oAuthAPI,
  updateUserPointAPI,
  findUserByEmailAPI
} from "./user-api";
import { IUser } from "../model/user";
import instance from "../../common/configs/axios-config";

export const findAllUsers: any = createAsyncThunk(
  "users/findAllUsers",
  async (page: number) => await findAllUsersAPI(page)
);

export const findUserById: any = createAsyncThunk(
  "users/findById",
  async (id: number) => {
    console.log("ID 확인:", id); // id 값 확인
    try {
      const response = await findUserByIdAPI(id);
      console.log("API 응답:", response); // API 응답 확인
      return response;
    } catch (error) {
      console.error("API 호출 오류:", error); // 오류 로그 확인
      throw error;
    }
  }
);

export const findUserByEmail: any = createAsyncThunk(
  "users/findByEmail",
  async (email: string) => {
    const data = await findUserByEmailAPI(email);
    console.log(data);
    return data;
  }
);

export const login: any = createAsyncThunk(
  "users/login",
  async (user: IUser) => await loginAPI(user)
);

export const join: any = createAsyncThunk(
  "users/join",
  async (user: IUser) => await joinAPI(user)
);

export const oAuth: any = createAsyncThunk(
  "users/oAuth",
  async (user: IUser) => await oAuthAPI(user)
);

export const existsUsername: any = createAsyncThunk(
  "users/existsUsername",
  async (username: string) => {
    const data = await existsUsernameAPI(username);
    console.log(data);
    return data;
  }
);

export const existsEmail: any = createAsyncThunk(
  "users/existsEmail",
  async (email: string) => {
    const data = await existsEmailAPI(email);
    console.log(data);
    return data;
  }
);

export const logout: any = createAsyncThunk(
  "users/logout",
  async () => await logoutAPI()
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (data: IUser) => {
    try {
      const response = await instance().put(`/{id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
);

export const deleteUser: any = createAsyncThunk(
  "users/delete",
  async (id: number) => await deleteUserAPI(id)
);

export const updateUserPoint: any = createAsyncThunk(
  "users/updateUserPoint",
  async (data: IUser) => {
    try {
      const response = await instance().put(`/modifyPoint`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating user point:", error);
      throw error;
    }
  }
);
