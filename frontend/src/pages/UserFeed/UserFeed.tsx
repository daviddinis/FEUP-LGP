import React, {useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../../components/Header/Header";
import "pages/UserFeed/UserFeed.scss";
import "pages/Table.scss";
import axios from "axios";
import document from "../../shared/icons/document.svg";
import SubmissionLineUser from "../../components/SubmissionLineUser";

function UserFeed(): JSX.Element {
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

  //TODO: only shows the latest uploaded files
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
        <table className={"submissions"}>
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
            {acceptedFiles.map((submission) => {
              return (
                <SubmissionLineUser
                  key={1} //TODO: change this for the submission id
                  state={20} //TODO: change this for the submission state -> try with undefined or remove
                  name={submission.name}
                  type={"report"} //TODO: change this for the submission type (report, ID, etc)
                  format={submission.type}
                  date={new Date(submission.lastModified)} //TODO: this date shouldn't be of the file, but of the submission
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
