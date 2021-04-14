import React from "react";
import "./SubmissionBlock.scss";

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

const SubmissionLine = (submission: Submission): JSX.Element => {
  const exportHighlightedInfo = (e) => {
    //TODO
    console.log("Export button clicked!");
  };

  return (
    <div className="submission-block">
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
  );
};

export default SubmissionLine;
