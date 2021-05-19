import React, {useCallback, useEffect, useState} from "react";
import { useDropzone } from "react-dropzone";
import Header from "components/Header/Header";
import "pages/UserFeed/UserFeed.scss";
import axios from "axios";
import document from "shared/icons/document.svg";
import SubmissionUserTable from "components/SubmissionTable/SubmissionUserTable/SubmissionUserTable";
import UserSubmission from "models/UserSubmission";
import { getPercentage } from "components/State/State";

interface FileSubmission {
  _id: string,
  name: string,
  type: string,
  extracted: any[],
  createdAt: Date
}

function UserFeed(): JSX.Element {
  const [files, setFiles] = useState<FileSubmission[]>([]);

  useEffect(() => {
    axios.get("/api/files").then((res) => setFiles(res.data));
  }, [])

  const onDrop = useCallback((_acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", _acceptedFiles[0]);

    axios.post("/api/files/submit", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then((res) => {
      setFiles((oldFiles) => [res.data].concat(oldFiles));
    });
  }, []);

  const submissions: UserSubmission[] = [];

  files.forEach((file) => submissions.push({
    id: file._id,
    name: file.name,
    type: file.type,
    date: new Date(file.createdAt),
    state: getPercentage(file.extracted),
  }));


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
        <SubmissionUserTable submissions={submissions}/>
        </div>
    </div>
  );
}

export default UserFeed;
