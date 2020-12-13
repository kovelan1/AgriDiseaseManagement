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
import { getAllDiseases,diseaseById ,getUserById} from "app/services/api-services";
import MaterialTable from 'material-table'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { th } from 'date-fns/locale';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { identity, result } from 'lodash';
import { Grade } from '@material-ui/icons';



export default class ViewDisease extends Component {
    state={
        diseases:[],
        openView:false,
        IdDisease:null,
        user:null,
    }

    componentDidMount(){
        getAllDiseases().then((results)=>{
            this.setState({diseases:results.data})
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
        let {diseases,openView,IdDisease,user}=this.state;
       
        
        return (
            <div className="p-8">
                <Card elevation={3} className="pt-5 mb-6 p-8">
    
                <MaterialTable
                    options={{
                        pageSize: 10,
                        paging: true,
                        actionsColumnIndex: -1,
                        maxBodyHeight: 600
                    }}
                    title="Disease"
                    columns={[
                        { title: 'Name', field: 'name'},
                        { title: 'Record On', field: 'createdAt' },
                        {
                            title: 'Impect Level',
                            field: 'impectLevel',
                            lookup: {
                                "very_low":  <small className="border-radius-4 bg-light-green text-white px-2 py-2px w-full" >
                                                Very Low
                                            </small>, 
                                "low":  <small className="border-radius-4 bg-secondary text-white px-2 py-2px w-full" >
                                                Low
                                            </small>,
                                "medium":  <small className="border-radius-4 bg-primary text-white px-2 py-2px w-full" >
                                                medum
                                            </small>, 
                                "high":  <small className="border-radius-4 bg-light-red text-white px-2 py-2px w-full" >
                                                High
                                            </small>, 
                                "very_high":  <small className="border-radius-4 bg-error text-white px-2 py-2px w-full" >
                                                Very High
                                            </small>, 
                            },
                          }
                    ]}
                    data={diseases}     
                    actions={[
                      
                        {
                            icon: ()=> <IconButton><Icon color="primary">edit</Icon></IconButton>,
                            tooltip: 'Edit Disease',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                            icon: ()=> <IconButton><MoreVertOutlinedIcon/></IconButton>,
                            tooltip: 'View More',
                            onClick: (event, rowData) => (this.getDiseaseById(rowData.id),this.getUserBuId(rowData.enteredBy),this.setState({openView:true}))
                        },
                        
                    ]}
                    />
            </Card>

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
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Name</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {IdDisease && IdDisease.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Impect Level</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {IdDisease && IdDisease.impectLevel}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Description</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {IdDisease && IdDisease.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Sollution</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">: {IdDisease && IdDisease.sollution}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Created at</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {IdDisease && IdDisease.createdAt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Enterd By</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {user && user.displayName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Enterd Email</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {user && user.userId}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </Card>
                    </div>
                </Fade>
            </Modal>
            
            </div>
        )
    }
}
