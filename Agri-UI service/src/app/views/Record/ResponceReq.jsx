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
import { addResponceToRequest,getUserById, getAllDiseases } from "app/services/api-services";
import localStorageService from "../../services/localStorageService";
import Dropzone from 'react-dropzone';
import Geocode from "react-geocode";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import history from "history.js";

class ResponceReq extends Component {

    constructor(props) {
        super(props)
    
            this.state = {
                request:this.props.location.state.data,
                farmer: null,
                description: this.props.location.state.data.description,
                plant: this.props.location.state.data.plant,
                location:this.props.location.state.data.locationca,
                address: this.props.location.state.data.address,
                daysToHavest:this.props.location.state.data.daysToHavest,
                sugessions: null,

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
                diseases: null,
                disease:null,
                lat: 9.7401424,
                lng: 80.000622,

                marker: {
                title: "The marker`s title will appear as a tooltip.",
                name: "SOMA",
                position: { lat: 37.778519, lng: -122.40564 }
                },


            };
            this.handleFormSubmit=this.handleFormSubmit.bind(this);
            this.handleChange=this.handleChange.bind(this);
    }

    async componentDidMount() {
        await console.log(this.props.location.state)

        await getAllDiseases().then((results) => {
          this.setState({ diseases: results.data })
        }).catch((error) => {
          console.log(error);
        });

        await getUserById(this.props.location.state.data.farmer).then((result)=>{
            this.setState({farmer:result.data})
        })
    }


    handleChange = event => {
        event.persist();
        this.setState({
        [event.target.name]: event.target.value
        });
    };

    
    handleFormSubmit = event => {
        this.setState({ loading: true })
        var data={
            "sugessions": this.state.sugessions,
            "disease":this.state.disease
        }

        addResponceToRequest(data,this.props.location.state.data.id).then(data => {
            this.setState({
                loading:false,
                alertSetting: {
                    type: 'success',
                    message: 'Responce recoarded sucessfully — check it out!'
                },
            })
            history.push({
                pathname: "/record/officerview",
                state:{
                    alertSetting: {
                    type: 'success',
                    message: 'Responce recoarded sucessfully — check it out!'
                    },
                    alert:true,
                }
              });
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
            disease:null,
            sugessions:null,
            alert:true,
         })
    };





  
  render() {
    let { plant, daysToHavest,description,image, disease, diseases,location, sugessions, loading, alert,alert2,alertSetting,alertSetting2, lat, lng, marker,request ,farmer} = this.state;

    return (
      <div className="p-8">
        {/* {loading && <LinearProgress/>} */}
        {alert && <Alert name="1" className="mb-6 w-full" severity={alertSetting.type} onClose={() => { this.setState({ alert: false }) }}>
            {alertSetting.message}
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
                    <div>
                    <CardMedia
                        image={`http://localhost:8082/api/diseasesRecord/${request.id}/image/download`}
                       
                        />
                    </div>
                </div>
                <Table className="product-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="px-0 capitalize" colSpan={2} align="left">plant</TableCell>
                            <TableCell className="px-0 capitalize" colSpan={4} align="left">: {request && request.plant}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-0 capitalize" colSpan={2} align="left">Request on</TableCell>
                            <TableCell className="px-0 capitalize" colSpan={4} align="left">: {request && request.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-0 capitalize" colSpan={2} align="left">Description</TableCell>
                            <TableCell className="px-0 capitalize" colSpan={4} align="left">: {request && request.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-0 capitalize" colSpan={2} align="left">Farmer</TableCell>
                            <TableCell className="px-0 capitalize" colSpan={4} align="left">: {farmer && farmer.displayName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-0 capitalize" colSpan={2} align="left">Farmer's Email</TableCell>
                            <TableCell className="px-0 " colSpan={4} align="left">: {farmer && farmer.userId}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
              </Grid>

              <Grid item lg={7} md={7} sm={7} xs={12}>

                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <InputLabel id="disease">Disease</InputLabel>
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
                    </Select>
                    {/* <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Days to Havest"
                      onChange={this.handleChange}
                      type="number"
                      name="daysToHavest"
                      value={daysToHavest}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    /> */}

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
                    
                    <TextField
                      id="outlined-multiline-static"
                      className="mb-6 w-full"
                      label="Multiline"
                      label="Sugessions"
                      onChange={this.handleChange}
                      name="sugessions"
                      value={sugessions}
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
                        onClick={this.handleFormSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>}
        </Card>
      </div>
    );
  }
}



export default ResponceReq



