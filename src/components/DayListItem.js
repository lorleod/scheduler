import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {

  let spotsFull = false;

  if (props.spots < 1) {
    spotsFull = true;
  }

 function formatSpots (props) {

  if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return '1 spot remaining';
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  let h3Text = formatSpots(props);

  let dayListItemClass = classNames(
    'day-list__item',
    {
      'day-list__item--selected': props.selected,
      'day-list__item--full': spotsFull
    }
  );

  return (
    <li className={dayListItemClass} onClick={() => props.onChange(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{h3Text}</h3>
    </li>
  );
}