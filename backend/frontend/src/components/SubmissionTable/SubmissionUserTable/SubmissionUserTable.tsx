import React from "react";
import SubmissionUserLine from "./SubmissionUserLine";
import UserSubmission from "models/UserSubmission";
import 'components/SubmissionTable/Table.scss';
import "./SubmissionUserTable.scss";

interface ISubmissionUserTable {
    submissions: UserSubmission[]
}

const SubmissionUserTable = (submissions : ISubmissionUserTable) : JSX.Element => {
    return (
        <table className={"submissions user"}>
        <thead>
            <tr>
              <th>status</th>
              <th/>
              <th>name</th>
              <th>type</th>
              <th>date</th>
              <th/>
            </tr>
          </thead>

          <tbody>
            {submissions.submissions.map((submission) => (
                <SubmissionUserLine
                    key={submission.id} {...submission}
                />
            ))}
          </tbody>
        </table>
      
    )
}


export default SubmissionUserTable;