const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE' /* ACTION */
const BUY_ICECREAM = 'BUY_ICECREAM'

/* DEFINING THE ACTION - is a object with a type property */
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM
  }
}

//it's better to separate the inicialState and the reducer by actions, so it's easier to debug

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20
// }

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE: return {
//       ...state,
//       numOfCakes: state.numOfCakes - 1
//     }
//     case BUY_ICECREAM: return {
//       ...state,
//       numOfIceCreams: state.numOfIceCreams - 1
//     }
//     default: return state
//   }
// }


const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,/* COPY THE OBJECT, SO THIS WAY WE DON'T CHANGE THE OBJECT ITSELF */
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}

// for multiple reducers
const rootReducer = combineReducers({
  cake: cakeReducer, /* cakeReducer function */
  iceCream: iceCreamReducer
})


// const store = createStore(reducer) /*write this way for just one reducer */

// for multiple reducers
// applyMiddleware(logger) extra features to redux, for logging, crash reporting, performiing asynchronous
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State ', store.getState())

const unsubscribe = store.subscribe(() => { })

store.dispatch(buyCake()) /* TO MAKE A FEW MORE TRANSACTIONS, WE COPY THE ACTION TWO MORE TIMES, this is only to show in the terminal more than one transaction */
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()

// run the command node index in the terminal to see the project working
