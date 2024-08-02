import instance from "@/app/components/common/configs/axios-config";
import { ISse } from "../model/issue";

export const findAllIssuesAPI = async (page: number) => {
  try {
    const response = await instance().get("issues/all", {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findIssueByIdAPI = async (id: number) => {
  try {
    const response = await instance().get(`issues/${id}`, {
      params: { id },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findCountIssuesAPI = async () => {
  try {
    return (await instance().get(`/issues/count`)).data;
  } catch (error) {
    return error;
  }
};

export const saveIssueAPI = async (issue: ISse) => {
  console.log(`parameter in saveIssue: ${JSON.stringify(issue)}`);
  try {
    return (await instance().post(`issues/save`, issue)).data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteIssueAPI = async (id: number) => {
  try {
    await instance().delete(`/issues/{id}`, {
      params: { id },
    });
  } catch (error) {
    return error;
  }
};

export const modifyIssueAPI = async (id: number) => {
  try {
    await instance().put(`/issues/{id}`, {
      params: { id },
    });
  } catch (error) {
    return error;
  }
};

export const createEventSource = (url: string, onMessage: (data: any) => void) => {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
  };

  eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
  };

  return eventSource;
};