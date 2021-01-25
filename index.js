// when our component initialize value and that value go into action...this process called DISPATCH
// Three principal of redux
// Store:-
// Action:-
// Reducer:-

const {redux, createStore, combineReducers, applyMiddleware} = require("redux");

// create redux store
// const createStore = redux.createStore;
// const combineReducers = redux.combineReducers
// const applyMiddleware = redux.applyMiddleware


// action type
const buy_book = "buy_book";
const buy_pens = "buy_pens";

// create state. multiple state
const intialStateBooks = {
  numberofBooks: 10,
};
const intialStatePens = {
  numberofPens: 15,
};

// we need to create one function where we will return action.
//create action: inside function we have created action. we can create multiple actions inside the function.
// wrap the funtion in single function.
function myfunction() {
  return {
    type: buy_book,
    payload: "this is my first redux code",
  };
}
function buyPens() {
  return {
    type: buy_pens,
    payload: "this is my second action",
  };
}

// here we will create reducer or define reducer.
// we can consider reducer as a shopkeeper who manage the every record of his store.
// Reducer takes two parameter(1: previousState 2: action)

const booksReducer = function (state = intialStateBooks, action) {
  switch (action.type) {
    case "buy_book":
      return {
        ...state,
        numberofBooks: state.numberofBooks - 1,
      };
    default:
      return state;
  }
};

const pensReducer = function (state = intialStatePens, action) {
  switch (action.type) {
    case "buy_pens":
      return {
        ...state,
        numberofPens: state.numberofPens - 2,
      };
    default:
      return state;
  }
};

// combine multiple 
const reducer = combineReducers({
    book:booksReducer,
    pen:pensReducer
})

// create middleware:- here store function will return next parameter and next parameter will return another parameter action.
const logger = store=>{
    return next=>{
        return action=>{
            const result = next(action)
            console.log('middleware log', result)
            return result;
        }
    }
}

// create store
const Store = createStore(reducer,applyMiddleware(logger));
console.log("initial state", Store.getState()); // here we get the initial value of state. Allow access to state via getState()
const unsubscribe = Store.subscribe(() => {
  console.log("updated state value", Store.getState());
});

// throught dispatch function we call to action creater.
Store.dispatch(myfunction());
Store.dispatch(myfunction());
Store.dispatch(myfunction());
Store.dispatch(buyPens());
Store.dispatch(buyPens());
Store.dispatch(buyPens());
unsubscribe();

// in Above example we have created spread operator.
// spread operator will create one clone of all state. it will hold the value
//Subscribe:- Adds a change listener. It will be called any time an action is dispatched.

