import React, {PropTypes, Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e) {
    this.setState({title: e.target.value});
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({title: this.state.title, done: false, disabled: false});
    this.setState({title: ''});
  }

  render() {
    const {title} = this.state;
    return (
      <div className="col-8">
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
      </div>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Form;
