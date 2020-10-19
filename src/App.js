import React, { Component } from 'react';
import Main from './Components/Main'
import Listing from './Components/Listing'
import EditEvent from './Components/EditEvent'
import ClientListing from './Components/ClientListing'
import './App.css';
import './Assets/styles.css'
import axios from 'axios'

class App extends Component {

    state = {
        step: 3,
        eventId: 'event' + Math.random().toString(36).substring(7),
        tenantId: 'reesby',
        date: new Date(),
        description: '',
        repeat: 'never',
        location: '',
        attendees: [],
        atterror: null,
        atterrmsg: '',
        addevent: 'hidden',
        descempty: null,
        descerrmsg: '',
        locempty: null,
        locerrmsg: '',
        updated: false
    }

    handleChange = input => e => {
        e.preventDefault()
        if(this.state.updated){
            this.setState({updated: false})
        }
        if(input === 'date'){
            this.setState({date: e.target.value})
        }
        else{
            if(e.target.value.length > 0){
                if(input === 'description'){
                    if(e.target.value.length >= 10){
                        this.setState({descempty: null, descerrmsg: ''})
                    }
                }
                else if(input === 'location'){
                    this.setState({locempty: null, locerrmsg: ''})
                }
            }
            this.setState({[input] : e.target.value});
        }
    }

    handleAttendees = (event, value) => {
        event.preventDefault()
        if(value.length > 0){
            this.setState({attendees: value, atterror: null, atterrmsg: ''})
        }        
    }

    handleSubmit = type => e => {
        e.preventDefault()
        let error = false
        if(this.state.description.length < 1){
                this.setState({descempty: true, descerrmsg: 'Cannot leave this field empty', updated: false})
                error = true
        }
        else if(this.state.description.length < 10){
                this.setState({descempty: true, descerrmsg: 'Atleast 10 characters needed', updated: false})
                error = true
        }
        if(this.state.location.length < 1){
            this.setState({locempty: true, locerrmsg: 'Cannot leave this field empty', updated: false})
            error = true
        }
        this.setState({date: this.state.date.toString()})
        
        if(!error){
            if(type === 'add'){
                axios.post(`http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/addevent/`, 
                this.state)
                .then((response) => {
                console.log(response);
                alert("Successfully added event")
                }, (error) => {
                console.log(error);
                alert("Error experienced: check console for more info");
                });
            }
            else if(type === 'edit'){
                const { eventId, tenantId, date, description, repeat, location, attendees } = this.state
                const values = { eventId, tenantId, date, description, repeat, location, attendees }
                
                axios.put(`http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/updateevent/`, 
                values)
                .then((response) => {
                console.log(response);
                }, (error) => {
                console.log(error);
                });
            }
            this.setState({ updated: true })
        }
    }

    handleClickDay = date => {
        this.setState({ date, addevent: 'visible' })
    }

    list = () => {
        const { step } = this.state
        if(step > 0){
            this.setState({
                step: 0,
                updated: false
            });
        }
    }

    add = () => {
        this.setState({
            step: 1
        });
    }

    clientListing = () => {
        this.setState({
            step: 3
        });
    }

    edit = event => e => {
        this.setState({
            step: 2,
            eventId: event.eventId,
            tenantId: event.tenantId,
            date: event.date,
            description: event.description,
            repeat: event.repeat,
            location: event.location,
            attendees: event.attendees,
            addevent: event.addevent,
            descempty: null,
            descerrmsg: '',
            locempty: null,
            locerrmsg: '',
            updated: false
        }) 
    }

    render(){

        const { step, event } = this.state
        const {eventId, tenantId, date, description, repeat, location, attendees, addevent,descempty, descerrmsg, locempty, locerrmsg } = this.state
        const values = {eventId, tenantId, date, description, repeat, location, attendees, addevent, descempty, descerrmsg, locempty, locerrmsg}

        const { updated } = this.state

            switch(step){
                case 0:
                    return (
                        <Listing
                        nextStep = {this.add}
                        listStep = {this.list}
                        editStep = {this.edit}
                        clientList = {this.clientListing}
                        />
                    )
                case 1:
                    return (
                        <Main
                        handleChange = {this.handleChange}
                        handleSubmit = {this.handleSubmit}
                        handleClickDay = {this.handleClickDay}
                        handleAttendees = {this.handleAttendees}
                        values = {values}
                        prevStep={this.list}
                        />
                    )
                case 2:
                    return (
                        <EditEvent
                        listStep={this.list}
                        addStep={this.add}
                        handleChange = {this.handleChange}
                        handleSubmit = {this.handleSubmit}
                        handleAttendees = {this.handleAttendees}
                        value = {values}
                        event={event}
                        updated={updated}
                        />
                    )
                case 3:
                    return (
                        <ClientListing
                        
                        />
                    )
                default:
                    return <h1>404 Server not found</h1>
            }
                
            
  }
}

export default App;
