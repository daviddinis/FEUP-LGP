import React from "react";
import SubmissionAdminLine from "./SubmissionAdminLine";
import Submission from "models/Submission";
import 'components/SubmissionTable/Table.scss';

 interface ISubmissionAdminTable {
    submissions: Submission[]
}

const SubmissionAdminTable = (submissions: ISubmissionAdminTable): JSX.Element => {
  return (
    <table className={"submissions admin"}>
      <thead>
        <tr>
          <th />
          <th>user</th>
          <th>status</th>
          <th></th>
          <th>name</th>
          <th>type</th>
          <th>date</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {submissions.submissions.map((submission) => (
          <SubmissionAdminLine key={submission.id} {...submission} />
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionAdminTable;
