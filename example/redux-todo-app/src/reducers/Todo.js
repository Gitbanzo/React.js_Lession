import * as types from '../constants/TodoTypes';

const initialState = {
  todos: []
};

const todo = (state = initialState, action) => {
  switch (action.type) {
    case types.TODO_FETCH:
      return Object.assign({}, state, {todos: action.values});
    case types.TODO_CREATE:
      const newTodo = Object.assign({}, action.value, {
        id: (state.todos.length + 1)
      });
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          newTodo
        ]
      });
    case types.TODO_DESTORY:
      return Object.assign({}, state, {
        todos: state.todos.filter(todo => todo.id !== Number(action.value.id))
      });
    case types.TODO_DONE:
      return Object.assign({}, state, {
        todos: state.todos.map(todo => {
          if (todo.id === Number(action.value.id)) {
            todo.done = !todo.done;
          }
          return todo;
        })
      });
    default:
      return state;
  }
};

export default todo;
