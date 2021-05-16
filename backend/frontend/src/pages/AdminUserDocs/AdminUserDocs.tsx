import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Header from "components/Header/Header";
import BottomCornerImage from '../../components/BottomCornerImage/BottomCornerImage';
import {getPercentage} from "../../components/State/State";
import SubmissionTableUser from "components/SubmissionTable/SubmissionUserTable/SubmissionUserTable";
import UserSubmission from "models/UserSubmission";

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
  const { id, username } = useParams<any>();
  const [files, setFiles] = useState<File[]>([]);
  
  useEffect(() => {
    axios.get(`/api/users/${id}/submissions`)
      .then((res) => {
          setFiles(res.data);
      })
      .catch(({ message }) =>{
        console.log('Error while fetching data:', message);
      });
  }, [id]);


  const submissions: UserSubmission[] = [];

  files.forEach((file) => submissions.push({
    id: file._id,
    name: file.name,
    type: file.type,
    date: new Date(file.createdAt),
    state: getPercentage(file.extracted),
  }));

  return (
    <div className="user-submissions">
      <Header 
        username="gingerAle"
        isAdmin={true}
        filesOwnerUserName={username}
        withBackArrow />
      <div className="content">
      <SubmissionTableUser submissions={submissions}/>  
      </div>
      <BottomCornerImage/>
    </div>
  );
}

export default AdminUserDocs;