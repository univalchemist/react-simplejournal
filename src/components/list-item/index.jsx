import React, { useMemo } from 'react';
import { convertDate } from '../../utils/date';

function ListItem({ data, onSelect }) {
  const { date, mark, message } = data
  const markStyle = useMemo(() => {
    switch(mark) {
      case 1:
        return 'item-mark-1';
      case 2:
        return 'item-mark-2';
      case 3:
        return 'item-mark-3';
      case 4:
        return 'item-mark-4';
      case 5:
        return 'item-mark-5';
      default:
        return '';
    }
  }, [mark])

  return (
    <div className="item-container">
      <div className="item-content" onClick={onSelect}>
        <div className={`item-mark ${markStyle}`}>{mark}</div>
        <div className="item-date">{convertDate(date)}</div>
        <div className="item-message">{message}</div>
      </div>
    </div>
  );
}

export default ListItem;
