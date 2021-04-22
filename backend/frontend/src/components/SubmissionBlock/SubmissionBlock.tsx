import React from "react";
import "./SubmissionBlock.scss";
import { stateToClass, stateToString } from "components/State/State";
import { CSVLink } from "react-csv";

interface Highlights {
  title: string;
  content: string;
}

interface Submission {
  id: string;
  state?: number,
  user: string;
  documentName: string;
  type: string;
  format: string;
  date: Date;
  highlights: Highlights[];
}

const headers = [
  { label: "id", key: "id" },
  { label: "state", key: "state" },
  { label: "Submission's User", key: "user" },
  { label: "Document Name", key: "documentName" },
  { label: "Type", key: "type" },
  { label: "Format", key: "format" },
  { label: "Submission Date", key: "date" },
  { label: "Highlighted Information", key: "highlights" },
];

const SubmissionLine = (submission: Submission): JSX.Element => {
  const exportHighlightedInfo = (/*e*/) => {
    //TODO
    const data = [
      { id: submission.id, state: stateToString(submission.state), user: submission.user, documentName: submission.documentName,
      type: submission.type, format: submission.format, date: submission.date.toLocaleDateString(), highlights: submission.highlights },
    ];
    const csvReport = {
      data: data,
      headers: headers,
      filename: 'submission_details.csv'
    };
    console.log("Export button clicked!");
  };

  return (
    <div className="submission-block">
    <div className="wrapper-inner-submisson-block">
      <div className="inner-submisson-block">
      <header>
        <div className="box-title">
          <h2>
            <b>{submission.documentName}</b>
          </h2>
          <span className="submission-author">{submission.user}</span>
        </div>
        <p className="date">
          <time>{submission.date.toLocaleDateString()}</time>
        </p>
        <p>
         <b>Status: </b>{stateToString(submission.state)}
        </p>
      </header>
      <div className="highlights">
        {submission.highlights.map((highlight, index) => {
          return (
            <div key={index + 1} className="highlight">
              <h3>{highlight.title}</h3>
              <p>{highlight.content}</p>
            </div>
          );
        })}
      </div>
      <button onClick={exportHighlightedInfo}>Export</button>
    </div>
    </div>
    <div className={"status " + stateToClass(submission.state)} />
    </div>
  );
};

export default SubmissionLine;
