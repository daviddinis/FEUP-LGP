import React from "react";
import "./SubmissionBlock.scss";
import { stateToClass, stateToString } from "components/State/State";

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

const SubmissionLine = (submission: Submission): JSX.Element => {
  const exportHighlightedInfo = (/*e*/) => {
    //TODO
    console.log("Export button clicked!");
  };

  return (
    <div className="submission-block">
    <div className="wrapper-inner-submisson-block">
      <div className="inner-submisson-block">
      <header>
        <div className="box-title">
          <h2>
            <b>{submission.name}</b>
          </h2>
        </div>
        <p className="date">
          <time>{submission.createdAt}</time>
        </p>
        <p>
         <b>Status: </b>100%
        </p>
      </header>
      <div className="highlights">
        {submission.extracted.map((highlight, index) => {
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
    </div>
  );
};

export default SubmissionLine;
