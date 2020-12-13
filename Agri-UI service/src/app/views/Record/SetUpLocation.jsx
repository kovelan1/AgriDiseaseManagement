import { Grade } from '@material-ui/icons';
import React, { Component } from 'react';

import {
    Card,
    CardMedia,
    FormControlLabel,
    Grid,
    Button,
    
  } from "@material-ui/core";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Geocode from "react-geocode";
import { updateUserLocation ,getUser} from "app/services/api-services";
import localStorageService from "../../services/localStorageService";

class SetUpLocation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
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
            marker: {
              title: "The marker`s title will appear as a tooltip.",
              name: "SOMA",
              position: { lat: 37.778519, lng: -122.40564 }
            },
        }
    }

    handleFormSubmit = event => {
        
        console.log(this.state)
        if(this.state.workingLocation){
            updateUserLocation(this.state).then(data=>{
            console.log(data);
            getUser().then(data => {
                console.log(data.data)
                localStorageService.setItem("auth_user",data.data);
                this.props.history.push("/record/dashbord")
              }).catch(
        
              )
            
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

        let {locationerror, marker} = this.state;

        return (
            <div className="p-8">
                <div className="pb-24 pt-4 px-8 " style={{ height: '60vh'}} >
                <Grid container>
                    <Map
                    google={this.props.google}
                    zoom={14}
                    onClick={this.onClick.bind(this)}
                    containerStyle={{
                      width: '60%',
                      height: '60vh'
                    }}
                    initialCenter={{
                      lat: 9.7401424,
                      lng: 80.000622
                    }}>
                    <Marker position={marker.position} />
                  </Map>
                    </Grid>
                    {locationerror ? <div style={{marginTop:'61vh',textAlign: 'center', }} ><h5 className="text-error">Select your working location</h5></div>
                :<div style={{marginTop:'61vh',textAlign: 'center', }} ><h5 >Select your working location</h5></div>}
                
                </div>
                
                <Grid className="p-8">
                <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Update
                      </Button>
                      </ValidatorForm>
                </Grid>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc")
  })(SetUpLocation)