import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core'
import Popup from './Popup'
import DatePicking from './DatePicking'

class Main extends Component{

    render(){

        const { handleClickDay, handleChange, handleSubmit, prevStep, values } = this.props

        return(
            <div className="Main">

                <Container maxWidth="sm" style={ { paddingTop: 80 } }>
                    
                    <DatePicking
                    value={values}
                    handleClickDay={handleClickDay}
                    />
                    
                    <Popup
                    value={values}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    visible={values.addevent}
                    />

                    <Button onClick={prevStep}>Event Listing</Button>

                </Container>

                
            </div>

        );
    }
}

export default Main;