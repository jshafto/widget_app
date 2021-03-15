import React, { useState, useEffect } from "react";

const ViewImages = () => {
    const [images, setImages] = useState([])
    useEffect(() => {
        (async () => {
            const res = await fetch('/api/images');
            if (res.ok) {
                const data = await res.json();
                setImages(data.images)
            } else {
                console.log("error")
            }

        })();
    }, [])
    return (
        <div style={{
            display:"flex", 
            flexDirection: "column", 
            width: "100vw",
            alignItems: "center"
        }}>
            <h1>Images</h1>
            {images.map(im => (
                <div
                    key={im.id}
                    style={{ 
                        backgroundImage: `url(${im.url})`, 
                        backgroundSize: "contain", 
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "50%", 
                        height: 250,
                        margin: 10,
                        // width: "auto",
                    }} />
            ))}
        </div>
    )
}

export default ViewImages;
