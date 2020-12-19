import React from 'react';
import axios from 'axios';
import { Form, Card, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const InquiriesSentCard = ({ inquiry }) => {
    const userName = useSelector(state => state.userReducer.userName);
    const [showChatSent, setShowChatSent] = React.useState(false);
    const handleShow = () => setShowChatSent(true);
    const handleClose = () => setShowChatSent(false);

    return (
        <div class="btn btn-block">
            <Card border="secondary" style={{ margin: "15px", }} onClick={handleShow}>
                <Card.Header className="text-muted text-center small">Click anywhere to open this chat...</Card.Header>
                <Card.Body className="text-center">You made an inquiry about <b>"{inquiry.listingTitle}"</b> to seller : {inquiry.sellerName} </Card.Body>
                <Card.Footer className="text-muted text-center small"> Listing ID : {inquiry.listingId}</Card.Footer>
            </Card>

            <ChatSentModal show={showChatSent} onHide={handleClose} animation={false}/>
        </div>
    )

    function ChatSentModal(props) {
        const [messageToSend2, setMessageToSend2] = React.useState(); //  both ends of the chat log are effected by this. (Wipes textarea)
        const messages = inquiry.message;

        const sendMessage = e => {
            e.preventDefault();
            const data = {
                userName: userName,
                message: messageToSend2,
                _id: inquiry._id,
            }
            axios.post('/api/inquiryserver/reply', { body: data })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            setMessageToSend2("");   //  might have problems with timing? like reseting before sending.
        };

        const handleChange = e => {
            e.preventDefault();
            setMessageToSend2(e.target.value);
        }

        return (
            <div>
                <Modal {...props} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{inquiry.listingTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                    <Form.Control placeholder="Type your message here ..." as="textarea" rows={2} value={messageToSend2} onChange={handleChange} required />
                                </Form.Group>
                                <button type="button" class="btn btn-primary float-left" onClick={handleClose} formNoValidate>Close</button>
                                <button type="button" class="btn btn-primary float-right" onClick={sendMessage}>Send</button>
                            </Form>
                        </Modal.Body>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default InquiriesSentCard;