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
        { label: "Submission Date", key: "date" },
        { label: "Highlighted Information", key: "highlights" },
    ];

    let strin = "";
    let cont = 0;
    submission.highlights.forEach(function (highlight) {
        strin = strin + highlight.title + ": " + highlight.content;
        cont = cont + 1;
        if(cont < submission.highlights.length){
            strin = strin + "\n"
        }
    });

    const data = [
        {
            id: submission.id, state: stateToString(submission.state), user: submission.user, documentName: submission.documentName,
            type: submission.type, format: submission.format, date: submission.date.toLocaleDateString(), highlights: strin
        }
    ];

    return (
        <div>
            <CSVLink
                className="csv-link"
                headers={headers}
                filename={submission.user + "_submission_" + submission.id + "_details.CSV"}
                data={data}
                separator={";"}
            >Export</CSVLink>
        </div>
    );
};

export default ExportCSVButton;