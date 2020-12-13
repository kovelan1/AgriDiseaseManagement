import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  RadioGroup
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { signUp } from "app/services/api-services";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";
import { red } from "@material-ui/core/colors";
import { FcGoogle} from "react-icons/fc";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    agreement: "", 
    farmer:{
      id:2,
      name:"ROLE_farmer"
    },
    role:null,
    roleSelect:"2",
    officer:{
      id:1,
      name:"ROLE_admin"
    },
    locationerror:false,
    workingLocation:null,
    address:{
      address:null,
      city:null,
      state:null,
      zip:null,
      country:null,
      lat:0,
      lng:0
      },
    provider:"local",
    coverImage:"",
    enabled:false,
    accountNonExpired:true,
    credentialsNonExpired:true,
    accountNonLocked:true,
    marker: {
      title: "The marker`s title will appear as a tooltip.",
      name: "SOMA",
      position: { lat: 37.778519, lng: -122.40564 }
    },
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    if(this.state.roleSelect=="1"){
      this.setState({
        role:{
            id:1,
            name:"ROLE_admin"
          }
        })
    }else{
      this.setState({
        role:{
          id:2,
          name:"ROLE_farmer"
        },
        enabled:true
      })
    }
    console.log(this.state)
    if(this.state.workingLocation){
      signUp(this.state).then(data=>{
        console.log(data)
        this.props.history.push("/session/signin")
      }).catch(
        
      )
    }else{
      this.setState({locationerror:true})
    }
    
  };

  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
     
      marker:
      {
        title: "",
        name: "",
        position: { lat, lng }
      },
      lat: lat,
      lng: lng
    });

     // Get address from latitude & longitude.
     Geocode.fromLatLng(lat, lng).then(
      response => {
        const AgriLocation = response.plus_code.compound_code.split(" ")[1];
        const GeoAddress = response;
        console.log(AgriLocation);
        this.setState({
          address: {
            address: GeoAddress.results[0].address_components[0].long_name,
            city: GeoAddress.results[0].address_components[1].long_name,
            state: GeoAddress.results[0].address_components[2].long_name,
            zip: null,
            country: GeoAddress.results[0].address_components[3].long_name,
            lat: latLng.lat(),
            lng: latLng.lng()
          },
          workingLocation:AgriLocation
        })
      },
      error => {
        console.error(error);
      }
    );

    console.log(this.state.address)

  }

  render() {

    Geocode.setApiKey("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    let {firstName,lastName, username,role,roleSelect,farmer,officer, email,locationerror, password ,marker} = this.state;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
               <div style={{width:"40rem"}}>
                <Grid container>
                    <Map
                    google={this.props.google}
                    zoom={14}
                    onClick={this.onClick.bind(this)}
                    containerStyle={{
                      width: '45%',
                      height: '60vh'
                    }}
                    initialCenter={{
                      lat: 9.7401424,
                      lng: 80.000622
                    }}>
                    <Marker position={marker.position} />
                  </Map>
                    </Grid>
                </div>
                {locationerror ? <div style={{marginTop:'61vh',textAlign: 'center', }} ><h5 className="text-error">Select your working location</h5></div>
                :<div style={{marginTop:'61vh',textAlign: 'center', }} ><h5 >Select your working location</h5></div>}
                
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12} >
                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="First Name"
                      onChange={this.handleChange}
                      type="text"
                      name="firstName"
                      value={firstName}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Last Name"
                      onChange={this.handleChange}
                      type="text"
                      name="lastName"
                      value={lastName}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="username"
                      value={username}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                   
                    <RadioGroup
                      className="mb-8"
                      value={roleSelect}
                      name="roleSelect"
                      defaultValue="2"
                      onChange={this.handleChange}
                      row
                      >
                        <FormControlLabel
                        value="2"
                        control={<Radio color="secondary" />}
                        label="Farmer"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio color="secondary" />}
                        label="Officer"
                        labelPlacement="end"
                      />
                      
                    </RadioGroup>
                    <FormControlLabel
                      className="mb-4"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    />
                    
                    <div className="flex items-center">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Sign up
                      </Button>
                      <span className="mx-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
                      </Button>
                    </div>
                    <br></br>
                   {roleSelect=="2"? 
                    <div className="flex items-center">
                      <a href='http://localhost:8080/oauth2/authorization/google'>
                      <Button
                          className="capitalize"
                          variant="outlined"
                          color="primary"
                          startIcon={<FcGoogle />}
                        >
                          Sign up with Google
                      </Button>
                      </a>
                    </div>
                    :null}
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
  // setUser: PropTypes.func.isRequired
});

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc")
})(connect(mapStateToProps, {})(SignUp))


