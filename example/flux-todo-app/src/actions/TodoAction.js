import {dispatch} from '../dispatcher/TodoDispatcher';
import TodoApiClient from '../services/TodoApiClient';
import TodoConstants from '../constants/TodoConstants';
const types = TodoConstants.types;

export default {
  fetch() {
    return TodoApiClient.fetch().then(res => dispatch({
      type: types.TODO_FETCH,
      todos: res.data
    }));
  },
  create(todo) {
    return TodoApiClient.create(todo).then(res =>
     dispatch({
      type: types.TODO_CREATE,
      todo: res.todo
    }));
  },
  delete(id) {
    return TodoApiClient.delete(id).then(res =>
     dispatch({
      type: types.TODO_DELETE,
      id: res.id
    }));
  },
  done(id) {
    return TodoApiClient.done(id).then(res =>
     dispatch({
      type: types.TODO_DONE,
      id: res.id
    }));
  },
};
