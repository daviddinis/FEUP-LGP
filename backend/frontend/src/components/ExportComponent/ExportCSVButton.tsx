import React from "react";
import { stateToString } from "components/State/State";
import { CSVLink } from "react-csv";

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

const ExportCSVButton = (submission: Submission): JSX.Element => {

    const headers = [
        { label: "Submission's User", key: "owner" },
        { label: "Document Name", key: "name" },
        { label: "state", key: "state" },
        { label: "Type", key: "type" },
        { label: "Submission Date", key: "date" }
    ];

    const data : any[] = [
        {
            owner: submission.owner, name: submission.name, state: stateToString(submission.state),
            type: submission.type, date: submission.date.toLocaleDateString()
        }
    ];

    submission.extracted.forEach((highlight) => {
        headers.push({label:highlight.name, key: highlight.name});
        data[0][highlight.name] = highlight.content;
    });

    return (
        <CSVLink
            className="submission-button"
            headers={headers}
            filename={submission.owner + "_submission_" + submission.type + "_details.CSV"}
            data={data}
        >Export Data</CSVLink>
    );
};

export default ExportCSVButton;