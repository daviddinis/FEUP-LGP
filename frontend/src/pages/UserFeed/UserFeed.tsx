import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Header from "../../components/Header/Header";
import "./UserFeed.scss";
import "../Table.scss";
import "../../index.css";
import axios from "axios";
import document from "../../shared/icons/document.svg";
import SubmitionLineUser from "../../components/SubmitionLineUser";

function UserFeed() {
  
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post("/sendFile", formData, config);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="user-page">
      <header className={"header"}>
        <Header username="gingerAle" isAdmin={false} />

        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <img className={"icon document"} src={document} />
          <label className={"drop-file-label"}>
            <strong>choose a file</strong> or drag it here.
          </label>
        </div>
      </header>

      <div className="content">
        <table className={"submitions"}>
          <thead>
            <tr>
              <th>status</th>
              <th></th>
              <th>name</th>
              <th>type</th>
              <th>format</th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {acceptedFiles.map((submition) => {
              return (
                <SubmitionLineUser
                  key={1}
                  name={submition.name}
                  type={submition.type}
                  date={new Date(submition.lastModified).toLocaleDateString()}  //TODO: this date shouldn't be of the file, but of the submission
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserFeed;
