import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './PostUpload.module.css';

function PostUpload({email, onPostUploaded}){
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [imageError, setImageError] = useState(false);
    const [userPrivacy, setUserPrivacy] = useState('public');
    
    useEffect(() => {
        if (imageUrl && imageUrl.trim() !== "") {
            setPreviewUrl(imageUrl);
            setImageError(false);
        } else {
            setPreviewUrl("");
        }
    }, [imageUrl]);
    useEffect(() => {
        async function fetchUserPrivacy() {
            try {
                const response = await axios.get("http://localhost:5000/auth/users");
                const user = response.data.find(u => u.email === email);
                if (user) {
                    setUserPrivacy(user.privacy || 'public');
                }
            } catch (err) {
                console.error("Error fetching user privacy:", err);
            }
        }
        fetchUserPrivacy();
    }, [email]);

    const handleImageError = () => {
        setImageError(true);
    };
    
    const clearImage = () => {
        setImageUrl("");
        setPreviewUrl("");
        setImageError(false);
    };

    const handleUpload = async () => {
        if (!imageUrl.trim()) {
            alert("Please enter an image URL");
            return;
        }

        if (imageError) {
            alert("Please enter a valid image URL");
            return;
        }

        setIsUploading(true);
        
        try {
            const response = await axios.post("http://localhost:5000/post/upload", {
                imageUrl,
                email,
                isProfileOnly: true,
                isPrivate: userPrivacy === 'private'
            });
            
            alert("Post uploaded successfully!");
            setImageUrl("");
            onPostUploaded();
        } catch(err){
            console.error("Upload failed: ", err);
            
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
            }
            
            alert("Failed to upload post. Please check the console for details.");
        } finally {
            setIsUploading(false);
        }
    }
    
    return (
        <>
            <div className={styles.uploadContainer}>
                <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={styles.uploadInput}
                    disabled={isUploading}
                />
                <button 
                    onClick={handleUpload}
                    disabled={isUploading || imageError}
                    className={styles.uploadButton}
                >
                    {isUploading ? 'Uploading...' : 'Upload Post'}
                </button>
            </div>
            
            {previewUrl && (
                <div className={styles.previewContainer}>
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className={styles.imagePreview}
                        onError={handleImageError}
                    />
                    {!imageError && (
                        <button onClick={clearImage}>Clear Image</button>
                    )}
                    {imageError && (
                        <p style={{ color: 'red', fontSize: '14px' }}>Invalid image URL</p>
                    )}
                </div>
            )}
        </>
    )
}

export default PostUpload;
