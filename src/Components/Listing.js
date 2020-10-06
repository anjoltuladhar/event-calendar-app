import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Row from "./Row";
import { Button, Container } from '@material-ui/core'

export default class Listing extends Component{
    constructor(props){
        super(props)
        this.displayEvents()
    }

    displayEvents = () => {

        const { listStep, editStep } = this.props

        axios.get('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallevents/tenant/reesby')
        .then((response) => {
            const eventsall = response.data
                        ReactDOM.render(<Row values={eventsall} listStep={listStep} editStep={editStep} />,document.getElementById('myeventlist'))     
        });
    }

    render(){

        const { nextStep } = this.props

        return(
            <Container maxWidth="md" style={ { marginTop: 80 } }>
                <Button onClick={nextStep}>Add Events</Button>
                
                <div id="myeventlist">
                </div>
            </Container>
        )
    }
}