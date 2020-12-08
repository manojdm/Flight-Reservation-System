import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadFlight, loadFlights, updateFlight } from '../actions/flightActions';
import { FLIGHT_UPDATE_RESET } from '../constants/flightConstants';

const FlightEdit = ({match , history}) => {

    const [name , setName] = useState('');
    const [number , setNumber] = useState('');
    const [from , setFrom] = useState('')
    const [to , setTo] = useState('')
    const [fromDate , setFromDate] = useState('');
    const [toDate , setToDate] = useState('');
    const [fromTime , setFromTime] = useState('');
    const [toTime , setToTime] = useState('');
    const [duration , setDuration] = useState('');
    const [price , setPrice] = useState(0);

    const flightId = match.params.id;

    const dispatch = useDispatch();

    const updatedFlight = useSelector(state => state.updateFlight);
    const {loading:loadingUpdate , success} = updatedFlight;

    const getFlight = useSelector(state => state.getFlight);
    const {loading , flight} = getFlight;

    useEffect(() => {
        if(success){
            history.push('/admin/flights');
            dispatch(loadFlights());
            dispatch({type : FLIGHT_UPDATE_RESET});
        } else {
            if( !flight) {
                dispatch(loadFlight(flightId));
            }else {
                setName(flight.name);
                setNumber(flight.number);
                setFrom(flight.from);
                setTo(flight.to);
                setFromDate((flight.fromDate.substring(0 , 10)));
                setFromTime(flight.fromTime);
                setToTime(flight.toTime);
                setToDate(flight.toDate.substring(0 , 10));
                setDuration(flight.duration);
                setPrice(flight.price)
            }
        }
    } , [ dispatch, flightId , success , flight])

    const handleUpdate = () => {
            dispatch(updateFlight({id : flightId , name,number,from,to,fromDate,toDate ,fromTime,toTime,duration,price}));
    }

    return (
        <>
            <section id="userEdit">
                <p className="title">Edit Flight</p>
                <div className="msg-container">
                </div>
                <div className="name-container">
                    <label className="name-label">name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="name" htmlFor="name" />
                </div>

                <div className="number-container">
                    <label className="number-label">number</label>
                    <input type="text" onChange={(e) => setNumber(e.target.value)} value={number} placeholder="Flight number" htmlFor="number" />
                </div>

                <div className="from-container">
                    <label className="from-label">on Boarding Place</label>
                    <input type="text" onChange={(e) => setFrom(e.target.value)} value={from} placeholder="On Boarding Place" />
                </div>

                <div className="to-container">
                    <label className="to-label">Off boarding place</label>
                    <input type="text" onChange={(e) => setTo(e.target.value)} value={to} placeholder="to" />
                </div>
                <div className="fromDate-container">
                    <label className="fromDate-label">OnBoarding Date</label>
                    <input type="Date" onChange={(e) => setFromDate((e.target.value))} value={fromDate} placeholder="fromDate" />
                </div>
                <div className="toDate-container">
                    <label className="toDate-label">Off Boarding Date</label>
                    <input type="Date" onChange={(e) => setToDate((e.target.value))} value={toDate} placeholder="number"  />
                </div>
                <div className="fromTime-container">
                    <label className="fromTime-label">OnBoarding Time</label>
                    <input type="Time" onChange={(e) => setFromTime((e.target.value))} value={fromTime} placeholder="on Boarding Time" />
                </div>
                <div className="toTime-container">
                    <label className="toTime-label">Off Boarding Time</label>
                    <input type="Time" onChange={(e) => setToTime((e.target.value))} value={toTime} placeholder="Off Boarding Time"  />
                </div>
                <div className="duration-container">
                    <label className="duration-label">Travel Duration</label>
                    <input type="Time" onChange={(e) => setDuration((e.target.value))} value={duration} placeholder="Total Travel Duration"  />
                </div>
                <div className="Price-container">
                    <label className="price-label">Price (Rs)</label>
                    <input type="number" onChange={(e) => setPrice((e.target.value))} value={price} placeholder="Price" />
                </div>
                <button onClick={handleUpdate} className="submit">Update</button>
            </section>
        </>
    )
}

export default FlightEdit
