import React from 'react'
import Talk from 'talkjs';
import { useCallback } from 'react';
import './chat.css'
import { Chatbox, Session } from "@talkjs/react";

const Chat = ({ userRecogID }) => {

  if (userRecogID === null) {
    return;
  }

  console.log(userRecogID);

  //needed values: my user id, other user id, conversation id.

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: userRecogID,
        name: 'Nina',
        email: 'nina@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('new_conversatio');

    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
    });
    // conversation.setParticipant(session.me);
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);


  return (
    <div className='mt-10'>
      <Session appId="tDWNIfmG" syncUser={syncUser}>
        {/* <Chatbox conversationId="" className='h-[600px]' /> */}
        <Chatbox
          syncConversation={syncConversation}
          style={{ width: '100%', height: '500px' }}
        ></Chatbox>
      </Session >
    </div>
  );
}

export default Chat;