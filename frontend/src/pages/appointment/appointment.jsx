import React, { useEffect, useState } from 'react';
import CardCabinet from '../../components/CardCabinet';
import axios from '../../utils/axios'; 
import { useAuth } from '../../utils/AuthContext';

const Appointment = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
console.log("user ici : ",user);
    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`/appointments/user/${user.user_id}`);
            setAppointments(response.data); 
        } catch (error) {
            console.log(error);
        }
    };

    console.log("appointments ici : ",appointments);

    return (
         <div className='container' style={{height: "90vh"}}>
        <div className='row' style={{overflow : "auto", height : "100%"}}>


            {
            appointments.length !== 0  ?
            appointments.map((appointment) => (
                <CardCabinet
                className='col-7'
                    key={appointment.id}
                    appointment={appointment} 
                />
            )) : <h1>Vous n'avez pas de rendez-vous</h1>}
        </div>
        </div>
    );
};

export default Appointment;
