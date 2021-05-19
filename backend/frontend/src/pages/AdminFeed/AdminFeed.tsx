import React, { useEffect, useState } from "react";
import axios from "axios";
import Header, { SideBarOption } from "components/Header/Header";
import { getPercentage } from "../../components/State/State";
import SubmissionTableAdmin from "components/SubmissionTable/SubmissionAdminTable/SubmissionAdminTable";
import Submission from "models/Submission";

interface FileSubmission {
  _id: string;
  name: string;
  type: string;
  extracted: any[];
  createdAt: Date;
  isFlagged: boolean;
  user: {
    username: string;
  };
}

function AdminFeed(): JSX.Element {
  const [files, setFiles] = useState<FileSubmission[]>([]);

  useEffect(() => {
    axios.get("/api/files").then((res) => setFiles(res.data));
  }, []);

  const submissions: Submission[] = [];

  files.forEach((submission) => submissions.push({
    id: submission._id,
    state: getPercentage(submission.extracted),
    name: submission.name,
    type: submission.type,
    date: new Date(submission.createdAt),
    isFlagged: submission.isFlagged,
    user: submission?.user?.username,
  }));

  return (
    <div className="admin-feed">
      <Header username="gingerAle" isAdmin={true} sideBarOption={SideBarOption.SubmittedDocuments}/>

      <div className="content">
        <SubmissionTableAdmin
          submissions={submissions}
        />
      </div>
    </div>
  );
}

export default AdminFeed;
