export const initialState = {
  dataUser: null,
  dataVideo: null,
  dataSearch: null,
};

export default function handleMainStore(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, dataUser: action.dataUser };
    case "DELETE_USER":
      return { ...state, dataUser: null };
    case "SET_VIDEO":
      return { ...state, dataVideo: action.dataVideo };
    case "SET_SEARCH":
      return { ...state, dataSearch: action.dataSearch };
    case "DEL_SEARCH":
      return { ...state, dataSearch: null };
    default:
      return state;
  }
}
