import React, { useEffect, useState } from "react";
import "pages/Table.scss";
import "pages/AdminUserDocs/AdminUserDocs.scss";
import axios from "axios";
import SubmissionLineUser from 'components/SubmissionLineUser';
import Header from "components/Header/Header";
import BottomCornerImage from '../../components/BottomCornerImage/BottomCornerImage';

interface File {
  _id: string;
  path: string;
  name: string;
}

interface Submission {
  id: string,
  user?: string,
  documentName: string,
  type: string,
  format: string,
  date: Date,
  state: number,
}

//Example users while backend content cannot be fetched
const mockUsers = [
  {
    _id: '1',
    path: '/foo',
    name: 'foo',
  }, 
  {
    _id: '1',
    path: '/foo',
    name: 'bar',
  },
]

function AdminUserDocs(): JSX.Element {
  const [userFiles, setUserFiles] = useState<File[]>(mockUsers);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    axios.get("/userFiles/1")
      .then((res) => {
        setUserFiles(res.data);
      })
      .catch(({ message }) =>{
        console.log('Error while fetching data:', message);
      });

      setSubmissions(
        userFiles.map(({ _id: id, name }) => ({
          id,
          isFlaged: false,
          user: "pc",
          documentName: name,
          type: "extract",
          format: "pdf",
          date: new Date("2012-01-30"),
          state: 5,
        })
      ))
  }, [userFiles]);

  return (
    <div className="admin-feed">
      <Header 
        username="gingerAle"
        isAdmin={true}
        filesOwnerUserName={ 'username' }
        withBackArrow />
      <div className="content">
        <table className={"submissions"}>
          <thead>
            <tr>
              <th>status</th>
              <th>name</th>
              <th>type</th>
              <th>format</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              return (
                <SubmissionLineUser
                  key={submission.id}
                  name={submission.documentName}
                  type={submission.type}
                  format={submission.format}
                  date={submission.date}
                  state={submission.state} />
              );
            })}
          </tbody>
        </table>
      </div>
      <BottomCornerImage/>
    </div>
  );
}

export default AdminUserDocs;