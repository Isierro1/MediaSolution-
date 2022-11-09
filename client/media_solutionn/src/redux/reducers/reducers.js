const initialState = {
    users: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_DOGS":
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
  
      case "GET_DOGS_NAME":
          return {
              ...state,
              dogs: action.payload
          };  
  
      case "GET_DETAIL":
        return {
          ...state,
          detail: action.payload
        }
        
        case "CLEAR_DETAIL":
          return {
            ...state,
            detail: []
          }
  
      case "REGISTER":
          return {
              ...state
          }

          case "LOGIN":
          return {
              ...state
          }
              
      case "GET_TEMPERAMENTS":
        return {
          ...state,
          temperaments: action.payload,
          allTemperaments: action.payload,
        };
  
      case "FILTER_CREATED":
        let allDogs = state.allDogs;
        let createdFilter =
          action.payload === "created"
            ? allDogs.filter((el) => el.createdInDb)
            : allDogs.filter((el) => !el.createdInDb);
        return {
          ...state,
          dogs: action.payload === "all" ? state.allDogs : createdFilter,
        };
  
      case "FILTER_BY_TEMPERAMENT":
        let allDogss = state.allDogs;
        let filter =
          action.payload === "all"
            ? allDogss
            : allDogss.filter((el) => el.temperaments?.includes(action.payload));
        return {
          ...state,
          dogs: filter,
        };
  
      case "ORDER_BY_NAME":
        let sorted =
          action.payload === "asc_name"
            ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: sorted,
        };
  
      case "ORDER_BY_WEIGHT":
        let sorted2 =
          action.payload === "asc_weight"
            ? state.dogs.sort(function (a, b) {
                if (Number(a.weightMin) > Number(b.weightMin)) {
                  return 1;
                }
                if (Number(a.weightMin) < Number(b.weightMin)) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (Number(a.weightMin) > Number(b.weightMin)) {
                  return -1;
                }
                if (Number(a.weightMin) < Number(b.weightMin)) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: sorted2,
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  