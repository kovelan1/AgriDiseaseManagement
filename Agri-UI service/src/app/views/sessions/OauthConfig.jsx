import React, { Component } from 'react';
import localStorageService from '../../services/localStorageService';
import axios from "axios";
import {getUser} from '../../services/api-services'

export default class OauthConfig extends Component {
    constructor(props) {
        super(props)
        this.state = { redirect: false };

    }
    async componentDidMount() {
        const access_token = this.getUrlParameter('access_token');



        localStorageService.setItem('access_token', access_token);
        localStorage.setItem("jwt_token", access_token);
        console.log(access_token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;

        getUser().then(data => {
            console.log(data.data)
            localStorageService.setItem("auth_user",data.data);
            
          }).catch(
    
          )
        this.setState({ redirect: true });
    }

    getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        console.log(results);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    

    render() {
        if (this.state.redirect) {
            return (
                this.props.history.push("/record/dashbord")
            )
        }
        return (
            <div></div>
        )
    }
}