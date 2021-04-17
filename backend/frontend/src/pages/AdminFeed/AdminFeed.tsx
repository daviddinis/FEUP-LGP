import React, { useEffect, useState } from "react";
import "pages/Table.scss";
import axios from "axios";
import SubmissionLineUser from "components/SubmissionLineUser";
import Header from "components/Header/Header";

interface File {
  _id: string;
  path: string;
  name: string;
}

interface Submission {
  id: string;
  name: string;
  documentName: string;
  type: string;
  format: string;
  date: Date;
  state: number,
}

function AdminFeed(): JSX.Element {
  const [files, setUsers] = useState<File[]>([]);

  useEffect(() => {
    axios.get("/files").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  //TODO: erase submissions content after we have a seed in db
  const submissions: Submission[] = [
    {
      id: "1",
      state: 5,
      name: "filipasenra",
      documentName: "anualreportdocura",
      type: "extract",
      format: "pdf",
      date: new Date("2021-03-25"),
    },
    {
      id: "2",
      state: 10,
      name: "claudiasilva",
      documentName: "IDClaudia",
      type: "pdf",
      format: "jpeg",
      date: new Date("2021-03-21"),
    },
  ];

  for (let i = 0; i !== files.length; i++) {
    const id = files[i]._id;
    const name = files[i].name;

    submissions.push({
      id,
      name: "pc",
      documentName: name,
      type: "extract",
      format: "pdf",
      date: new Date("2012-01-30"),
      state: 10,
    });

    console.log(submissions);
  }

  return (
    <div className="admin-feed">
      <Header username="gingerAle" isAdmin={true} />

      <div className="content">
        <table className={"submissions"}>
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>name</th>
              <th>type</th>
              <th>format</th>
              <th>date</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <SubmissionLineUser
                key={submission.id}
                { ...submission } />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFeed;
