import React, { Component } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Add, LocationOnSharp, Event, Schedule,Repeat, GroupAdd } from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete'

function DateFormat(date){
    const year = (date.getYear() + 1900)
    const month = date.getMonth()
    const day = date.getDay()
    const hour = date.getHours()
    const min = date.getMinutes()

    let defDate = year
    defDate += '-'
    defDate += (month<10)?('0' + month):month
    defDate += '-'
    defDate += (day<10)?('0'+day):day
    defDate += 'T'
    defDate += (hour<10)?('0'+hour):hour
    defDate += ':'
    defDate += (min<10)?('0'+min):min
    return defDate
}

export default class Popup extends Component{

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    render(){

        const { open } = this.state
        const {value, handleChange, handleSubmit, handleAttendees, visible} = this.props

        let myDate = ''
        if(value.date.toString().length > 16){
            myDate = DateFormat(value.date)
        }
        else{
            myDate = value.date
        }
        
        // console.log(myDate)

        return(
            <Box component="div" visibility={visible} style={{ marginTop: 10 }} className="mymodel">
                
                <Button variant="outlined" color="primary" className="myaddbutton" onClick={this.handleClickOpen} startIcon={<Add />}>
                    Add Event
                </Button>

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Add Event Detail</DialogTitle>

                    <DialogContent>
                    
                        <DialogContentText>
                            Add and edit the event in your calendar
                        </DialogContentText>

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
                                            defaultValue={myDate}
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
                                                defaultValue={'never'}
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
                                        renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="Attendees" placeholder="Attendees" />
                                        )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={handleSubmit('add')} color="primary">
                            Add
                        </Button>
                    
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                    </DialogActions>
                    
                </Dialog>

            </Box>
        )
    }
}

const attendees = [
    'Reesby',
    'Harini',
    'Mathews'
]