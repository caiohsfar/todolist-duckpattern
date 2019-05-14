import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { add, remove, select, onEdit, edit } from '../store/ducks/todo';
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faPen, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

export class Todo extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      onEdit: false,
      refs: {}
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
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
  showEditInput = (id) => {
    console.log('onpress')
    this.props.onEdit(id);
  }
  handleEdit = (id, name) => {
    console.log('handle')
    this.props.onEdit(id);
    this.props.edit(id,name)
  }
  render() {
    const refs = {};
    return (
      <div className="container">
        <div className="row justify-content-center jumbotron">
          <form className="input-group col-6" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Todo name"
              ref={el => this.input = el}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
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
          <ul className="list-group ">
            {this.props.todos.map(({ id, selected, name, onEdit }) => (
                <li style={{ backgroundColor: selected ? 'pink': '#fff', width:400}} key={id} className="list-group-item d-flex justify-content-between align-items-center">
                {onEdit ? <input type="text" placeholder="New name" ref={e => refs[id] = e} />
                  : name}
                  <div>
                    <button className="btn btn-primary btn-sm" onClick={() => this.onPressSelect(id)}>
                        <FontAwesomeIcon
                        icon={selected? faToggleOff : faToggleOn}
                        />
                    </button>
                  <button style={{ marginLeft: 10 }}
                    className="btn btn-primary btn-sm"
                    variant="primary"
                    onClick={() => {
                        onEdit ?
                        this.handleEdit(id, refs[id].value) :
                        this.showEditInput(id)
                      }}>
                        <FontAwesomeIcon
                        icon={faPen}
                        />
                    </button>
                  </div>
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


export default connect(mapStateToProps, {add, remove, select, onEdit, edit })(Todo)
