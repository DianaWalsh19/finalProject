import React, { Component } from 'react';
import { getReadings } from '../services/fakeReadingService';

class Readings extends Component {
    state = { 
        readings: getReadings()
     }
    render() { 
        return <table className="table">
            <thead>
                <tr>
                    <th>User email</th>
                    <th>Reading Value</th>
                    <th>Date and Time</th>
                    <th>Pre/Post Medication</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {this.state.readings.map(reading => (
                    <tr>
                        <td>{reading.user.email}</td>
                        <td>{reading.value}</td>
                        <td>{reading.dateTime}</td>
                        <td>{reading.preMed}</td>
                        <td>{reading.notes}</td>
                    </tr>
                ))}    
            </tbody>
        </table>
    }
}
 
export default Readings;