import React, { Component } from 'react';
import { getReadings } from '../services/fakeReadingService';

class Readings extends Component {
    state = { 
        readings: getReadings()
     }

    handleDelete = reading => {
        console.log(reading); //checkpoint
    };

    render() { 
        return <table className="table">
            <thead>
                <tr>
                    <th>User email</th>
                    <th>Reading Value</th>
                    <th>Date and Time</th>
                    <th>Pre/Post Medication</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.readings.map(reading => (
                    <tr key={reading._id}>
                        <td>{reading.user.email}</td>
                        <td>{reading.value}</td>
                        <td>{reading.dateTime}</td>
                        <td>{reading.preMed}</td>
                        <td>{reading.notes}</td>
                        <td><button 
                            onClick={ () => this.handleDelete(reading)} 
                            className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                ))}    
            </tbody>
        </table>
    }
}
 
export default Readings;