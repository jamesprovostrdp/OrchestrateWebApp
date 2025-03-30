import React, {useState, useEffect} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M');



export default function OwnerEventPopup({selectedDate, selectedEvent, onSave, onClose}){

    const [name, setName] = useState(selectedEvent?.title?.replace('Event - ', '') || '');
    const [time, setTime] = useState(selectedEvent?.start?.split('T')[1]?.slice(0, 5) || '');
    const [location, setLocation] = useState('');
    const [paymentRequired, setPaymentRequired] = useState(false);
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [formReady, setFormReady] = useState(false);




    const handleSubmit = (e) => {
        e.preventDefault();
        const dateTime = `${selectedDate || selectedEvent.start.split('T')[0]}T${time}`;
        if (name.trim()) {
            const displayTitle = `${paymentRequired ? ' $ ' : ''} ${name}`;
            onSave ({
                title: displayTitle,
                start: dateTime,
                location,
                paymentRequired,
                notes,
                amount,
            });
            onClose();
        }
    }

    useEffect(() => {
        if (selectedEvent) {
          setName(selectedEvent.title?.replace('Event - ', '') || '');
          setTime(selectedEvent.start?.split('T')[1]?.slice(0, 5) || '');
          setLocation(selectedEvent.location || '');
          setPaymentRequired(selectedEvent.paymentRequired || false);
          setNotes(selectedEvent.notes || '');
          setAmount(selectedEvent.amount || '');
        } else {
          setName('');
          setTime('');
          setLocation('');
          setPaymentRequired(false);
          setNotes('');
          setAmount('');
        }
        setFormReady(true)
      }, [selectedEvent]);
    

    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center">
            <div className="modal-content bg-white p-4 rounded shadow">
                <form onSubmit={handleSubmit} id='eventPopupContent'>
                    <div className="mb-3">
                            <label className="form-label">Event Name:</label>
                            <input type="text" className="form-control"
                            placeholder="Enter name of event" value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            
                            <label className="form-label">Time:</label>
                            <input type="time" className="form-control mb-3" value={time}
                            onChange={(e) => setTime(e.target.value)}
                            />

                            <label className="form-label">Location:</label>
                            <input type="text" className="form-control"
                            placeholder="Enter location or Address" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            />

                            <label className="form-label">Additional Notes</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={paymentRequired} onChange={(e) => setPaymentRequired(e.target.checked)}/>
                            <label className="form-check-label" htmlfor="flexCheckDefault">Payment Required</label>

                            {paymentRequired && (
                            <div className="mt-3">
                                <label className="form-label">Payment Amount</label>
                                <input
                                type="number"
                                className="form-control"
                                placeholder="$0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                />

                                <div className="mt-4">
                                    <h5>Complete Payment</h5>
                                    <Elements stripe={stripePromise}>
                                        <PaymentForm />
                                    </Elements>
                                    </div>

                            </div>
                            )}
                 
                            <div className="mt-4">
                                <button type="submit" className="btn btn-success me-2">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    );
}
  