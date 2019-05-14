// Types
export const Types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    SELECT: 'SELECT',
    ON_EDIT: 'ON_EDIT',
    EDIT: 'EDIT'
};

// Reducer

const INITIAL_STATE = {
    todos: []
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.ADD:
            return {
                ...state, todos: [...state.todos, { id: Math.random(), name: action.payload, selected: false, onEdit: false }]
            }
        case Types.REMOVE:
            return {
                ...state, todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case Types.SELECT:
            return {
                ...state,
                todos: state.todos
                    .map(todo => todo.id === action.payload
                        ? { ...todo, selected: !todo.selected } 
                        : todo )
            }
        case Types.ON_EDIT:
            return {
                ...state,
                todos: state.todos
                .map(todo => todo.id === action.payload
                    ? { ...todo, onEdit: !todo.onEdit } 
                    : todo )
            }
        case Types.EDIT:
            return {
                ...state,
                todos: state.todos
                .map(todo => todo.id === action.payload.id
                    ? { ...todo, name: action.payload.name } 
                    : todo )
            }
        default:
            return state;
    }
}
  
// Action Creators

export function add(name) {
    return {
      type: Types.ADD,
      payload: name,
    }
}

export function remove(id) {
    return  {type: Types.REMOVE, payload: id }
}

export function select(id) {
    return {
        type: Types.SELECT,
        payload: id
    }
}
export function onEdit(id) {
    return {
        type: Types.ON_EDIT,
        payload: id
    }
}
export function edit(id, name) {
    return {
        type: Types.EDIT,
        payload: {id, name}
    }
}
