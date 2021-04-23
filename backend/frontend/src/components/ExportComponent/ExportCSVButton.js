import React, { Component } from 'react';
import "./ExportCSVButton.css";
import { stateToString } from "components/State/State";
import { CSVLink } from "react-csv";

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

class ExportCSVButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }

  downloadReport = async () => {
    const { submission } = this.props;
    var highlight = JSON.stringify(submission.highlights);
    const data = [
        {id: submission.id, state: stateToString(submission.state), user: submission.user, documentName: submission.documentName,
          type: submission.type, format: submission.format, date: submission.date.toLocaleDateString(), highlights: highlight}
      ];
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <button onClick={this.downloadReport}>Export</button>
        <CSVLink
          headers={headers}
          filename="submission_details.CSV"
          data={data}
          ref={this.csvLinkEl}
          separator={";"}
        />
      </div>
    );
  }
}

export default ExportCSVButton;