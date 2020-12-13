import React, { Component,Fragment } from "react";
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
  Divider,
  Avatar,
  Modal,
    Fade,
    Badge,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { addDiseaseRequest,getUserById,getwatherData, getAllRecords,getCurrentIssuesRecords } from "app/services/api-services";
import localStorageService from "../../services/localStorageService";
import Dropzone from 'react-dropzone';
import Geocode from "react-geocode";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SunMax from '@material-ui/icons/WbSunny';
import WindSpeed from '@material-ui/icons/Replay';
import Humidity from '@material-ui/icons/InvertColors';
import WindDiret from '@material-ui/icons/GolfCourse';
import SunMin from '@material-ui/icons/Brightness5';
import Preasure from '@material-ui/icons/NetworkCheck';
import {purple,yellow,amber,blue,cyan,deepOrange,teal} from '@material-ui/core/colors';

class DiseaseDashbord extends Component {
  state = {
    weather:null,
      modelRecord:null,
      user:null,
      openView:false,
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
    records:[],
    alertSetting2: {
      type: '',
      message: ''
    },

    loading: false,
    alert: false,
    alert2: false,
    image: null,
    // diseases: null,
    showingInfoWindow: false,
    activeMarker: {},
  };

    componentDidMount () {
   
    
    getCurrentIssuesRecords().then((results) => {
      this.setState({ records: results.data.filter((item) => item.answred === true) })
       
    }).catch((error) => {
      console.log(error);
    });

    var user=localStorageService.getItem("auth_user")
    console.log(user)
    getwatherData(user.address.lat,user.address.lng).then((res)=>{
        this.setState({weather:res})
        console.log(res);
    }).catch((error) => {
        console.log(error);
      });
    
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOpen = () => {
    this.setState({openView:true})
  };

 handleClose = () => {
    this.setState({openView:false})
  };

  handleFormSubmit = event => {

  };

  getUserBuId(id){
    getUserById(id).then((result)=>{
        this.setState({user:result.data})
    })
    }

  fetchPlaces(mapProps, map, e) {
    this.setState({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),

    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onMarkerClick = (data) =>{
      console.log(data);
        // getUserById(data.farmer).then((result)=>{
        //     this.setState({user:result.data})
        // })
        // this.setState({
        // modelRecord:data,
        // //   showingInfoWindow: true
        // })
    };

  // e.latLng.lng()
  

  render() {
    let { records,modelRecord,openView,user ,weather} = this.state;

    Geocode.setApiKey("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    if(!localStorageService.getItem("auth_user").workingLocation){
      this.props.history.push({ pathname: '/setup/location' })
    }
     

    return (
      <div className="p-8">
        
            <Grid container>
                <h3>Current Disease Map</h3>
            </Grid>
            <Grid container>
            <div className="pb-24 pt-4 px-8 " style={{ height: '60vh'}}>
              
                  <Map
                    google={this.props.google}
                    zoom={13}
                    
                    containerStyle={{
                      width: '90%',
                      height: '57vh',
                    }}
                    initialCenter={{
                      lat: 9.7401424,
                      lng: 80.000622
                    }}>
                    { records && records.map((result,index)=>(
                        <Marker 
                            key={index} 
                            position={{lat: result.address.lat, lng: result.address.lng}} 
                            onClick={()=>this.setState({modelRecord:result,openView:true})}
                        />
                    ))}
                  </Map>
                  
                </div>
            </Grid>
            
            <Grid style={{marginTop:"10px"}}>
                <Card elevation={3} className="pt-5 mb-6">
                <div className="card-title px-6 mb-3">Current weather report</div>
                <div className="overflow-auto">
                    <Table className="product-table">
                    <TableHead>
                        <TableRow>
                        <TableCell className="px-8" colSpan={2}>
                           <Avatar ><SunMin style={{ color: yellow[500] }}/></Avatar>
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                            <Avatar><SunMax style={{ color: amber[500] }}/></Avatar>
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        <Avatar><WindSpeed style={{ color: teal[500] }}/></Avatar>
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        <Avatar><WindDiret style={{ color: blue[500] }}/></Avatar>
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        <Avatar><Humidity style={{ color: cyan[500] }}/></Avatar>
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        <Avatar><Preasure style={{ color: deepOrange[500] }}/></Avatar>
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                        <TableCell className="px-8" colSpan={2}>
                                Temp Max- {weather && weather.temperatureMax} C
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        Temp Min-  {weather && weather.temperatureMin} C
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        Wind Speed-  {weather && weather.windSpeed} m/s
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        Wind Direction-  {weather && weather.windDirection} deg
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        Humidity-  {weather && weather.humidity}%
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                        Pressure-  {weather && weather.pressure} hPa
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    </Table>
                    </div>
                    </Card>
            </Grid>

            <Modal
                open={openView}
                onClose={this.handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
               <Fade in={openView}>
                    <div style={{
                        background:'white',
                        border: '',
                        padding:(0,2,5,6)
                    }}>
                      <div style={{textAlign:'right'}}><Badge badgeContent={'x'} color="error" onClick={this.handleClose }></Badge></div> 
                        <Card className="pt-5 mb-6 p-8" style={{height: '25rem', width:'25rem'}}>
                        <Table className="product-table">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Disease</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {openView && modelRecord.disease.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Impect Level</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {openView && modelRecord.disease.impectLevel}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Discription</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {openView && modelRecord.disease.discription}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Disease Sollution</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">: {openView && modelRecord.disease.sollution}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Issue posted</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {openView && modelRecord.createdAt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Sugession on this issue</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {openView && modelRecord.createdAt}</TableCell>
                                </TableRow>
                                
                                {/* <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Farmer</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {user && user.displayName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Farmer Email</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {user && user.userId}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Farmer T.P</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {user && user.mobileNumber}</TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                      
                        </Card>
                    </div>
                </Fade>
            </Modal>
       
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc")
})(DiseaseDashbord)



