import React, { Component } from "react";
import {
  Card,
  FormControlLabel,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { createDisease } from "app/services/api-services";
import localStorageService  from "../../services/localStorageService";

const styles = theme => ({

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});



class CreateDisease extends Component {
  state = {
    name: null,
    discription: null,
    sollution: null,
    spreadingOn:null,
    impectLevel: null,
    enteredBy: null,
    loading:false,
    alert:false,
  };

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
    this.setState({loading:true})
    var user=localStorageService.getItem("auth_user")
    this.setState({enteredBy:user.userId})
    createDisease(this.state).then(data=>{
      console.log(data)
    }).catch(
      
    )
    this.setState({ 
      name: null,
      discription: null,
      sollution: null,
      impectLevel: null,
      enteredBy: null,
      loading:false,
      alert:true,
    })
  };

  render() {
    let {name,discription, impectLevel, sollution ,loading,alert,spreadingOn} = this.state;
    

    return (
        <div className="p-8">
          <Card >
          {alert && <Alert className="mb-6 w-full" severity="success" onClose={() => {this.setState({alert:false})}}>
            Disease recoarded sucessfully — check it out!
          </Alert>}
            {loading ?
            <CircularProgress
                            size={45}
                            style={{position: "absolute",
                            top: "50%",
                            left: "50%"}}
                          />
            :
            <Grid container>
             
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Name of the Disease"
                      onChange={this.handleChange}
                      type="multiline"
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <InputLabel id="impectLevel">Impect Level</InputLabel>
                    <Select
                      className="mb-6 w-full"
                      labelId="impectLevel"
                      id="impectLevel"
                      name="impectLevel"
                      variant="outlined"
                      value={impectLevel}
                      onChange={this.handleChange}
                      >
                      <MenuItem value="">
                          <em>Select the impact</em>
                      </MenuItem>
                      <MenuItem value="very_low">Very Low</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="very_high">Very High</MenuItem>
                    </Select>
                    <TextField
                      id="outlined-multiline-static"
                      className="mb-6 w-full"
                      label="Multiline"
                      label="Description"
                      onChange={this.handleChange}
                      name="discription"
                      value={discription}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                    <Select
                      className="mb-6 w-full"
                      labelId="spreadingOn"
                      id="spreadingOn"
                      name="spreadingOn"
                      variant="outlined"
                      value={spreadingOn}
                      onChange={this.handleChange}
                      >
                      <MenuItem value="">
                          <em>Select onet</em>
                      </MenuItem>
                      <MenuItem value="wind">Wind</MenuItem>
                      <MenuItem value="rain">Rain</MenuItem>
                      <MenuItem value="temp">Temprature</MenuItem>
                      <MenuItem value="no">No of the above</MenuItem>
                    </Select>
                    <TextField
                      id="outlined-multiline-static"
                      className="mb-6 w-full"
                      label="Multiline"
                      label="Sollution"
                      onChange={this.handleChange}
                      name="sollution"
                      value={sollution}
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
            </Grid>}
          </Card>
        </div>
    );
  }
}



export default CreateDisease;
