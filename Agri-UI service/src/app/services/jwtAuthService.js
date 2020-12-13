import axios from "axios";
import { constant } from "lodash";
import localStorageService from "./localStorageService";
import { getToken, getUser } from "./api-services"
class JwtAuthService {

  // Dummy user object just for the demo
  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {
    // getToken(email,password);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getToken(email, password));
      }, 1000);
    }).then(data => {
      // Login successful
      // Save token
      this.setSession(data.data.access_token);
      console.log(data.data.access_token);

      getUser().then(data => {
        console.log(data.data)
        this.setUser(data.data);
        return data.data;
      }).catch(

      )
      // Set user


    }).catch(error=>{
      constant.log(error)
    })
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    var user = localStorageService.getItem("auth_user");
    if (user) {
      this.setSession(user.token);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getUser());
      }, 100);
    }).then(data => {
      // Token is valid
      this.setSession(data.data.token);
      this.setUser(data.data);
      return data.data;
    });
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      console.log(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
