import React, {useEffect, useRef} from 'react';

const Message = props => {
    let className = 'chat-message';
    if (props.message.fromUs) className += ' own-message';

    const messageRef = useRef(null);

    useEffect(_ => {
        if (props.scrollTarget) {
            messageRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [props.scrollTarget]);

    return (
    <div className={className} ref={messageRef}>
        <p className = 'message-text'>{props.message.text}</p>
        <p className = 'message-date'>{props.message.date}</p>
    </div>
    );
}

export default Message;