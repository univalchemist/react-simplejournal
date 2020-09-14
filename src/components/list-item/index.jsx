import React, { useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { convertDate } from '../../utils/date';

function ListItem({ data, onSelect, focusIndex, index }) {
  const [showContent, setShowContent] = useState(false)

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

  const opacity = useMemo(() => {
    let _opacity = 1 - (index - focusIndex) * 0.1
    return Math.min(1, _opacity)
  }, [focusIndex, index])

  // useEffect
  useEffect(() => {
    const timeOut = (index + 1) * 100
    setTimeout(() => {
      setShowContent(true)
    }, timeOut)
  }, [])
  return (
    <div className="item-container" style={{ opacity }}>
      <CSSTransition
        in={showContent}
        timeout={300}
        classNames="item"
        unmountOnExit
      >
        <div className="item-content" onClick={onSelect}>
          <div className={`item-mark ${markStyle}`}>{mark}</div>
          <div className="item-date">{convertDate(date)}</div>
          <div className="item-message">{message}</div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default ListItem;
