import React, { useEffect, useState } from "react";
import "../Table.scss";
import axios from "axios";
import SubmissionLine from "../../components/SubmissionLineAdmin";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

interface File {
  _id: string;
  path: string;
  name: string;
}

function AdminFeed() {
  const [files, setUsers] = useState<File[]>([]);

  useEffect(() => {
    axios.get("/files").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  const submissions: any[] = [
    {
      id: "1",
      isFlaged: true,
      user: "filipasenra",
      documentName: "anualreportdocura",
      type: "extract",
      format: "pdf",
      date: new Date("2021-03-25"),
    },
    {
      id: "2",
      isFlaged: false,
      user: "claudiasilva",
      documentName: "IDClaudia",
      type: "pdf",
      format: "jpeg",
      date: new Date("2021-03-21"),
    },
  ];

  for (let i = 0; i != files.length; i++) {
    const id = files[i]._id;
    const name = files[i].name;

    submissions.push({
      id: id,
      isFlaged: false,
      user: "pc",
      documentName: name,
      type: "extract",
      format: "pdf",
      date: new Date("2012-01-30"),
    });

    console.log(submissions);
  }

  return (
    <div className="admin-feed">
      <Header username="gingerAle" isAdmin={true} />

      <Sidebar />

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
            {submissions.map((submission) => {
              return (
                <SubmissionLine
                  key={submission.id}
                  isFlaged={submission.isFlaged}
                  user={submission.user}
                  documentName={submission.documentName}
                  type={submission.type}
                  format={submission.format}
                  date={submission.date}
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
