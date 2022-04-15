import React, { useState } from 'react';
import '../chat.css';
import up from './assets/up.png';
import down from './assets/down.png';
import io from 'socket.io-client';
import { connect } from 'react-redux';
function Chat(props) {
  const [chatDetails, setChatDetails] = useState({
    messages: [],
    typedMessage: '',
  });
  const [windowDetails, setWindow] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
  };
  const socket = io.connect(`http://localhost:5000`);
  const userEmail = props.user.email;
  if (userEmail) {
    setUpConnections();
  }
  function setUpConnections() {
    const socketConnection = socket;
    socket.on('connect', function () {
      socketConnection.emit('join_room', {
        useremail: userEmail,
        chatroom: 'codeial',
      });
      socketConnection.on('userjoined', function (data) {});
    });
  }
  socket.on('receive_message', function (data) {
    const messageObject = {};
    messageObject.content = data.message;
    messageObject.useremail = data.useremail;
    if (data.useremail === userEmail) {
      messageObject.self = true;
    }
    setChatDetails({
      messages: [...chatDetails.messages, messageObject],
      typedMessage: '',
    });
  });

  const handleSubmit = () => {
    const { typedMessage } = chatDetails;
    setChatDetails({
      ...chatDetails,
      messages: [...chatDetails.messages, { content: typedMessage }],
      typedMessage: '',
    });
    if (typedMessage && userEmail) {
      socket.emit('send_message', {
        message: typedMessage,
        useremail: userEmail,
        chatroom: 'codeial',
      });
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat
        <img
          src={windowDetails ? down : up}
          onClick={(e) => {
            e.preventDefault();
            setWindow(!windowDetails);
          }}
          alt="arrow"
          height={17}
        />
      </div>
      <div className="gg" style={{ height: windowDetails ? '357px' : '0px' }}>
        <div className="chat-messages">
          {chatDetails?.messages?.map((message) => {
            return (
              <div
                className={
                  message.self
                    ? 'chat-bubble self-chat'
                    : 'chat-bubble other-chat'
                }
              >
                <div style={{ fontSize: '9px', fontWeight: '700' }}>
                  {message.useremail}
                </div>
                {message?.content}
              </div>
            );
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={chatDetails.typedMessage}
            onChange={(e) => {
              setChatDetails({
                ...chatDetails,
                typedMessage: e.target.value,
              });
            }}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
