import React, { Fragment } from 'react';
import moment from 'moment';
import uuid4 from 'uuid/v4';


export default (props) => {
  const {
    theEvent: {
      createdAt,
      verified,
      invalidFields,
      record,
      record: {
        event_name,
        state_name,
        evtname,
      },
    },
  } = props;


  const date = moment(createdAt);


  const panelHeadingClass = verified ? 'panel-heading has-background-primary' : 'panel-heading has-background-warning';
  const invalidFieldNames = [];

  if (invalidFields) {
    invalidFields.forEach(field => invalidFieldNames.push(field.fieldName));
  }

  const recordArray = Object.entries(record);

  const output = recordArray.map((element) => {
    const i = invalidFieldNames.findIndex(x => x === element[0]);
    let reason = '';
    let className = 'panel-block';

    if (i !== -1) {
      reason = `-- Error reason: ${invalidFields[i].reason}`;
      className = 'panel-block has-text-white has-background-danger';
    }

    return (
      <div className={className} key={uuid4()}>
        {`${element[0]}:${element[1]} ${reason}`}
      </div>
    );
  });


  return (
    <Fragment>
      <div className="panel">
        <p className={panelHeadingClass}>
          <strong>Event :</strong> {event_name || evtname ? event_name || evtname : state_name}
        </p>
        {!verified && <p className="has-text-danger">Not verified</p>}
        <p className="subtitle ">{date.format('LL HH:mm:ss')}</p>

        <div className="panel-block">
          <ul>{output}</ul>
        </div>
      </div>
    </Fragment>
  );
};
