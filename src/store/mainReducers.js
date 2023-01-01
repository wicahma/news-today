import { combineReducers } from 'redux'
import handleMainStore from './Reducers/handleMainStore';


const rootReducer = combineReducers({
    mainStore: handleMainStore,
})

export default rootReducer;
