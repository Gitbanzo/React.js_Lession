import * as types from '../constants/TodoTypes';
import TodoApiClient from '../services/TodoApiClient';

export const fetch = () => {
  return {type: types.TODO_FETCH, values: TodoApiClient.fetch().data};
};

export const create = ({title}) => {
  return {type: types.TODO_CREATE, value: TodoApiClient.create(title).data};
};

export const destory = (id) => {
  return {type: types.TODO_DESTORY, value: TodoApiClient.destory(id).data};
};

export const done = (id) => {
  return {type: types.TODO_DONE, value: TodoApiClient.done(id).data};
};
