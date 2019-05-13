// Types
export const Types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    SELECT: 'SELECT'
};

// Reducer

const INITIAL_STATE = {
    todos: []
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.ADD:
            return {
                ...state, todos: [...state.todos, { id: Math.random(), name: action.payload, selected: false }]
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