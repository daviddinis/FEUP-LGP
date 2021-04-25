import React from "react";
import { stateToString } from "components/State/State";
import "./ExportCSVButton.scss";
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

const ExportCSVButton = (submission: Submission): JSX.Element => {

    const headers = [
        { label: "id", key: "id" },
        { label: "state", key: "state" },
        { label: "Submission's User", key: "user" },
        { label: "Document Name", key: "documentName" },
        { label: "Type", key: "type" },
        { label: "Format", key: "format" },
        { label: "Submission Date", key: "date" }
    ];

    const data = [
        {
            id: submission.id, state: stateToString(submission.state), user: submission.user, documentName: submission.documentName,
            type: submission.type, format: submission.format, date: submission.date.toLocaleDateString()
        }
    ];

    submission.highlights.forEach((highlight) => {
        headers.push({label:highlight.title, key: highlight.title});
        data[0][highlight.title] = highlight.content;
    });

    return (
        <CSVLink
            className="csv-link"
            headers={headers}
            filename={submission.user + "_submission_" + submission.id + "_details.CSV"}
            data={data}
            /*separator={";"}*/
        >Export</CSVLink>
    );
};

export default ExportCSVButton;