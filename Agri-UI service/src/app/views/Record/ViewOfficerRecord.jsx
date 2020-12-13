import React, { Component } from 'react'
import {
    Card,
    Icon,
    IconButton,
    Modal,
    Fade,
    Grid,
    Badge,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
  } from "@material-ui/core";
import { diseaseById,getRecodeofAi ,getUserById} from "app/services/api-services";
import MaterialTable from 'material-table'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { th } from 'date-fns/locale';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { identity, result } from 'lodash';
import { Grade } from '@material-ui/icons';
import localStorageService from "../../services/localStorageService";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class ViewOfficerRecord extends Component {
    state={
        records:[],
        openView:false,
        IdDisease:null,
        user:null,
        record:null,
        marker: {
            title: "The marker`s title will appear as a tooltip.",
            name: "SOMA",
            position: { lat: 37.778519, lng: -122.40564 }
          },
        latitute:null,
        longetute:null,  
    }

    componentDidMount(){
        var aiOfficer=localStorageService.getItem("auth_user").userId;

        getRecodeofAi(aiOfficer).then((results)=>{
            this.setState({records:results.data})
        }).catch((error) => {
        console.log(error);
        });
    }

    getDiseaseById(id){
        diseaseById(id).then((result)=>{
            this.setState({IdDisease:result.data})
        })
    }

    getUserBuId(id){
        getUserById(id).then((result)=>{
            this.setState({user:result.data})
        })
    }
    handleOpen = () => {
        this.setState({openView:true})
      };
    
     handleClose = () => {
        this.setState({openView:false})
      };
    
    
    render() {
        let {records,openView,IdDisease,user,record,marker,latitute,longetute}=this.state;
       
        
        return (
            <div className="p-8">
                  <div elevation={3} className="pt-5 mb-6 p-8">
                  <MaterialTable
                    options={{
                        pageSize: 5,
                        paging: true,
                        actionsColumnIndex: -1,
                        maxBodyHeight: 600
                    }}
                    title="Pending Requests"
                    columns={[
                        { 
                            title: 'Plant', 
                            field: 'plant',
                            cellStyle: {
                               padding:'20px'
                              },
                            headerStyle: {
                                padding:'20px'
                            }
                        },
                        { title: 'Record On', field: 'createdAt' },
                        { 
                            title: 'Address ', 
                            field: 'id',
                            render: rowData => rowData.address ? rowData.address.address + ',' + rowData.address.city + ','+ rowData.address.state + ',' + rowData.address.country : " " 
                        },
                       
                    ]}
                    data={records.filter((item) => item.answred === false)}     
                    actions={[
                      
                        {
                            icon: ()=> <IconButton><Icon color="primary">edit</Icon></IconButton>,
                            tooltip: 'Edit Disease',
                            onClick: (event, rowData) => {
                                this.props.history.push({ pathname: '/record/responce', state: { data: rowData, type: 'new' } })
                            },
                        }
                        
                    ]}
                    />
                  </div>
                <div className="pt-5 mb-6 p-8">
    
                <MaterialTable
                    options={{
                        pageSize: 10,
                        paging: true,
                        actionsColumnIndex: -1,
                        maxBodyHeight: 600
                    }}
                    title="Answred Requests"
                    columns={[
                        { 
                            title: 'Plant', 
                            field: 'plant',
                            cellStyle: {
                               padding:'20px'
                              },
                            headerStyle: {
                                padding:'20px'
                            }
                        },
                        { title: 'Replayed On', field: 'answredAt' },
                        { 
                            title: 'Address ', 
                            field: 'id',
                            render: rowData => rowData.address ? rowData.address.address + ',' + rowData.address.city + ','+ rowData.address.state + ',' + rowData.address.country : " " 
                        },
                       
                    ]}
                    data={records.filter((item) => item.answred === true)}     
                    actions={[
                      
                        {
                            icon: ()=> <IconButton><Icon color="primary">edit</Icon></IconButton>,
                            tooltip: 'Edit Disease',
                            onClick: (event, rowData) => {
                                this.props.history.push({ pathname: '/record/responce', state: { data: rowData, type: 'edit' } })
                            },
                            
                        },
                        {
                            icon: ()=> <IconButton><MoreVertOutlinedIcon/></IconButton>,
                            tooltip: 'View More',
                            onClick: (event, rowData) => (this.getUserBuId(rowData.farmer),this.setState({latitute:rowData.address.lat,longetute:rowData.address.lng, openView:true,record:rowData, marker:{ position: { lat: rowData.address.lat, lng: rowData.address.lng }}}))
                        },
                        
                    ]}
                    />
            </div>
            
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
                        <Card className="pt-5 mb-6 p-8" style={{height: '45rem', width:'35rem'}}>
                        <Table className="product-table">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Disease</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {record && record.disease.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Impect Level</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {record && record.disease.impectLevel}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Discription</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {record && record.disease.discription}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Disease Sollution</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">: {record && record.disease.sollution}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Issue posted</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {record && record.createdAt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Sugession on this issue</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {IdDisease && IdDisease.createdAt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Replayed on</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {record && record.answredAt}</TableCell>
                                </TableRow>
                                <TableRow>
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
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Map
                            google={this.props.google}
                            zoom={16}
                            
                            containerStyle={{
                            width: '90%',
                            position: 'relative',
                            height: '80%'
                            }}
                            initialCenter={{
                            lat:latitute,
                            lng: longetute,
                            }}>
                            <Marker position={marker.position} />
                        </Map>

                        </Card>
                    </div>
                </Fade>
            </Modal>




            
            
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc")
  })(ViewOfficerRecord)