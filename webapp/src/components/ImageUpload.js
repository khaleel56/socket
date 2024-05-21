import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

let socket;

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [images, setImages] = useState([]);

    useEffect( ()=>{
        fetchImages()

        socket = io('http://localhost:5000')
        socket.connect();
        socket.on("uploadDocument", (filename)=>{
          setImages(images.push(filename))
        });
        return () => {
          socket.disconnect();
      }

      }, []);

        // socket = io('http://localhost:5000')
        // // (window.location.origin, { path: '/sopraData/socket.io', autoConnect: false, transports: ['polling'], reconnectionAttempts: 5 });

        // socket.connect();

        // socket.on("uploadDocument", (argUserId, argDocumentName) => {
        //     // if (argUserId === props.dealerId && Object.keys(docLoaders).includes(argDocumentName)) {
        //     //     setDocLoaders({
        //     //         ...docLoaders,
        //     //         [argDocumentName]: true
        //     //     });
        //     //     setLoadingText('Uploading...');
        //     //     getFiles();
        //     //     setTimeout(() => {
        //     //         setDocLoaders({
        //     //             ...docLoaders,
        //     //             [argDocumentName]: false
        //     //         })
        //     //     }, 2000);
        //     // }
        // });

        // return () => {
        //     socket.disconnect();
        // }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const fetchImages = async () => {
        try {
          const response = await axios.get('http://localhost:5000/app/getDocuments'); 
          const fetchedImages = response.data.images;
          setImages(fetchedImages);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            return; // Handle no image selected case
        }


        setUploadStatus('uploading');
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await fetch('http://localhost:5000/app/uploadDocument', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const uploadedImageInfo = await response.json();
            setUploadStatus('success');   
            fetchImages()        
            // Use socket.io to emit data (explained later)
            // emitImageInfo(uploadedImageInfo);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('failed'); // Update UI with upload failure
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload} disabled={uploadStatus === 'uploading'}>
                {uploadStatus === 'idle' ? 'Upload Image' : uploadStatus}
            </button>
            <br></br>
            <div>
      <h2>Available Images</h2>
      {images.length > 0 ? (
        <ul>
          {images.map((image) => (
            <li key={image._id}>  
              <span>Filename: {image.filename}</span>
              {/* <span>Original Name: {image.originalname}</span> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No images found.</p>
      )}
    </div>
        </div>
    );
}

export default ImageUpload;
