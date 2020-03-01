import React from 'react';
import { mediaTypes } from '../../../config/uploads.json';

const Media = props => {
    let mediaType = props.type;
    if (props.mimeTypes === true) mediaType = mediaTypes[props.type];
    if (!mediaType) return null;

    switch (mediaType) {
        case "image":
        case "photo":
            return (
                <img src={props.src} className={props.styleClass} />
            );
        case "video":
            return (
                <video controls className={props.styleClass}>
                    <source src={props.src} type="video/mp4" />
                    Sorry, your browser does not support HTML5 Video Tag.
                </video>
            );
        case "audio":
            return (
                <audio controls src={props.src} className={props.styleClass}>
                    Sorry, your browser does not support HTML5 Audio Tag.
                </audio>
            );
    }

    return null;
}

export default Media;