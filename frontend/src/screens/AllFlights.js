import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFlight, loadFlights } from '../actions/flightActions';
import { FLIGHT_DELETE_RESET } from '../constants/flightConstants';
import '../css/allflights.css'

const AllFlights = ({history}) => {

    const dispatch = useDispatch();

    const getFlights = useSelector(state => state.getFlights);
    const {loading , flights} = getFlights;

    const deletedFlight = useSelector(state => state.deleteFlight);
    const {loading:loadingDelete , success} = deletedFlight;


    useEffect(
        () => {
            if(success){
                dispatch(loadFlights());
                dispatch({type : FLIGHT_DELETE_RESET})
            } else {
                if(!flights)
                    dispatch(loadFlights())
            }
        }
    , [dispatch , flights , success])

    const handleDelete = (id) => {
        if(window.confirm('Are you that you want to delete the flight ?')){
            dispatch(deleteFlight(id));
        }
    }


    return (
        !loading &&
        <>
            <section id="all-flights">
                <p className="title">All Flights</p>
                <button onClick={() => history.push('/admin/flight/add/new')} className="createAccount">Create Flight</button>
                    <table>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>FROM</td>
                            <td>TO</td>
                            <td>PRICE</td>
                            <td>FROM DATE AND TIME</td>
                            <td>TO DATE AND TIME</td>
                            <td>TOTAL DURATION</td>
                            <td />
                        </tr>
                        </thead>
                        <tbody>
                            {flights.reverse().map(flight => 
                                <tr key={flight._id}>
                                    <td>{flight._id}</td>
                                    <td>{flight.name}</td>
                                    <td>{flight.from}</td>
                                    <td>{flight.to}</td>
                                    <td>Rs.{flight.price}</td>
                                    <td>{flight.fromDate ? flight.fromDate.substring(0, 10) : '12-06-12'}<br />{flight.fromTime}</td>
                                    <td>{flight.toDate ? flight.toDate.substring(0, 10) : '12-06-12'}<br />{flight.toTime}</td>
                                    <td>{flight.duration}</td>
                                    <td className="icons"><i onClick={() => {handleDelete(flight._id)}} className="fas fa-trash"></i><i onClick={() => history.push(`/admin/flight/${flight._id}`)} className="fas fa-edit"></i></td>
                                </tr>                        
                            )
                            }
                        </tbody>
                    </table>
            </section>
        </>
    )
}

export default AllFlights
