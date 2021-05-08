import React from "react";
import axios from "axios";

interface Props {
    url: string,
    filename: string
}

const DownloadButton = (props: Props): JSX.Element => {

    const download = () => {
        axios.get(props.url,{ responseType: 'blob' }).then(res => {
            const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', props.filename)
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch(console.error);
    }


    return (
        <button className="submission-button" onClick={download}>
            Download Original
        </button>
    );
};

export default DownloadButton;