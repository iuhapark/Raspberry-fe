import { IIssue } from "../model/issue";

export const initialState: IIssue = {
  id: 0,
  law: '',
  title: '',
  content: '',
  writerId: 0,
  boardId: 0,
  regDate: '',
  modDate: '',
  json: {},
  array: []
};
