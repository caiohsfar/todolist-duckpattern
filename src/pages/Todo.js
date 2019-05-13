import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, remove, select } from '../store/ducks/todo';

export class Todo extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.input.value) {
      this.props.add(this.input.value);
      this.input.value = '';
    }
  }
  onPressRemove = () => {
    const selecteds = this.getSelecteds();
    if (!selecteds.length > 0 ) {
      return;
    }
    selecteds.forEach(todo => {
      this.props.remove(todo.id);
    });
  }
  onPressSelect = (id) => {
    this.props.select(id)
  }
  getSelecteds = () => {
    return this.props.todos.filter(todo => todo.selected);
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="input-group col-6" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Todo name"
              ref={el => this.input = el}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="submit" id="button-addon2">
                Add
              </button>
              <button className={`btn btn-${this.getSelecteds().length === 0 ? 'secondary' : 'danger'} btn-sm`} onClick={this.onPressRemove}>
                  Delete
              </button>
            </div>
          </form>
        </div>
        <div className="row justify-content-center">
          <ul className="list-group">
            {this.props.todos.map((todo) => (
                <li style={{backgroundColor: todo.selected ? 'pink': '#fff'}} key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {todo.name}
                  <button style={{marginLeft: 20}} className="btn btn-primary btn-sm" onClick={() => this.onPressSelect(todo.id)}>
                    Select
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.todo.todos)
  return {
    todos: state.todo.todos
  }
}


export default connect(mapStateToProps, {add, remove, select })(Todo)
