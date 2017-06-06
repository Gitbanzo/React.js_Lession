import React, {Component} from 'react';
import Form from './components/Form';
import Table from './components/Table';

import {Container} from 'flux/utils';
import TodoAction from './actions/TodoAction';
import TodoStore from './stores/TodoStore';

class App extends Component {

  static getStores() {
    return [TodoStore];
  }

  static calculateState() {
    return TodoStore.getState();
  }

  constructor(props) {
    super(props);
    this._onDone = this._onDone.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  componentWillMount() {
    TodoAction.fetch();
  }

  _onSubmit(todo) {
    TodoAction.create(todo);
  }

  _onDone(id) {
    TodoAction.done(id);
  }

  _onDelete(id) {
    TodoAction.delete(id);
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

export default Container.create(App);
