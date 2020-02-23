import React, {useEffect, useRef} from 'react';

const Message = props => {
    let className = 'chat-message';
    if (props.message.fromUs) className += ' own-message';
    if (props.message.isSystemMessage) className = 'system-message';

    const messageRef = useRef(null);

    useEffect(_ => {
        if (props.scrollTarget) {
            messageRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [props.scrollTarget]);

    let date = props.message.date;
    date = new Date(date).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
    <div className={className} ref={messageRef}>
        <p className = 'message-text'>{props.message.text}</p>
        <p className = 'message-date'>{date}</p>
    </div>
    );
}

export default Message;