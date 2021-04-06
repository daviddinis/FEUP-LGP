import React, { ReactNode, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import './User-Page.scss';
import axios from "axios";
import Header from "../components/Header";

interface IUser {
  username: string
}

/*
<li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
      */

function UserPage() {
  const [users, setUsers] = useState<IUser[]>([]);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  // This is another component but concise example
  const fileList = (files: FileWithPath[]): ReactNode => (
    files.map(file => (
      

      <div className={'file-info'} key={file.path}>
        <p></p>
        <p>100%</p>
        
        <p>{file.name}</p>
        <p>tipo</p>
        <p>{file.type}</p>
        <p>{file.lastModified}</p>
        <p><img
              className={ 'details-icon' }
               src={ '../shared/icons/details.png' }/></p>
      </div>

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
      <div className={ 'files-table' }>
        <div className={ 'column-names' }>
          <p>status</p>
          <p>name</p>
          <p>type</p>
          <p>format</p>
          <p>date</p>
        </div>

        <div className={'table'}>
          {fileList(acceptedFiles)}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
