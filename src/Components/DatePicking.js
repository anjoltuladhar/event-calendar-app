import React, { Component } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

class DatePicking extends Component{
    
    render(){

        const { value, handleChange, handleClickDay } = this.props

        return(
                <Calendar
                onChange = { handleChange }
                onClickDay = { handleClickDay }
                value = { value.date }
                />
        )
    }
}

export default DatePicking;