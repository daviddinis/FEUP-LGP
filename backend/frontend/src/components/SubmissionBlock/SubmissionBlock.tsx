import React from "react";
import "./SubmissionBlock.scss";
import { stateToClass, stateToString } from "components/State/State";
import ExportCSVButton from "../ExportComponent/ExportCSVButton";

interface Highlights {
  name: string;
  content: string;
}

interface Submission {
  name: string,
  type: string,
  owner: string,
  state: number,
  date: Date,
  extracted: Highlights[]
}


const SubmissionLine = (submission: Submission): JSX.Element => {

  return (
    <div className="submission-block">
    <div className="wrapper-inner-submisson-block">
      <div className="inner-submisson-block">
      <header>
        <div className="box-title">
          <h2>
            <b>{submission.name}</b>
          </h2>
          <span className="submission-author">{submission.owner/*TODO*/}</span>
        </div>
        <p className="date">
          <time>{new Date(submission.date).toLocaleDateString()}</time>
        </p>
        <p>
         <b>Status: </b>{stateToString(submission.state)}
        </p>
      </header>
      
      <div className="highlights">
        {
          submission.extracted != null ?
          submission.extracted.map((highlight, index) => {
          if(highlight.content == null)
            return( <></>)

          return (
            <div key={index + 1} className="highlight">
              <h3>{highlight.name}</h3>
              <p>{highlight.content}</p>
            </div>
          );
          })
          : <p>No Highlights</p>
        }
      </div>
      <ExportCSVButton {...submission} />
    </div>
    </div>
    <div className={"status " + stateToClass(submission.state)} />
    </div>
  );
};

export default SubmissionLine;
