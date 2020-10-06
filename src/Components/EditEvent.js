import React, { Component } from 'react'
import { Container, Box, ButtonGroup, Button, TextField, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { LocationOnSharp, Event, Schedule,Repeat, GroupAdd } from '@material-ui/icons'
import { Autocomplete, Alert, AlertTitle } from '@material-ui/lab/'

export default class EditEvent extends Component{

    render(){

        const { value, handleChange, handleSubmit, handleAttendees, listStep, updated } = this.props

        const message = (updated)?(<Alert variant="filled" severity="success"><AlertTitle>Success</AlertTitle>The Event has been updated</Alert>):""

        console.log(value.attendees)

        return(

            <Container maxWidth="sm" style={ { paddingTop: 80 } }>
            
            { message }
            
            <Box component="div" style={{ marginTop: 10 }} className="mymodel">

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item className="myicons">
                                        <Event/>
                                    </Grid>

                                    <Grid item xs>
                                        <TextField
                                        error={value.descempty}
                                        autoFocus
                                        margin="dense"
                                        id="description"
                                        label="Description"
                                        type="textarea"
                                        onChange={handleChange('description')}
                                        helperText={value.descerrmsg}
                                        defaultValue={value.description}
                                        multiline
                                        fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                                                    
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                        <Grid item className="myicons">
                                            <Schedule />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField
                                            autoFocus
                                            margin="dense"
                                            id="date"
                                            label="Date"
                                            type="datetime-local"
                                            onChange={handleChange('date')}
                                            defaultValue={value.date}
                                            fullWidth
                                            />
                                        </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                        <Grid item className="myicons">
                                            <Repeat />
                                        </Grid>
                                        <Grid item xs>
                                            <FormControl fullWidth>
                                                <InputLabel>Repeat</InputLabel>
                                                <Select
                                                defaultValue={value.repeat}
                                                onChange={handleChange('repeat')}
                                                autoWidth
                                                >
                                                    <MenuItem value={'never'}>Never</MenuItem>
                                                    <MenuItem value={'everyday'}>Everyday</MenuItem>
                                                    <MenuItem value={'weekdays'}>Weekdays</MenuItem>
                                                    <MenuItem value={'weekends'}>Weekends</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item className="myicons">
                                        <LocationOnSharp />
                                    </Grid>

                                    <Grid item xs>
                                        <TextField
                                            error={value.locempty}
                                            autoFocus
                                            margin="dense"
                                            id="location"
                                            onChange={handleChange('location')}
                                            helperText={value.locerrmsg}
                                            label="Location"
                                            defaultValue={value.location}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item className="myicons">
                                        <GroupAdd />
                                    </Grid>

                                    <Grid item xs>
                                        <Autocomplete
                                        multiple
                                        size="small"
                                        options={attendees}
                                        getOptionLabel={(option) => option}
                                        id = "attendees-list"
                                        onChange={handleAttendees}
                                        defaultValue={value.attendees}
                                        renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="Attendees" placeholder="Attendees" />
                                        )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    
                    <ButtonGroup style={{marginTop: 25}}>
                        <Button onClick={listStep} color="secondary">
                            {"< Back to listing"}
                        </Button>

                        <Button variant="contained" onClick={handleSubmit('edit')} color="primary">
                            Update
                        </Button>
                    </ButtonGroup>
                        

            </Box>         
            </Container>
        )
    }
}

const attendees = [
    'Reesby',
    'Harini',
    'Mathews'
]