import React, {useCallback, useEffect, useState} from "react";
import { useDropzone } from "react-dropzone";
import Header from "components/Header/Header";
import "pages/UserFeed/UserFeed.scss";
import "pages/Table.scss";
import axios from "axios";
import document from "shared/icons/document.svg";
import SubmissionLineUser from "components/SubmissionLineUser";

interface FileSubmission {
  _id: number,
  name: string,
  type: string,
  extracted: any[],
  createdAt: Date
}

function UserFeed(): JSX.Element {
  const [files, setFiles] = useState<FileSubmission[]>([]);

  useEffect(() => {
    axios.get("/files").then((res) => setFiles(res.data));
  }, [])

  const onDrop = useCallback((_acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", _acceptedFiles[0]);

    console.log(_acceptedFiles.length);

    axios.post("/sendFile", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then((res) => {
      setFiles((oldFiles) => oldFiles.concat([res.data]));
    });
  }, []);

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
        <table className={"submissions"}>
        <thead>
            <tr>
              <th>status</th>
              <th/>
              <th>name</th>
              <th>type</th>
              <th>date</th>
            </tr>
          </thead>

          <tbody>
            {files.map((submission) => {
              const percentage = submission.extracted ?
                  100 * submission.extracted.filter(param => param.content).length / submission.extracted.length : undefined;

              return (
                <SubmissionLineUser
                  key={submission._id}
                  state={percentage}
                  name={submission.name}
                  type={submission.type}
                  date={new Date(submission.createdAt)}
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
