import React, {Component} from 'react';

const Style = {
  done: {
    textDecoration: 'line-through',
    opacity: 0.5
  }
}

const FilterType = {
  ALL: 'ALL',
  DONE: 'DONE',
  UNDONE: 'UNDONE'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      todos: [
        {
          id: 1,
          title: 'React.js学習する',
          done: false,
          disabled: false
        }, {
          id: 2,
          title: 'Fluxとはなんぞや？',
          done: true,
          disabled: false
        }, {
          id: 3,
          title: 'Reduxだと？',
          done: false,
          disabled: false
        }
      ],
      filterType: FilterType.UNDONE
    }
    this._renderTodo = this._renderTodo.bind(this);
    this._onDone = this._onDone.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._getTodos = this._getTodos.bind(this);
    this._onFilter = this._onFilter.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._todosToMap = this._todosToMap.bind(this);
  }

  _onChange(e) {
    this.setState({title: e.target.value});
  }

  _onSubmit(e) {
    e.preventDefault();
    const {todos, title} = this.state;
    const newTodos = todos.concat([
      {
        id: (todos.length + 1),
        title: this.state.title,
        done: false,
        disabled: false
      }
    ]);
    this.setState({title: '', todos: newTodos});
  }

  _onDone(e) {
    const todos = this._todosToMap(e.target.value, (todo) => {
      todo.done = !todo.done;
      return todo;
    });
    this.setState(todos);
  }

  _onDelete(e) {
    const todos = this._todosToMap(e.target.value, (todo) => {
      todo.disabled = !todo.disabled;
      return todo;
    });
    this.setState(todos);
  }

  _todosToMap(id, toMap) {
    const todos = this.state.todos.filter(todo => todo.id === Number(id)).map(todo => toMap(todo));
    return this.state.todos.filter(todo => todo.id !== Number(id)).concat(todos);
  }

  _renderTodo(todo) {
    if (todo.disabled) {
      return null;
    }
    return (
      <tr key={todo.id}>
        <td><input
          type="checkbox"
          name="done"
          checked={todo.done}
          value={todo.id}
          onChange={this._onDone}/></td>
        <td style={todo.done
          ? Style.done
          : {}}>{todo.title}</td>
        <td>
          <button
            value={todo.id}
            onClick={this._onDelete}
            className="btn btn-mini btn-danger">Delete</button>
        </td>
      </tr>
    )
  }

  _getTodos() {
    const {todos, filterType} = this.state;
    switch (filterType) {
      case FilterType.DONE:
        return todos.filter(todo => todo.done === true);
      case FilterType.UNDONE:
        return todos.filter(todo => todo.done === false);
      case FilterType.ALL:
      default:
        return todos;
    }
  }

  _onFilter(e) {
    this.setState({filterType: e.target.value});
  }

  render() {
    const {title, filterType} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <blockquote>
              <h1>ADD TODO</h1>
            </blockquote>
            <form className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Input title..."
                  value={title}
                  onChange={this._onChange}/>
              </div>
              <button className="btn btn-primary" onClick={this._onSubmit}>Submit</button>
            </form>
            <hr/>
            <blockquote>
              <h2>TODO List&nbsp;
                <span className="label label-info">{filterType}</span>
                <div className="pull-right">
                  <button
                    value={FilterType.ALL}
                    onClick={this._onFilter}
                    className="btn btn-default btn-mini">ALL</button>
                  <button
                    value={FilterType.DONE}
                    onClick={this._onFilter}
                    className="btn btn-default btn-mini">DONE</button>
                  <button
                    value={FilterType.UNDONE}
                    onClick={this._onFilter}
                    className="btn btn-default btn-mini">UNDONE</button>
                </div>
              </h2>
            </blockquote>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Done?</th>
                  <th>Title</th>
                  <th>Control</th>
                </tr>
              </thead>
              <tbody>
                {this._getTodos().sort((a, b) => {
                  if (a.id < b.id) {
                    return -1;
                  }
                  if (a.id > b.id) {
                    return 1;
                  }
                  return 0;
                }).map(todo => this._renderTodo(todo))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
