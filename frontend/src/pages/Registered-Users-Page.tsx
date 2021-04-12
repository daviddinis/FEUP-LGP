import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import './Registered-Users-Page.scss';
import axios from "axios";
import Header from "../components/Header";
import details from '../shared/icons/details.svg';


interface IUser {
  username: string
}


function RegisteredUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);

  const onDrop = useCallback(acceptedFiles => {

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post("/sendFile", formData, config);
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

  const fileList = (files: FileWithPath[]): ReactNode => (
    files.map(file => (
      <div className={'file-info'} key={file.path}>
        <p><span className={ 'status-icon' } />100%</p>
        <p>{file.name}</p>
        <p>tipo</p>
        <p>{file.type}</p>
        <p>{file.lastModified}</p>
        <p><img
          className={'details-icon'}
          src={details} /></p>
      </div>
    ))
  );


  return (
    <div className="registered-users-page">
      <header className={'header'}>
        <Header
          username="Miller"
          isAdmin={true} />
      </header>
      {/* <div className={'files-table'}>
        <div className={'column-names'}>
          <p>ols</p>
          <p>name</p>
          <p>type</p>
          <p>format</p>
          <p>date</p>
        </div>
        <div className={'table'}>
          {fileList(acceptedFiles)}
        </div>
      </div> */}
    </div>
  );
}

export default RegisteredUsersPage;