import React, { ReactNode, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import './User-Page.scss';
import axios from "axios";
import Header from "../components/Header";

interface IUser {
  username: string
}

function UserPage() {
  const [users, setUsers] = useState<IUser[]>([]);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  // This is another component but concise example
  const fileList = (files: FileWithPath[]): ReactNode => (
    files.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ))
  );

  useEffect(() => {
    axios.get("/users").then(res => {      
      setUsers(res.data);
      console.log(res.data);
    })
  }, []);


  return (
    <div className="user-page">
      <header className={ 'header' }>
        <Header
          username="gingerAle"
          isAdmin={ false }/>
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <img
              className={ 'document-icon' }
              src={ '../shared/icons/document.png' }/>
            <label className={ 'drop-file-label' }><strong>choose a file</strong> or drag it here.</label>
          </div>
      </header>
      <aside>
        <ul>{fileList(acceptedFiles)}</ul>
      </aside>
    </div>
  );
}

export default UserPage;
