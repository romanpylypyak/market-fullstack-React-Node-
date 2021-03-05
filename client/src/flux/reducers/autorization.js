const initialState = {
    userToken: localStorage.getItem("token"),
    accessStatus: false,
    userName: localStorage.getItem("user")
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case 'ACCESS_STATUS':
        return { 
          ...state,
          accessStatus: action.payload
        }
      case 'CURRENT_USER':
        return { 
          ...state,
          userToken: action.payload[0],
          userName: action.payload[1]
        }
      // case 'ADMIN_LOGIN_ERROR':
      // case 'ADMIN_LOGOUT':
      //   return {
      //     ...state,
      //     token: null,
      //     isAuthenticated: false,
      //     user: null
      //   }
  
      default:
        return state
    }
  }