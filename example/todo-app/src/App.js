import React, {Component} from 'react';
import Form from './components/Form';
import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ]
    }
    this._onDone = this._onDone.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _onSubmit(todo) {
    const {todos} = this.state;
    const newTodos = todos.concat([Object.assign({}, todo, {
        id: (todos.length + 1)
      })]);
    this.setState({todos: newTodos});
  }

  _onDone(id) {
    const todos = this.state.todos.map(todo => {
      if(todo.id === Number(id)){
       todo.done = !todo.done;
      }
      return todo;
    });
    this.setState(todos);
  }

  _onDelete(id) {
    const todos = this.state.todos.map(todo => {
      if(todo.id === Number(id)){
       todo.disabled = !todo.disabled;
      }
      return todo;
    });
    this.setState(todos);
  }

  render() {
    const {todos} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <blockquote>
              <h1>ADD TODO</h1>
            </blockquote>
            <Form onSubmit={this._onSubmit}/>
            <hr/>
            <Table todos={todos} onDone={this._onDone} onDelete={this._onDelete}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
