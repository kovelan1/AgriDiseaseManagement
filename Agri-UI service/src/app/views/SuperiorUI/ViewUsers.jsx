import React, { Component } from 'react'
import {
    Card,
    Icon,
    IconButton,
    CircularProgress,
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
import Alert from '@material-ui/lab/Alert';
import { getOfficersS, activateOfficer, getAllDiseases, diseaseById, getUserById } from "app/services/api-services";
import MaterialTable from 'material-table'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { th } from 'date-fns/locale';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { identity, result } from 'lodash';
import { Grade } from '@material-ui/icons';



export default class ViewUsers extends Component {
    state = {
        officers: [],
        loading: false,
        openView: false,
        IdDisease: null,
        user: null,
        alert: false,
        alertSetting: {
            type: '',
            message: ''
        },
    }

    componentDidMount() {
        getOfficersS().then((results) => {
            this.setState({ officers: results.data })
        }).catch((error) => {
            console.log(error);
        });
    }

    handleActivateOfficer(data) {
        this.setState({ loading: true, })
        activateOfficer(data.userId).then((result) => {
            let filteredArray = this.state.officers.filter(item => item !== data)
            this.setState({ officers: filteredArray });
            this.setState({
                alert: true,
                loading: false,
                alertSetting: {
                    type: 'success',
                    message: 'Request recoarded sucessfully — check it out!'
                },

            })
        }).catch(
            this.setState({
                loading: false,
                alertSetting: {
                    type: 'warning',
                    message: '! Some thing went wrrong- Try again '
                },
            })
        )
    }

    getUserBuId(id) {
        getUserById(id).then((result) => {
            this.setState({ user: result.data })
        })
    }
    handleOpen = () => {
        this.setState({ openView: true })
    };

    handleClose = () => {
        this.setState({ openView: false })
    };


    render() {
        let { officers, alertSetting, alert, loading } = this.state;


        return (
            <div className="p-8">
                {alert && <Alert name="1" className="mb-6 w-full" severity={alertSetting.type} onClose={() => { this.setState({ alert: false }) }}>
                    {alertSetting.message}
                </Alert>}
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
                    <div>
                        <Card elevation={3} className="pt-5 mb-6 p-8">

                            <MaterialTable
                                options={{
                                    pageSize: 3,
                                    paging: true,
                                    actionsColumnIndex: -1,
                                    maxBodyHeight: 600
                                }}
                                title="Inactive AI Officers"
                                columns={[
                                    {
                                        title: 'Name', field: 'displayName', cellStyle: {
                                            padding: '20px'
                                        },
                                        headerStyle: {
                                            padding: '20px'
                                        }
                                    },
                                    { title: 'Email', field: 'email' },
                                    { title: 'Working Location', field: 'workingLocation' },
                                    {
                                        title: 'Status',
                                        field: 'token',
                                        lookup: {
                                            "true": <small className="border-radius-4 bg-light-green text-white px-2 py-2px w-full" >
                                                Active
                                            </small>,
                                            "false": <small className="border-radius-4 bg-error text-white px-2 py-2px w-full" >
                                                Inactive
                                            </small>
                                        }
                                    }
                                ]}
                                data={officers.filter((item) => item.token === 'false')}
                                actions={[

                                    {
                                        icon: () => <IconButton><Icon color="primary">edit</Icon></IconButton>,
                                        tooltip: 'Activate User',
                                        onClick: (event, rowData) => this.handleActivateOfficer(rowData)
                                    }
                                ]}
                            />
                        </Card>

                            <Card elevation={3} className="pt-5 mb-6 p-8">

                                <MaterialTable
                                    options={{
                                        pageSize: 10,
                                        paging: true,
                                        actionsColumnIndex: -1,
                                        maxBodyHeight: 600
                                    }}
                                    title="Active Officers"
                                    columns={[
                                        {
                                            title: 'Name', field: 'displayName', cellStyle: {
                                                padding: '20px'
                                            },
                                            headerStyle: {
                                                padding: '20px'
                                            }
                                        },
                                        { title: 'Email', field: 'email' },
                                        { title: 'Working Location', field: 'workingLocation' },
                                        {
                                            title: 'Status',
                                            field: 'token',
                                            lookup: {
                                                "true": <small className="border-radius-4 bg-light-green text-white px-2 py-2px w-full" >
                                                    Active
                                                </small>,
                                                "false": <small className="border-radius-4 bg-error text-white px-2 py-2px w-full" >
                                                    Inactive
                                                </small>
                                            }
                                        }
                                    ]}
                                    data={officers.filter((item) => item.token === 'true')}
                                    actions={[

                                        {
                                            icon: () => <IconButton><Icon color="primary">edit</Icon></IconButton>,
                                            tooltip: 'Edit Disease',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                                        }
                                    ]}
                                />
                            </Card> 
                    </div>}

                {/* <Modal
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
                                    <TableCell className="px-0 capitalize" colSpan={2} align="left">Discription</TableCell>
                                    <TableCell className="px-0 capitalize" colSpan={4} align="left">: {IdDisease && IdDisease.discription}</TableCell>
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
            </Modal> */}

            </div>
        )
    }
}
