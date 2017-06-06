import React, {PropTypes, Component} from 'react';

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

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: FilterType.ALL
    }
    this._onDone = this._onDone.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onFilter = this._onFilter.bind(this);
    this._getTodos = this._getTodos.bind(this);
    this._renderTodo = this._renderTodo.bind(this);
  }

  _onDone(e) {
    this.props.onDone(e.target.value);
  }

  _onDelete(e) {
    this.props.onDelete(e.target.value);
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
    const {todos} = this.props;
    const {filterType} = this.state;
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
    const {filterType} = this.state;
    return (
      <div className="col-8">
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
    );
  }
}

Table.propTypes = {
  todos: PropTypes.array.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Table;
