import React, {useState, useEffect} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Loads stripe key
const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M');



export default function OwnerEventPopup({selectedDate, selectedEvent, onSave, onClose, isOwner}){

    // Holds values
    const [name, setName] = useState(selectedEvent?.title?.replace('Event - ', '') || '');
    const [startTime, setStartTime] = useState(selectedEvent?.start?.split('T')[1]?.slice(0, 5) || '');
    const [endTime, setEndTime] = useState(selectedEvent?.start?.split('T')[1]?.slice(0, 5) || '');
    const [location, setLocation] = useState('');
    const [paymentRequired, setPaymentRequired] = useState(false);
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [formReady, setFormReady] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);






// Combines date and time and stores the items on save
    const handleSubmit = (e) => {
        e.preventDefault();
        const dateTime = `${selectedDate || selectedEvent.start.split('T')[0]}T${startTime}`;
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

    // This will populate form if already exists or will clear for new form
    useEffect(() => {
        if (selectedEvent) {
          setName(selectedEvent.title?.replace('Event - ', '') || '');
          setStartTime(selectedEvent.start?.split('T')[1]?.slice(0, 5) || '');
          setEndTime(selectedEvent.start?.split('T')[1]?.slice(0, 5) || '');
          setLocation(selectedEvent.location || '');
          setPaymentRequired(selectedEvent.paymentRequired || false);
          setNotes(selectedEvent.notes || '');
          setAmount(selectedEvent.amount || '');
        } else {
          setName('');
          setStartTime('');
          setEndTime('');
          setLocation('');
          setPaymentRequired(false);
          setNotes('');
          setAmount('');
        }
        setFormReady(true)
      }, [selectedEvent]);
    

    //   disabled={!isOwner} 

    //   event popup form to create event
    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center">
            <div className="modal-content bg-white p-4 rounded shadow">
                <form onSubmit={handleSubmit} id='eventPopupContent'>
                    <div className="mb-3">

                    {selectedEvent && (
                    <div className="d-flex justify-content-end mb-3">
                    <button type="button" className="btn btn-outline-success">Share</button>
                    </div>
                    )}

                            <label className="form-label">Event Name:</label>
                            <input type="text" className="form-control"
                            placeholder="Enter name of event" value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            

                            <div className='row'>
                                <div className='col'>
                            <label className="form-label">Start Time:</label>
                            <input type="time" className="form-control mb-3" value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            />
                            </div>

                            <div className='col'>
                            <label className="form-label">End Time:</label>
                            <input type="time" className="form-control mb-3" value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            />
                            </div>

                            </div>

                            <label className="form-label">Location:</label>
                            <input type="text" className="form-control"
                            placeholder="Enter location or Address" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            />

                            <label className="form-label">Additional Notes</label>
                                <textarea className="form-control" rows="3"
                                    value={notes} onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            
                            <input className="form-check-input" type="checkbox" 
                            id="flexCheckDefault" checked={paymentRequired} onChange={(e) => setPaymentRequired(e.target.checked)}/>
                            <label className="form-check-label" htmlfor="flexCheckDefault">Payment Required</label>

                            {paymentRequired && (
                            <div className="mt-3">

                            <label className="form-label">Payment Amount</label>
                            <input type="number" className="form-control" placeholder="$0.00" value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            />

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
                                        <PaymentForm payment={amount} />
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

                
                <h5>Complete Payment</h5>
                <Elements stripe={stripePromise}>
                    <PaymentForm/>
                </Elements>

                </div>
            </div>
    );
}
  

