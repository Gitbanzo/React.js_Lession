import {
  ReduceStore
} from 'flux/utils';
import dispatcher from '../dispatcher/TodoDispatcher';
import TodoConstants from '../constants/TodoConstants';
const types = TodoConstants.types;

class TodoStore extends ReduceStore {

  getInitialState() {
    return {
      todos: []
    };
  }

  reduce(state, action) {
    switch(action.type) {
      case types.TODO_FETCH:
        return Object.assign({}, state, {
          todos: [
                  ...action.todos, ...state.todos
               ]
        });
      case types.TODO_CREATE:
        const newTodo = Object.assign({}, action.todo, {
          id: (state.todos.length + 1)
        });
        return Object.assign({}, state, {
          todos: [
                   ...state.todos, newTodo
          ]
        });
      case types.TODO_DELETE:
        return Object.assign({}, state, {
          todos: state.todos.filter(todo => todo.id !== Number(
            action.id))
        });
      case types.TODO_DONE:
        return Object.assign({}, state, {
          todos: state.todos.map(todo => {
            if(todo.id === Number(action.id)) {
              todo.done = !todo.done;
            }
            return todo;
          })
        });
      default:
        return state;
    }
  }
}
export default new TodoStore(dispatcher);
