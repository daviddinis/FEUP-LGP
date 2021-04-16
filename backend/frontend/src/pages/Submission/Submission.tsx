import React, { } from "react";
import "pages/Table.scss";
import Header from "components/Header/Header";
import SubmissionBlock from "components/SubmissionBlock/SubmissionBlock";
//import { useParams } from "react-router-dom";
import BackButton from "components/BackButton/BackButton";

interface Highlights {
  title: string;
  content: string;
}

interface Submission {
  id: string,
  state?: number,
  user: string;
  documentName: string;
  type: string;
  format: string;
  date: Date;
  highlights: Highlights[];
}

function Submission(): JSX.Element {
  //const { id } = useParams(); //TODO: use to get submission from backend

  //TODO get submission from backend
  const submission: Submission = {
    id: "1",
    state: 90,
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
  };

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
