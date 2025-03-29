import React, {useState} from 'react';

export default function OwnerEventPopup({selectedDate, selectedEvent, onSave, onClose}){

    const [name, setName] = useState(selectedEvent?.title?.replace('Event - ', '') || '');
    const [time, setTime] = useState(selectedEvent?.start?.split('T')[1]?.slice(0, 5) || '');
    const [location, setLocation] = useState('');
    const [paymentRequired, setPaymentRequired] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dateTime = `${selectedDate || selectedEvent.start.split('T')[0]}T${time}`;
        if (name.trim()) {
            onSave ({
                title: ` - ${name}`,
                start: dateTime,
            });
            onClose();
        }
    }

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

                            <label for="exampleTextarea" class="form-label mt-4">Additional Notes</label>
                            <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
                            
                                <input class="form-check-input" type="checkbox" value="Payment Required" id="flexCheckDefault"></input>
                                <label class="form-check-label" htmlfor="flexCheckDefault">Default checkbox</label>
                                
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
  