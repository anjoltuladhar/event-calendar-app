import React, { Component } from 'react'
import axios from 'axios'
import Row from "./Row";
import { Button, Container, Paper, InputBase, IconButton } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    topBar: {
        padding: "2px 25px",
        width: "60%",
        margin: "20px auto",
        minHeight: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 50,
        transition: '0.5s width',
        '&:hover': {
            width: '80%',
            transition: '0.5s width'
        }
      },
      input: {
        width: "80%",
        borderRadius: 50
      },
      iconButton: {
        transform: "translateX(20px)"
      },
      filterGroup: {
          padding: '10px 0',
          display: 'flex',
          justifyContent: 'center',
          transition: '0.5s padding',
          '&:hover': {
            padding: '20px 5px',
            transition: '0.5s padding'
          },
          '&: button': {
              background: 'red',
          }
      },
      btnCollect: {
          margin: "10px 0"
      }
  });

class Listing extends Component{

    state = {
        data: [],
        filter: "description",
        displayData: [],
    }

    constructor(props){
        super(props)
        this.displayEvents()
    }

    displayEvents = () => {

        axios.get('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallevents/tenant/reesby')
        .then((response) => {
        const eventsall = response.data
        this.setState({data: eventsall});
        this.setState({displayData: eventsall});
        });
        
    }

    handleChange = e => {
        const key = e.target.value;
        const { data, filter } = this.state
        this.setState({displayData: data});
        let newData = [];
        if(key.length > 0){
            if(data.length > 0){
                if(filter === "description"){
                    newData = data.filter(
                        (event) => event.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
                    );
                    this.setState({displayData: newData});
                }
                else if(filter === "attendees"){
                    let i = 0;
                    for(const index in data){
                        const atten = data[index].attendees;
                        if(atten.length > 0){
                            for(const x in atten){
                                if(atten[x].toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
                                    newData[i] = data[index];
                                    i++;
                                }
                            }
                        }
                    }
                    this.setState({displayData: newData});
                }
            }
        }
        else{
            this.setState({displayData: data});
        }
    }

    handleClick = type => e => {
        if(this.state.filter !== type){
            this.setState({filter: type});
        }
    }

    render(){

        const { displayData } = this.state;

        const { nextStep, classes, listStep, editStep, clientList } = this.props

        return(
            <Container maxWidth="md" style={ { marginTop: 80 } }>
                
                <Paper className={classes.topBar}>
                    <InputBase
                    className={classes.input}
                    placeholder={"Search by"}
                    onChange={this.handleChange}
                    />

                    <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    >
                        <Search />
                    </IconButton>
                </Paper>

                <Paper className={classes.filterGroup}>
                    <Button onClick={this.handleClick('description')}>Description</Button>
                    <Button onClick={this.handleClick('attendees')}>Attendees</Button>
                </Paper>


                <div className={classes.btnCollect}>
                    <Button onClick={nextStep}>Add Events</Button>
                    <Button onClick={clientList}>Client Listing</Button>
                </div>
                
                <div id="myeventlist">
                    <Row values={displayData} listStep={listStep} editStep={editStep} />
                </div>
            </Container>
        )
    }
}

Listing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Listing);