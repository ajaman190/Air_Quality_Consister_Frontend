import "./Converter.css"
import LinearProgress from '@mui/material/LinearProgress';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import GraphComponent from "./Graph";


const Converter = () => {
    const [taskId, setTaskId] = useState('');
    const [uploadUrl, setUploadUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [processedDataUrl, setProcessedDataUrl] = useState('');
    const [unprocessedDataUrl, setUnprocessedDataUrl] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchPresignedUrl = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/air-quality/new-task/');
                setTaskId(response.data.data.task_id);
                setUploadUrl(response.data.data.unprocessed_file_url);
                console.log(response)
            } catch (error) {
                console.error('Error fetching presigned URL:', error);
            }
        };
        fetchPresignedUrl();
    }, []);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileUpload = async () => {
        if (selectedFile && uploadUrl) {
            setUploading(true);
            try {
                const headers = { 'Content-Type': 'text/csv' };
                await axios.put(uploadUrl, selectedFile, { headers });
                await axios.post(`http://127.0.0.1:8000/api/v1/air-quality/mark-upload-complete/`, { task_id: taskId });
                setUploading(false);
            } catch (error) {
                console.error('Error uploading file:', error);
                setUploading(false);
            }
        }
    };

    const startProcessing = async () => {
        setProcessing(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/air-quality/process-file/', { task_id: taskId });
            setProcessedDataUrl(response.data.data.processed_file_url);
            setUnprocessedDataUrl(response.data.data.unprocessed_file_url);
            setProcessing(false);
        } catch (error) {
            console.error('Error processing file:', error);
            setProcessing(false);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 center'>
                    <h1 className='cloud_file_converter mb-4 mt-lg-5'>
                        Aurassure AQI Guardian
                    </h1>
                    <p className='file_converter_description'>Elevate your air quality data with Aurassure Guardian—an intelligent Python app and web platform. Seamlessly process, visualize, and enhance the accuracy of your air quality datasets, ensuring every minute counts.</p>
                </div>
                <div className='col-12'>
                    {!selectedFile &&
                        <div
                            className="image_upload_click"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                                accept=".csv"
                            />
                            <p>Click or Drop your CSV Dataset</p>
                        </div>
                    }
                    {selectedFile && !uploading && !processing &&
                        <div className="image_upload_click">
                            <p>Selected file: {selectedFile.name}</p>
                            <button className="upload_button" onClick={handleFileUpload}>Upload</button>
                        </div>
                    }
                    {(uploading || processing) && <LinearProgress />}
                    {!uploading && !processing && selectedFile && processedDataUrl !== '' &&
                        <button className="process_btn" onClick={startProcessing}>Start Processing</button>
                    }
                    {processedDataUrl !== '' &&
                        <div>
                            {/* Here you would integrate your graph component, utilizing processedDataUrl */}
                            <a href={processedDataUrl} download className="download_processed_btn">Download Processed Data</a>
                        </div>
                    }
                    {(processedDataUrl !== '' && unprocessedDataUrl !== '') && 
                    <GraphComponent processedDataURL={processedDataUrl} unprocessedDataURL={unprocessedDataUrl}/>}
                </div>
            </div>
        </div>
    );
}

export default Converter
