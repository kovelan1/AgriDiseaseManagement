import { navigationsAI,navigationsFarmer,navigationsSuper } from "app/navigations";
import { SET_USER_NAVIGATION } from "../actions/NavigationAction";
import { authRoles } from "../../auth/authRoles"
import localStorageService from "../../services/localStorageService"
// var initialState=null;

if(authRoles.farmer){
  console.log("admin")
  //  initialState = [...navigationsAI];
}else{
  console.log("farmer")
  //  initialState = [...navigationsFarmer];
}

const initialState = [...navigationsAI];

const NavigationReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAVIGATION: {
      return [...action.payload];
    }
    default: {
      var user = localStorageService.getItem("auth_user")
      if(user && user.role=="ROLE_farmer"){
        console.log("farmer")
        return [...navigationsFarmer];
        //  initialState = [...navigationsAI];
      }else{
        if(user && user.role=="ROLE_superadmin"){
          console.log("superadmin")
          return [...navigationsSuper];
          //  initialState = [...navigationsAI];
        }else{
          console.log("admin")
          return [...navigationsAI];
          //  initialState = [...navigationsFarmer];
        }
       
      }
      
    }
  }
};

export default NavigationReducer;
