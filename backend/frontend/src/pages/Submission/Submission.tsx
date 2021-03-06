import React, {useEffect, useState} from "react";
import axios from 'axios'
import Header, { SideBarOption } from "components/Header/Header";
import SubmissionBlock from "components/SubmissionBlock/SubmissionBlock";
import {useParams} from "react-router";
import {getPercentage} from "components/State/State";

interface Highlights {
    name: string;
    content: string;
    error: string;
}


interface Submission {
    _id: string;
    name: string;
    type: string;
    path: string;
    extracted: Highlights[];
    createdAt: string;
    user: {
        _id: string
        username: string
    }
}

function Submission(): JSX.Element {
    const {id} = useParams<any>();

    const [submission, setSubmission] = useState<Submission>();

    useEffect(() => {
        axios.get('/api/files/' + id).then(res => {
            setSubmission(res.data);
        });
    }, [id]);


    return (
        <div className="submition-details">
            <Header withBackArrow sideBarOption={SideBarOption.SubmittedDocuments}/>

            <div className="content">
                {submission &&
                <SubmissionBlock
                    name={submission.name}
                    type={submission.type}
                    owner={submission?.user?.username}
                    original={submission.path}
                    state={getPercentage(submission.extracted)}
                    date={new Date(submission.createdAt)}
                    extracted={submission.extracted}
                />
                }
            </div>
        </div>
    );
}

export default Submission;
