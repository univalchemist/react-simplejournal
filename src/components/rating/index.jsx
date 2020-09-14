import React, { useMemo } from 'react';

function Rating({ mark, setMark }) {
  const itemStyle = useMemo(() => (_mark) => {
    if (!mark) return ''
    if (_mark === mark) {
      if (_mark === 1) return 'item-1'
      if (_mark === 2) return 'item-2'
      if (_mark === 3) return 'item-3'
      if (_mark === 4) return 'item-4'
      if (_mark === 5) return 'item-5'
    }
    return ''
  }, [mark])

  return (
    <div className="rating-container">
      <div className="rating-title">How are you feeling today?</div>
      <div className="flex-row pt-20 align-center">
        <div className="rating-label">Awful</div>
        <div className="flex-row mx-10">
          <div className={`rating-item mx-5 ${itemStyle(1)}`} onClick={() => setMark(1)}>
            <div className={`rating-text ${itemStyle(1) ? 'active-rating-text' : ''}`}>1</div>
          </div>
          <div className={`rating-item mx-5 ${itemStyle(2)}`} onClick={() => setMark(2)}>
            <div className={`rating-text ${itemStyle(2) ? 'active-rating-text' : ''}`}>2</div>
          </div>
          <div className={`rating-item mx-5 ${itemStyle(3)}`} onClick={() => setMark(3)}>
            <div className={`rating-text ${itemStyle(3) ? 'active-rating-text' : ''}`}>3</div>
          </div>
          <div className={`rating-item mx-5 ${itemStyle(4)}`} onClick={() => setMark(4)}>
            <div className={`rating-text ${itemStyle(4) ? 'active-rating-text' : ''}`}>4</div>
          </div>
          <div className={`rating-item mx-5 ${itemStyle(5)}`} onClick={() => setMark(5)}>
            <div className={`rating-text ${itemStyle(5) ? 'active-rating-text' : ''}`}>5</div>
          </div>
        </div>
        <div className="rating-label">Amazing</div>
      </div>
    </div>
  );
}

export default Rating;
