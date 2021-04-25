import React, { useEffect, useState } from "react";
import axios from 'axios'
import "pages/Table.scss";
import Header from "components/Header/Header";
import SubmissionBlock from "components/SubmissionBlock/SubmissionBlock";
import BackButton from "components/BackButton/BackButton";
import { useParams } from "react-router";
import { getPercentage } from "components/State/State";

interface Highlights {
  name: string;
  content: string;
}


interface Submission {
  _id: string;
  path?: string,
  name: string;
  documentId: string;
  type: string;
  extracted: Highlights[];
  createdAt: string;
  updatedAt: string;
  __v: string;
}

function Submission(): JSX.Element {
  const { id } = useParams<any>();
 
  const [submission, setSubmission] = useState<Submission>();

  useEffect(() => {
    axios.get('/files/'+id).then(res => {
      setSubmission(res.data);
    });
  }, [id]);

  return (
    <div className="submition-details">
      <Header username="gingerAle" isAdmin={true} />

      <BackButton />

      <div className="content">
        {submission != undefined ?
        <SubmissionBlock name={submission.name} type={submission.type} owner="joao" state={getPercentage(submission.extracted)} date={new Date(submission.updatedAt)} extracted={submission.extracted} />
        : <></>}
      </div>
    </div>
  );
}

export default Submission;
