import React, {useState} from 'react';

import "./InterviewerListStyles.scss";

export default function (props) {

  const [interviewer, setInterviewer] = useState();

  return (
    <li className="interviewers__item" onClick={() => setInterviewer(props.id)}>
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
    Sylvia Palmer
    </li>
  );
};