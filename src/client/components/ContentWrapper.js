import React from 'react';
import '../css/navbar.css';

const ContentWrapper = props => {
    return (
        <div className = 'content'>
            {props.children}
        </div>
    );
}

export default ContentWrapper;