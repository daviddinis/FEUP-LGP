import React, { Component } from 'react';
import "./ExportCSVButton.css";
import { stateToString } from "components/State/State";
import { CSVLink } from "react-csv";

class ExportCSVButton extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }

  // eslint-disable-next-line
  render() {
    const { submission } = this.props;

    var highlight = JSON.stringify(submission.highlights);
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
    const data = [
      {
        id: submission.id, state: stateToString(submission.state), user: submission.user, documentName: submission.documentName,
        type: submission.type, format: submission.format, date: submission.date.toLocaleDateString(), highlights: highlight
      }
    ];
    
    return (
      <div>
        <CSVLink
          className="csv-link"
          headers={headers}
          filename={submission.user + "_submission_" + submission.id + "_details.CSV"}
          data={data}
          ref={this.csvLinkEl}
          separator={";"}
        >Export</CSVLink>
      </div>
    );
  }
}

export default ExportCSVButton;