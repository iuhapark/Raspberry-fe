import { createSlice } from "@reduxjs/toolkit";
import { existsUsername, existsEmail, findAllUsers, findUserById, join, login, updateUser, updateUserPoint, oAuth } from "./user-service";
import { IUser } from "../model/user";

const userThunks = [findAllUsers, findUserById];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

interface IAuth {
  message?: string;
  token?: string;
}

interface UserState {
  array?: Array<IUser>;
  json?: IUser;
  auth?: IAuth;
  existsUsername?: boolean
  existsEmail?: boolean
}
const initialState = {
  json: {} as IUser,
  array: [],
  auth: {} as IAuth,
  id: 0 as number,
  existsUsername: false,
  existsEmail: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
    state.json = action.payload;
  },
  updateUserPoint(state, action) {
    state.json.point = (state.json.point || 0) + action.payload.amount;
  },
},
  extraReducers: (builder) => {
    
    //외부의 데이터를 가져오는 경우 extra 사용
    const { pending, rejected } = status;

    builder
    .addCase(findAllUsers.fulfilled,  (state: any, { payload }: any) => { state.array=payload })
    .addCase(findUserById.fulfilled,  (state: any, { payload }: any) => { state.json=payload })
    .addCase(login.fulfilled,  (state: any, { payload }: any) => { state.auth=payload })
    .addCase(existsUsername.fulfilled,  (state: any, { payload }: any) => { state.existsUsername=payload })
    .addCase(existsEmail.fulfilled,  (state: any, { payload }: any) => { state.existsEmail=payload })
    .addCase(updateUser.fulfilled,  (state: any, { payload }: any) => { state.json=payload })
    .addCase(join.fulfilled, (state: any, { payload }: any) => { state.auth = payload })
  },
});

export const getAllUsers = (state: any) => state.user.array;
export const getUserById = (state: any) => state.user.json;
export const getMessage = (state: any) => state.user.message;
export const getAuth = (state: any) => state.user.auth;
export const getExistsUsername = (state: any) => state.user.existsUsername;
export const getExistsEmail = (state: any) => state.user.existsEmail;

// export const { updateUserPoint } = userSlice.actions;

export default userSlice.reducer;
