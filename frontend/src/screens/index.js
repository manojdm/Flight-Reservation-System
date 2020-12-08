import React , {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { loadFlights } from '../actions/flightActions'
import {Link} from 'react-router-dom'
import '../css/index.css'

const Index = () => {

    const dispatch = useDispatch();

    const getFlights = useSelector(state => state.getFlights);
    const {loading , flights} = getFlights;

    useEffect(
        () => {
            dispatch(loadFlights())
        }
    , [dispatch])

    return (
    <section id="index">
        <h1>All the Availble Flights</h1>
                <section id="flightsList">
        {loading ? <h1>Loading......</h1> : 

            !loading && flights.reverse().map(flight => (
            <div key={flight._id} className="container flightsList-container">
                <div className="logo fa-2x"><i className="fas fa-plane"></i></div>
                <div className="details">
                    <p className="flightTitle">{flight.name}</p>
                    <p className="flightNo">{flight.number}</p>
                </div>
                <div className="flightDetails">
                    <div className="from">
                        <p className="from-title title">From <i className="fas fa-plane-departure"></i></p>
                        <p className="location">{flight.from}</p>
                        <p className="from-date date">{flight.toDate ? flight.toDate.substring(0 , 10) : '12-03-2020'}</p>
                        <p className="time">({flight.fromTime})</p>
                    </div>
                    <div className="to">
                        <p className="to-title title"><i className="fas fa-plane-arrival"></i> To</p>
                        <p className="location">Banglore</p>
                        <p className="to-date date">{flight.toDate ? flight.toDate.substring(0 , 10) : '12-03-2020'}</p>
                        <p className="time">({flight.toTime})</p>
                    </div>
                </div>
                <div className="onBoardTime">
                <p className="time">{`${flight.duration.split(":")[0]}h ${flight.duration.split(":")[1]}min`}</p>
                </div>
                <div className="price">
                    <p className="price">&#8377; {flight.price}</p>
                    <Link to={`/flight/${flight._id}`}><button className="details">More</button></Link>
                </div>
            </div>
            ))}
    </section>
    </section>
    )
}

export default Index
