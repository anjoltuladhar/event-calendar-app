import React, { Component } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, List, ListItem, ListItemText } from '@material-ui/core'

export default class Row extends Component{

    render(){
        const { values, editStep } = this.props
        
        return(
            
                <TableContainer component={Paper}>
                    <Table className="mytableContainer" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Event ID</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Repeat</TableCell>
                            <TableCell align="right">Attendees</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {values.map((event) => (
                            <TableRow key={event.eventId}>
                                <TableCell component="th" scope="row">
                                    {event.eventId}
                                </TableCell>
                                <TableCell align="right">{event.description}</TableCell>
                                <TableCell align="right">{event.repeat}</TableCell>
                                <TableCell align="right">
                                    <List component="nav" dense>
                                            {
                                                event.attendees.map((attendee) =>
                                                <ListItem button key={event.eventId + "_" + attendee}>
                                                    <ListItemText primary={ attendee } />
                                                </ListItem>
                                            )}
                                    </List>
                                </TableCell>
                                <TableCell align="right"><Button onClick={editStep(event)}>Edit</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        )
    }
}