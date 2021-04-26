import React, { useEffect, useState } from "react";
import "pages/Table.scss";
import { useParams } from "react-router";
import axios from "axios";
import SubmissionLineUser from 'components/SubmissionLineUser';
import Header from "components/Header/Header";
import BottomCornerImage from '../../components/BottomCornerImage/BottomCornerImage';
import {getPercentage} from "../../components/State/State";

interface Highlights {
    name: string;
    content: string;
}

interface File {
    _id: string,
    path: string,
    name: string,
    type: string,
    createdAt: Date,
    extracted: Highlights[]
}

function AdminUserDocs(): JSX.Element {
  const { id } = useParams<any>();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    axios.get("/userFiles/" + id)
      .then((res) => {
          setFiles(res.data);
      })
      .catch(({ message }) =>{
        console.log('Error while fetching data:', message);
      });
  }, [id]);

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
              <th></th>
              <th>name</th>
              <th>type</th>
              <th>format</th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => {
              return (
                <SubmissionLineUser
                  key={file._id}
                  name={file.name}
                  type={file.type}
                  format="pdf"
                  date={new Date(file.createdAt)}
                  state={getPercentage(file.extracted)} />
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