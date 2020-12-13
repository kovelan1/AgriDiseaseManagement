import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
  
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from "@material-ui/core/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {chkToken} from "../../services/api-services"
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import PostData from "./PostData"
import qs from 'qs';
import { FcGoogle} from "react-icons/fc";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    agreement: "",
    errorMgs:"AGSjk kjasdka",
  };


  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  getStatsCode(){
  
    var params={
    username:this.state.email,
    password:this.state.password,
    grant_type: 'password'
  }

  let resStatus = 0
  chkToken(params).then(res=>{
    
    if(!res.ok) throw new Error(res.status);
    else return res.json();

    console.log(res.status)
    //resStatus=res.status 
  })
  .then(response=>{
    switch (resStatus) {
      case 201:
        console.log('success')
        break
      case 400:
          console.log("chek user name")
       
        break
      case 401:
        console.log('disabled')
        break
      default:
        console.log('unhandled')
        break
    }
    console.log(response)
  })
    .catch(function(error){
      
    
    return JSON.stringify(error);
      

    })
}

   handleFormSubmit = async event => {
    // var res=chkToken(this.state.email,this.state.password)
    //   console.log(res.PromiseResult)
    
    // PostData( "http://localhost:8080/oauth/token", data).catch((error)=>{ console.error(error);})
      this.props.loginWithEmailAndPassword({ ...this.state });
     
  };
  render() {
    let { email, password } = this.state;
    let { classes } = this.props;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
        
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center items-center h-full">
                  <img src="/assets/images/illustrations/dreamer.svg" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full bg-light-gray position-relative">
                {this.props.login.error && 
          <Alert name="1" className="mb-6 w-full" severity="error" >
            Check you user name and password. Or contact admin for activation(officers only)
          </Alert>
        }
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-3 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      className="mb-3"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox checked />}
                      label="I have read and agree to the terms of service."
                    />
                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.props.login.loading}
                          type="submit"
                        >
                          Sign in to Enter Dashboard
                        </Button>
                        {this.props.login.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                      <span className="mr-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signup")
                        }
                      >
                        Sign up
                      </Button>
                    </div>
                    <Button
                      className="text-primary"
                      onClick={() =>
                        this.props.history.push("/session/forgot-password")
                      }
                    >
                      Forgot password?
                    </Button>

                    <br></br>
                    <div className="flex items-center">
                      <a href='http://localhost:8080/oauth2/authorization/google'>
                      <Button
                          className="capitalize"
                          variant="outlined"
                          color="primary"
                          startIcon={<FcGoogle />}
                        >
                          SignIn with Google
                      </Button>
                      </a>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
);
