import React, { Fragment } from 'react';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import './styles.scss';

export default function Apointment(props) {

  return (
      <article className="appointment">
      <Header time={props.time} />
      {props.interview ?
        <Show />
      :
        <Empty />
      }
      </article>
  );
}