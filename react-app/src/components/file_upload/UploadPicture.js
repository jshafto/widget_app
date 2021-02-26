import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadPicture = () => {
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // note that you must NOT set the content type on your request
        // your client will set the content type correctly if you leave
        // it blank. if you include content-type, it won't get processed
        // correctly on the backend
        setImageLoading(true);
        const res = await fetch('/api/images', {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // },
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/images")
        }
        else {
            console.log("error")
        }
    }
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}


export default UploadPicture
