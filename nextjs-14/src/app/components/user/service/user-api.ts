import  instance  from "@/app/components/common/configs/axios-config";
import { IUser } from "../model/user";

export const findAllUsersAPI = async (page: number) => {
  try {
    const response = await instance().get(`/all`, {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findUserByIdAPI = async (id: number) => {
  try {
    const response = await instance().get(`/${id}`);
    console.log("MY-INFO: users/detail " + JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginAPI = async (user: IUser) => {
  console.log(`Parameter in loginAPI: ${JSON.stringify(user)}`)
  try {
    const response = await instance().post(`/login`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const joinAPI = async (user: IUser) => {
  try {
    console.log(`Parameter in joinAPI: ${JSON.stringify(user)}`)
    const response = await instance().post(`/save`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const oAuthAPI = async (user: IUser) => {
  try {
    console.log(`Parameter in oAuthAPI: ${JSON.stringify(user)}`)
    const response = await instance().post(`/oauth2/{registration}`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const existsUsernameAPI = async (username: string) => {
  try{
      const response = await instance().get(`/existsUsername`,{params: {username}})
      console.log('existsUsernameAPI resulted: '+ response.data)
      return response.data
  }catch(error){
      console.log(error)
      return error
  }
}

export const existsEmailAPI = async (email: string) => {
  try{
      const response = await instance().get(`/searchEmail`,{params: {email}})
      console.log('existsEmailAPI resulted: '+ response.data)
      return response.data
  }catch(error){
      console.log(error)
      return error
  }
}

export const logoutAPI = async () => {
  try {
    const response = await instance().get(`/logout`);
    console.log("logoutAPI resulted: " + response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserAPI = async (id: number) => {
  try {
    const response = await instance().put(`/modify`, { params: { id } });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserPointAPI = async (id: number) => {
  try {
    const response = await instance().put(`/modifyPoint`, { params: { id } });
    return response.data;
  } catch (error) {
    console.error("Error updating user z:", error);
    throw error;
  }
};


export const deleteUserAPI = async (id: number) => {
  try {
    const response = await instance().delete(`/delete`, { params: { id } });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};