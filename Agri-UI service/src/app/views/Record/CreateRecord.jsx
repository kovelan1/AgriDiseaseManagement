import React, { Component } from "react";
import axios from 'axios';
import {
  Card,
  CardMedia,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  LinearProgress,
  CircularProgress,
  Badge
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { addDiseaseRequest, getAllDiseases } from "app/services/api-services";
import localStorageService from "../../services/localStorageService";
import Dropzone from 'react-dropzone';
import Geocode from "react-geocode";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class CreateRecord extends Component {
  state = {
    farmer: null,
    description: null,
    plant: null,
    location:null,
    address: {
      address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      lat: 0.0,
      lng: 0.0
    },
    daysToHavest:null,
    // sugessions: null,

    alertSetting: {
      type: '',
      message: ''
    },

    alertSetting2: {
      type: '',
      message: ''
    },

    loading: false,
    alert: false,
    alert2: false,
    image: null,
    // diseases: null,

    lat: 9.7401424,
    lng: 80.000622,

    marker: {
      title: "The marker`s title will appear as a tooltip.",
      name: "SOMA",
      position: { lat: 37.778519, lng: -122.40564 }
    },


  };

  // componentDidMount() {
  //   getAllDiseases().then((results) => {
  //     this.setState({ diseases: results.data })
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }


  


  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  valuetext(value) {
    return `${value}°C`;
  }

  handleFormSubmit = event => {
    this.setState({ loading: true })
    var user = localStorageService.getItem("auth_user")
    this.setState({ farmer: user.userId })
    var diserImage=this.state.image

    var data={
        "plant": this.state.plant,
        "address": this.state.address,
        "farmer": this.state.farmer,
        "location":this.state.location,
        "description": this.state.description,
        "daysToHavest": this.state.daysToHavest,
    }

    addDiseaseRequest(data).then(data => {
      this.setState({
        
        alertSetting: {
          type: 'success',
          message: 'Request recoarded sucessfully — check it out!'
        },
      })
      const formData = new FormData();
      if(diserImage){
        formData.append("file", diserImage);
        axios.post(`http://localhost:8082/api/diseasesRecord/image/upload/${data.data.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
         
      ).then((result)=>{
        this.setState({
          loading:false,
          alertSetting2: {
            type: 'success',
            message: 'Image uploaded sucessfully — check it out!'
          },
        })
      }).catch((error) => {
        this.setState({
          loading:false,
          alertSetting2: {
            type: 'warning',
            message: '! Some thing went wrong in image upload- Try again '
          },
        })
      })

      }
      else{
        this.setState({loading:false,})
      }
      
      
      console.log(data)
    }).catch((error) => {
      this.setState({
        loading:false,
        alertSetting: {
          type: 'warning',
          message: '! Some thing went wrrong- Try again '
        },
      })
    })

    this.setState({
      plant: null,
      description: null,
      location: null,
      impectLevel: null,
      daysToHavest:null,
      alert:true,
      alert2: true,
      image: null,
    })
  };



  fetchPlaces(mapProps, map, e) {
    this.setState({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),

    });
  }



  // e.latLng.lng()
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
          location:AgriLocation
        })
      },
      error => {
        console.error(error);
      }
    );

    console.log(this.state.address)

  }

  render() {
    let { plant, daysToHavest,description,image, disease, diseases,location, sollution, loading, alert,alert2,alertSetting,alertSetting2, lat, lng, marker } = this.state;

    Geocode.setApiKey("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

     

    return (
      <div className="p-8">
        {/* {loading && <LinearProgress/>} */}
        {alert && <Alert name="1" className="mb-6 w-full" severity={alertSetting.type} onClose={() => { this.setState({ alert: false }) }}>
            {alertSetting.message}
          </Alert>}
          {alert2 && <Alert name="2" className="mb-6 w-full" severity={alertSetting2.type} onClose={() => { this.setState({ alert2: false }) }}>
            {alertSetting2.message}
          </Alert>}
        <Card >
          {loading ?
            <CircularProgress
              size={45}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%"
              }}
            />
            :
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center bg-light-gray items-center">
                  <Dropzone onDrop={(acceptedFiles) => { this.setState({ image: acceptedFiles[0] }) }}>

                    {({ getRootProps, getInputProps }) => (
                      <div>

                        <Card >
                          {image ? (<div style={{ textAlign: 'right', marginRight: '10px' }}><Badge badgeContent={'x'} color="error" onClick={() => { this.setState({ image: null }) }}> </Badge></div>) : <Badge></Badge>}
                          <section>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              {image === null ?
                                <div>
                                  <img
                                    src="/assets/images/illustrations/posting_photo.svg"
                                    alt=""
                                  />
                                  <p style={{ textAlign: 'center' }}>Drag and drop the image </p>
                                </div>
                                : <img src={URL.createObjectURL(image)} />
                              }
                            </div>
                          </section>
                        </Card>
                      </div>

                    )}
                  </Dropzone>
                </div>
                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Plant"
                      onChange={this.handleChange}
                      type="multiline"
                      name="plant"
                      value={plant}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Days to Havest"
                      onChange={this.handleChange}
                      type="number"
                      name="daysToHavest"
                      value={daysToHavest}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />

                    {/* <InputLabel id="impectLevel">Location</InputLabel>
                    <Select
                      className="mb-6 w-full"
                      labelId="impectLevel"
                      id="location"
                      name="location"
                      variant="outlined"
                      value={location}
                      onChange={this.handleChange}
                      >
                      <MenuItem value="">
                          <em>Select the Location</em>
                      </MenuItem>
                      <MenuItem value="jaffna">Jaffna</MenuItem>
                      <MenuItem value="malakam">Malakam</MenuItem>
                      <MenuItem value="kokuvil">Kokuvil</MenuItem>
                      <MenuItem value="thellipalai">Thellipalai</MenuItem>
                      <MenuItem value="urampri_west">Uramperai West</MenuItem>
                      <MenuItem value="urampri_east">Uramperai East</MenuItem>
                    </Select> */}
                    
                    {/* <InputLabel id="disease">Disease</InputLabel>
                    <Select
                      className="mb-6 w-full"
                      labelId="disease"
                      id="disease"
                      name="disease"
                      variant="outlined"
                      
                      onChange={this.handleChange}
                      >

                      <MenuItem value="">
                          <em>Select the Disease</em>
                      </MenuItem>
                      
                      {diseases && diseases.map((data, cc) => {
                            return (
                            <MenuItem  value={data}> {data.name}</MenuItem>
                            )
                        })}
                    </Select> */}
                    <TextField
                      id="outlined-multiline-static"
                      className="mb-6 w-full"
                      label="Multiline"
                      label="Description"
                      onChange={this.handleChange}
                      name="description"
                      value={description}
                      multiline
                      rows={4}
                      variant="outlined"
                    />

                   

                    <div className="flex items-center">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                      >
                        Submit
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>

              <Grid item lg={7} md={7} sm={7} xs={12}>

                <div className="p-8 flex justify-center bg-light-gray items-center">
                  <Map
                    google={this.props.google}
                    zoom={14}
                    onClick={this.onClick.bind(this)}
                    containerStyle={{
                      width: '100%',
                      height: '150vh'
                    }}
                    initialCenter={{
                      lat: 9.7401424,
                      lng: 80.000622
                    }}>
                    <Marker position={marker.position} />
                  </Map>
                </div>
              </Grid>
            </Grid>}
        </Card>
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ("google api key here")
})(CreateRecord)



