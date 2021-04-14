import React, { useEffect, useState } from "react";
import "pages/Table.scss";
import axios from "axios";
import Header from "components/Header/Header";
import SubmissionBlock from "components/SubmissionBlock/SubmissionBlock";
import arrow from 'shared/icons/arrow.svg';

interface File {
  _id: string;
  path: string;
  name: string;
}

interface Highlights {
  title: string;
  content: string;
}

interface Submission {
  id: string;
  user: string;
  documentName: string;
  type: string;
  format: string;
  date: Date;
  highlights: Highlights[];
}

function SubmissionDetails(): JSX.Element {
  //TODO get submission from backend
  const submission: Submission = {
    id: "1",
    user: "filipasenra",
    documentName: "anualreportdocuraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

      <img className={ 'icon back-arrow' }
               src={arrow}></img> {/*TODO make back arrow go back*/}

      <div className="content">
        <SubmissionBlock {...submission} />
      </div>
    </div>
  );
}

export default SubmissionDetails;
