import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Rating from './components/rating';
import Message from './components/message';
import ListItem from './components/list-item';
import { convertDate } from './utils/date';
import './App.scss';

function App() {
  const [dataList, setdataList] = useState([])
  const [selectedReport, setSelectedReport] = useState({})
  const [bottomDate, setBottomDate] = useState(moment().format('MMMM YYYY'))

  const backgroundStyle = useMemo(() => {
    if (selectedReport?.mark === 1) return 'bg-1'
    if (selectedReport?.mark === 2) return 'bg-2'
    if (selectedReport?.mark === 3) return 'bg-3'
    if (selectedReport?.mark === 4) return 'bg-4'
    if (selectedReport?.mark === 5) return 'bg-5'
  }, [selectedReport?.mark])

  const saveBtnStyle = useMemo(() => {
    if (selectedReport?.mark === 1) return 'save-btn-1'
    if (selectedReport?.mark === 2) return 'save-btn-2'
    if (selectedReport?.mark === 3) return 'save-btn-3'
    if (selectedReport?.mark === 4) return 'save-btn-4'
    if (selectedReport?.mark === 5) return 'save-btn-5'
  }, [selectedReport?.mark])

  const onSaveReport = useCallback(() => {
    if (Object.keys(selectedReport).length === 0) return;
    setdataList((dataList) => {
      const index = dataList.findIndex(d => moment(d.date).diff(selectedReport?.date, 'days') === 0)
      let _dataList = [...dataList]
      _dataList[index] = selectedReport
      return _dataList
    })
  }, [selectedReport, setdataList])

  const initData = useCallback(async () => {
    let _localData = localStorage.getItem('reportData')
    _localData = _localData ? JSON.parse(_localData) : []
    let _date = moment().format('YYYY-MM-DD')
    let _dataList = []
    for(let i = 0; i < 50; i++) {
      const index = _localData.findIndex(d => {
        return moment(_date).diff(d.date, 'days') === 0
      })
      if (index > -1) {
        _dataList.push(_localData[index])
      } else {
        const dateReport = {
          date: _date,
          mark: null,
          message: ''
        }
        _dataList.push(dateReport)
      }
      _date = moment(_date).add(-1, 'day').format('YYYY-MM-DD')
    }
    setdataList(_dataList)
    setSelectedReport(_dataList[0])
  }, [])

  const onScroll = useCallback(e => {
    const index = Math.round((e.nativeEvent.target.scrollWidth - e.nativeEvent.target.scrollLeft) / 220)
    if (index > dataList.length - 1) return
    const focusItem = dataList[index]
    setBottomDate(moment(focusItem.date).format('MMMM YYYY'))
  }, [dataList])

  // useEffect
  useEffect(() => {
    initData()
  }, [])

  useEffect(() => {
    const _dataToSave = dataList.filter(d => d.mark)
    localStorage.setItem('reportData', JSON.stringify(_dataToSave))
  }, [dataList])

  return (
    <div className={`App ${backgroundStyle}`}>
      <div className="title">Simplejournal</div>
      <div className="card-container">
        <div className="feeling-card">
          <Rating mark={selectedReport?.mark} setMark={mark => setSelectedReport({...selectedReport, mark })} />
          <Message message={selectedReport?.message} setMessage={message => setSelectedReport({...selectedReport, message })} />
          <div className="card-bottom-container">
            {selectedReport?.date ? <div className="date-text">{convertDate(selectedReport?.date)}</div> : <div />}
            {selectedReport?.mark ?  <div className={`save-btn ${saveBtnStyle}`} onClick={onSaveReport}>Save</div> : <div />}
          </div>
        </div>
      </div>
      <div className="day-card-body" onScroll={e => onScroll(e)}>
        {dataList.map((data, index) => <ListItem key={index} data={data} onSelect={() => setSelectedReport(data)} />)}
      </div>
      <div className="month-info">
        <div className="month-text">{`${bottomDate}`}</div>
      </div>
    </div>
  );
}

export default App;
