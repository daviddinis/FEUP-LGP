import React, { useEffect, useState } from "react";
import "pages/Table.scss";
import axios from "axios";
import SubmissionLineAdmin from "components/SubmissionLineAdmin";
import Header from "components/Header/Header";

interface FileSubmission {
  _id: string,
  name: string,
  type: string,
  extracted: any[],
  createdAt: Date,
  isFlagged: boolean
}

function AdminFeed(): JSX.Element {
  const [files, setFiles] = useState<FileSubmission[]>([]);

  useEffect(() => {
    axios.get("/files").then((res) => setFiles(res.data));
  }, [])

  /*
  for (let i = 0; i !== files.length; i++) {
    const id = files[i]._id;
    const name = files[i].name;

    submissions.push({
      id,
      isFlaged: false,
      user: "pc",
      documentName: name,
      type: "extract",
      format: "pdf",
      date: new Date("2012-01-30"),
    });

    console.log(submissions);
  }

   */

  return (
    <div className="admin-feed">
      <Header username="gingerAle" isAdmin={true} />

      <div className="content">
        <table className={"submissions"}>
          <thead>
            <tr>
              <th></th>
              {/* TODO: Add state
                <th>status</th>
                <th></th>
              */}
              <th>user</th>
              <th>type</th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {files.map((submission) => {
              const percentage = submission.extracted ?
                  100 * submission.extracted.filter(param => param.content).length / submission.extracted.length : undefined;

              return (
                  <SubmissionLineAdmin
                      id={submission._id}
                      key={submission._id}
                      state={percentage}
                      name={submission.name}
                      type={submission.type}
                      date={new Date(submission.createdAt)}
                      isFlagged={submission.isFlagged}
                      user="Moaaas"
                  />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFeed;