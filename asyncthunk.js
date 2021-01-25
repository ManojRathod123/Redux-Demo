// Async Action creator.
// Redux Thunk= The thunk can be used to delay the dispatch of an action,
// This is a one kind of middleware and this return the function instead of an action.
// Axios => user to request end point.

const Redux = require("redux");
const createStore = Redux.createStore;
const applyMiddleware = Redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

// create initial state
const initialState = {
  loading: false,
  user: [],
  error: "",
};

// create Action Type:- three types of action 1-REQUEST 2-SUCCESS 3-ERROR
const USER_REQUEST = "USER_REQUEST";
const USER_SUCCESS = "USER_SUCCESS";
const USER_ERROR = "USER_ERROR";

// Action creator:
const userRequest = () => {
  return {
    type: USER_REQUEST,
  };
};

const userSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users,
  };
};
const userError = (error) => {
  return {
    type: USER_ERROR,
    payload: error,
  };
};

// create Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "USER_ERROR":
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchuser = () => {
  return function (dispatch) {
    dispatch(userRequest());
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((responce) => {
        // console.log(responce.data)
        //responce. data
        // map():- function call the each array element and create the new array with result of function.
        const users = responce.data.map(user=> ({ id:user.id,name: user.name,email:user.email}));
        dispatch(userSuccess(users));
      })
      .catch((error) => {
        // console.log('somthing went wrong',error)
        dispatch(userError(error.msg));
      });
  };
};

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log("initial value", store.getState());
});
store.dispatch(fetchuser());
