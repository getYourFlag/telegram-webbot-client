import React, {useState} from 'react';
import '../css/chatDisplay.css';
import { useDispatch } from 'react-redux';
import { sendMessages } from '../actions/sender';

const MessageSender = props => {
    const [inputText, setInputText] = useState('')
    const dispatch = useDispatch();

    return (<div className='message-sender'>
        <input type='text' name='message' value={inputText} onChange={e => setInputText(e.target.value)}></input>
        <button className='send-button' onClick={_ => {
            dispatch(sendMessages({
                text: inputText,
                chat_id: props.currentChat,
                bot_id: props.currentBot
            }));
            setInputText('');
        }}>SEND</button>
    </div>);
}

export default MessageSender;