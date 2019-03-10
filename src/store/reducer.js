import { combineReducers } from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  SET_LOGIN_STATUS
} from './action';

const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function authFilter(state = {
  loginStatus: true
}, action) {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, ...{ loginStatus: action.loginStatus } };
    default:
      return state;
  }
}

// function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   };
// }

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  authFilter
});

// const reducer = combineReducers({
//   a: doSomethingWithA,
//   b: processB,
//   c: c
// })
// 上边这种方法等价于下边这种方法，reducer的名称对应传入到reducer方法的state参数
// function reducer(state = {}, action) {
//   return {
//     a: doSomethingWithA(state.a, action),
//     b: processB(state.b, action),
//     c: c(state.c, action)
//   }
// }

export default todoApp;
