import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {savePassengersDetails} from '../actions/flightActions'
import {loadFlight} from '../actions/flightActions'

const Passenger = ({seats , id , callFunction , showWarning}) => {
    const [count, setCount] = useState(1);

    const [name , setName] = useState('');
    const [age , setAge] = useState(0);
    const [seat , setSeat] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userData} = userLogin;

    const getFlight = useSelector(state => state.getFlight);
    const {loading : loadingFlight , flight} = getFlight;

    const flightDetails = useSelector(state => state.getFlight)
    const {loading , flight : Flight} = flightDetails;

    let seatsFilled;

    if(!loading){
        seatsFilled = Flight.seats ? Flight.seats : [];
    }

    useEffect(
        () => {

            dispatch(loadFlight(id));
        }
    , [dispatch , id])

    const handleSubmit = () => {

    if(!loading && seatsFilled.indexOf(seat) == -1){
        if(count >= seats) {
            seatsFilled.push(seat)
            dispatch(savePassengersDetails({name , age , seat , flight : flight._id , user : userData._id}))
            callFunction()
        } else {
            if(!loadingFlight){
                seatsFilled.push(seat)
                dispatch(savePassengersDetails({name , age , seat , flight : flight._id , user : userData._id}))
                setTimeout(() => {
                    setName('')
                    setAge(0)
                    setSeat('')
                    setCount(count + 1)
                } , 1000)

                }
            }
    } else {
        showWarning();
    }
    }

    return (

        Number(count)<=seats ? 

                <div className="details-container">
                    <p className="title">Passenger {count}</p>
                    <div className="grid-container">
                        <div className="div name">
                            <label className="name-label" htmlFor="name">Passenger Name</label>
                            <input onChange={e => setName(e.target.value)} type="text" value={name} placeholder="Passenger's Name" />
                        </div>
                        <div className="div age">
                            <label className="age-label" htmlFor="age">Age</label>
                            <input onChange={e => setAge(e.target.value)} type="number" value={age} placeholder="Passenger's Age" />
                        </div>
                        <div className="div seat">
                            <label className="seat-label" htmlFor="seats">Seat No</label>
                            <input onChange={e => setSeat(e.target.value)} type="text" value={seat} placeholder="Passenger's Seat Number"/>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="save-btn div">Save</button>
                </div>
        
        : <p>You have successfully filled the form!! checkout the next steps</p>

    );
}

export default Passenger
