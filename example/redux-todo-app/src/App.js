import React, {Component} from 'react';
import Form from './components/Form';
import Table from './components/Table';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions/TodoAction'

class App extends Component {
  constructor(props) {
    super(props);
    this._onDone = this._onDone.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetch();
  }

  _onSubmit(todo) {
    this.props.actions.create(todo);
  }

  _onDone(id) {
    this.props.actions.done(id);
  }

  _onDelete(id) {
    this.props.actions.destory(id);
  }

  render() {
    const {todos} = this.props;
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

const mapStateToProps = state => ({todos: state.todos});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
