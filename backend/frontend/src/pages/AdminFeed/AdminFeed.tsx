import React, { useEffect, useState } from "react";
import "pages/Table.scss";
import axios from "axios";
import SubmissionLineAdmin from "components/SubmissionLineAdmin";
import Header from "components/Header/Header";
import {getPercentage} from "../../components/State/State";

interface FileSubmission {
  _id: string,
  name: string,
  type: string,
  extracted: any[],
  createdAt: Date,
  isFlagged: boolean,
  user: {
    username: string
  }
}

function AdminFeed(): JSX.Element {
  const [files, setFiles] = useState<FileSubmission[]>([]);

  useEffect(() => {
    axios.get("/files").then((res) => setFiles(res.data));
  }, [])

  return (
    <div className="admin-feed">
      <Header username="gingerAle" isAdmin={true} />

      <div className="content">
        <table className={"submissions"}>
          <thead>
            <tr>
              <th/>
              {/* TODO: Add state
                <th>status</th>
                <th></th>
              */}
              <th>user</th>
              <th>name</th>
              <th>type</th>
              <th>date</th>
              <th/>
            </tr>
          </thead>

          <tbody>
            {files.map((submission) => (
              <SubmissionLineAdmin
                id={submission._id}
                key={submission._id}
                state={getPercentage(submission.extracted)}
                name={submission.name}
                type={submission.type}
                date={new Date(submission.createdAt)}
                isFlagged={submission.isFlagged}
                user={submission?.user?.username}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFeed;