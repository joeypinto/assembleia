import React from 'react';

const VideoEmbed = ({ src = '', width = 1280, height = 720 }) => {
    
    if(src){
        return <div>
            <iframe 
                style={{width: width, height: height}} 
                src={src} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
        </div>
    }

    return null
}

export default VideoEmbed;