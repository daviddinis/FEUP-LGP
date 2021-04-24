import React, { useEffect, useState } from "react";
import axios from 'axios'
import "pages/Table.scss";

//import { useParams } from "react-router-dom";

import Header from "components/Header/Header";
import SubmissionBlock from "components/SubmissionBlock/SubmissionBlock";
import BackButton from "components/BackButton/BackButton";
import { useParams } from "react-router";

interface Highlights {
  title: string;
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
  const { id } = useParams<any>(); //TODO: use to get submission from backend
  const [submission, setSubmission] = useState<Submission>(
    {
      _id: "0",
      path: "",
      name: "",
      documentId: "",
      type: "",
      extracted: [],
      createdAt: "",
      updatedAt: "",
      __v: "",
    }
  );

  useEffect(() => {
    axios.get('/files/'+id).then(res => {
      setSubmission(res.data);
      console.log(res.data);
    });
  }, []);

  //TODO get submission from backend
  /*const s: Submission = {
    id: "1",
    state: 100,
    user: "filipasenra",
    documentName:
      "anualreportdocuraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    type: "extract",
    format: "pdf",
    date: new Date("2021-03-25"),
    highlights: [
      { title: "Address", content: "R. Dr. Roberto Frias, 4200-465 Porto" },
      { title: "Phone number", content: "22 508 1400" },
    ],
  };*/

  return (
    <div className="submition-details">
      <Header username="gingerAle" isAdmin={true} />

      <BackButton />

      <div className="content">
        <SubmissionBlock {...submission} />
      </div>
    </div>
  );
}

export default Submission;
