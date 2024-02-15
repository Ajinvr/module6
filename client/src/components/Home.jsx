import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const notify = (status, message) => {
    toast[status](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

 let fileid = [] 

  const [file, setFile] = useState(null);
  const [downloadId, setDownloadId] = useState('');
  
  
  useEffect(() => {
       localStorage.setItem('fileids', fileid);
  }, []);
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownloadIdChange = (e) => {
    setDownloadId(e.target.value);
  };

  const uploadFile = async () => {
    if (!file) {
      notify("error", "Select a valid file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.toaststatus === "error") {
        notify("error", "Upload failed, try again");
        return;
      }
      alert(`your file id is "${response.data.fileid}" Save it somewhere safe !!!`)
      let fileids = localStorage.getItem('fileids');
      fileid.push(fileids)
      fileid.push(response.data.fileid)
      console.log(fileid);
      localStorage.setItem('fileids',fileid);
       
      notify("success", "File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.log('Error uploading file:', error);
      notify("error", "Error uploading file");
    }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.post('http://localhost:4000/get', { _id: downloadId }, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `download.${response.headers['content-type'].split('/')[1]}`);
      document.body.appendChild(link);
      link.click();
      notify("success", "File downloaded successfully!");
    } catch (error) {
      console.error('Error downloading file:', error);
      notify("error", "Error downloading file");
    }
  };

  return (
    <div>
      <div className='aligncenter'>
        <div className="file-upload-container">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button onClick={uploadFile} className="upload-button">Upload</button>
          <input type="text" value={downloadId} onChange={handleDownloadIdChange} placeholder="Enter File ID" className="download-input" />
          <button onClick={downloadFile} className="download-button">Download</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
 
}

export default Home;
