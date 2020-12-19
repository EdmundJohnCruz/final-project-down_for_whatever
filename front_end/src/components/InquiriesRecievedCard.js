import React from 'react';
import axios from 'axios';
import { Form, Card, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const InquiriesRecievedCard = ({ inquiry }) => {
    const userName = useSelector(state => state.userReducer.userName);
    const [showChatRecieved, setShowChatRecieved] = React.useState(false);
    const handleShow = () => setShowChatRecieved(true);
    const handleClose = () => setShowChatRecieved(false);

    return (
        <div class="btn btn-block">
            <Card border="secondary" style={{ margin: "15px", }} onClick={handleShow}>
                <Card.Header className="text-muted text-center small">Click anywhere to open this chat</Card.Header>
                <Card.Body className="text-center"> <b>{inquiry.buyerId}</b> sent you an inquiry about your listing titled : <b>"{inquiry.listingTitle}"</b></Card.Body>
                <Card.Footer className="text-muted text-center small"> Listing ID : {inquiry.listingId}</Card.Footer>
            </Card>

            <ChatRecievedModal show={showChatRecieved} onHide={handleClose} animation={false}/>
        </div>
    )

    function ChatRecievedModal(props) {
        const [messageToSend, setMessageToSend] = React.useState(); //  both ends of the chat log are effected by this. (Wipes textarea)
        const messages = inquiry.message;

        const sendMessage = e => {
            e.preventDefault();
            const data = {
                userName: userName,
                message: messageToSend,
                _id: inquiry._id,
            }
            axios.post('/api/inquiryserver/reply', { body: data })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            setMessageToSend("");   //  might have problems with timing? like reseting before sending.
        };

        const handleChange = e => {
            e.preventDefault();
            setMessageToSend(e.target.value);
        }

        return (
            <div>
                <Modal {...props} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{inquiry.listingTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body block>
                        <div style={{ padding: "10px", backgroundColor: "lightgrey", border : "3px solid black", borderRadius: "15px 0px 0px 15px", overflowY: "scroll", maxHeight: "50vh"}}>
                            {Array.from(messages).map(message => {
                                return (
                                    <p>{message}</p>
                                )
                            })}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Body>
                            <Form className="block">
                                <Form.Group>
                                    <Form.Control placeholder="Type your message here ..." as="textarea" rows={2} value={messageToSend} onChange={handleChange} required />
                                </Form.Group>
                                <button type="button" class="btn btn-primary float-right" onClick={sendMessage}>Send</button>
                                <button type="button" class="btn btn-primary float-left" onClick={handleClose} formNoValidate>Close</button>
                            </Form>
                        </Modal.Body>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default InquiriesRecievedCard;