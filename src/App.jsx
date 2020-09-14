import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import moment from 'moment';
import Rating from './components/rating';
import Message from './components/message';
import ListItem from './components/list-item';
import { convertDate, convertSavedTime } from './utils/date';
import './App.scss';

function App() {
  const scrollRef = useRef(null)
  const [dataList, setdataList] = useState([])
  const [selectedReport, setSelectedReport] = useState({})
  const [bottomDate, setBottomDate] = useState(moment().format('MMMM YYYY'))
  const [scrollOffset, setScrollOffset] = useState(0)
  const [focusIndex, setFocusIndex] = useState(0)
  const [isChanged, setIsChanged] = useState(false)
  const [cardKey, setCardKey] = useState(null)

  const backgroundStyle = useMemo(() => {
    if (selectedReport?.mark === 1) return 'bg-1'
    if (selectedReport?.mark === 2) return 'bg-2'
    if (selectedReport?.mark === 3) return 'bg-3'
    if (selectedReport?.mark === 4) return 'bg-4'
    if (selectedReport?.mark === 5) return 'bg-5'
  }, [selectedReport])

  const saveBtnStyle = useMemo(() => {
    if (selectedReport?.mark === 1) return 'save-btn-1'
    if (selectedReport?.mark === 2) return 'save-btn-2'
    if (selectedReport?.mark === 3) return 'save-btn-3'
    if (selectedReport?.mark === 4) return 'save-btn-4'
    if (selectedReport?.mark === 5) return 'save-btn-5'
  }, [selectedReport])

  const onSaveReport = useCallback(() => {
    if (Object.keys(selectedReport).length === 0) return;
    setdataList((dataList) => {
      const index = dataList.findIndex(d => moment(d.date).diff(selectedReport?.date, 'days') === 0)
      let _dataList = [...dataList]
      const _selectedReport = {
        ...selectedReport,
        savedTime: moment()
      }
      _dataList[index] = _selectedReport
      return _dataList
    })
    setSelectedReport({
      ...selectedReport,
      savedTime: moment()
    })
    setIsChanged(false)
  }, [selectedReport, setdataList])

  const initData = useCallback(async () => {
    let _localData = localStorage.getItem('reportData')
    _localData = _localData ? JSON.parse(_localData) : []
    let _date = moment().format('YYYY-MM-DD')
    let _dataList = []
    for(let i = 0; i < 50; i++) {
      const index = _localData.findIndex(d => moment(_date).diff(d.date, 'days') === 0)
      if (index > -1) {
        _dataList.push(_localData[index])
      } else {
        const dateReport = {
          date: _date,
          mark: null,
          message: '',
          savedTime: null
        }
        _dataList.push(dateReport)
      }
      _date = moment(_date).add(-1, 'day').format('YYYY-MM-DD')
    }
    setdataList(_dataList)
    setSelectedReport(_dataList[0])
  }, [])

  const onScroll = useCallback(e => {
    const target = e.nativeEvent.target
    const index = Math.round((target.scrollWidth - target.scrollLeft - scrollOffset) / 220)
    if (index > dataList.length - 1 || index < 0) return
    const focusItem = dataList[index]
    setBottomDate(moment(focusItem.date).format('MMMM YYYY'))
    setFocusIndex(index)
  }, [dataList, scrollOffset])

  // useEffect
  useEffect(() => {
    initData()
    setCardKey(moment().toISOString())
  }, [])

  useEffect(() => {
    if (scrollRef.current)  {
      setScrollOffset(scrollRef.current.scrollWidth) // get scrollbar width
    }
  }, [scrollRef])

  useEffect(() => {
    const _dataToSave = dataList.filter(d => d.mark)
    localStorage.setItem('reportData', JSON.stringify(_dataToSave))
  }, [dataList])

  return (
    <div className={`App ${backgroundStyle}`}>
      <div className="title">Simplejournal</div>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={cardKey}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="card-container">
              <div className={`feeling-card ${!cardKey && 'empty-card' }`}>
                <Rating mark={selectedReport?.mark} setMark={mark => {
                  if (selectedReport.mark === mark) return
                  setSelectedReport({...selectedReport, mark })
                  setIsChanged(true)
                }} />
                <Message message={selectedReport?.message} setMessage={message => {
                  if (selectedReport.message === message) return
                  setSelectedReport({...selectedReport, message })
                  setIsChanged(true)
                }} />
                <div className="card-bottom-container">
                  {selectedReport?.date ? <div className="date-text">{convertDate(selectedReport?.date)}</div> : <div />}
                  {isChanged ?
                    <div className={`save-btn ${saveBtnStyle}`} onClick={onSaveReport}>Save</div>
                    : selectedReport?.savedTime ?
                    <div className="date-text">{convertSavedTime(selectedReport?.savedTime)}</div>
                    : <div />}
                </div>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      <div className="day-card-body" ref={scrollRef} onScroll={e => onScroll(e)} >
        {dataList.map((data, index) => (
          <ListItem
            key={index}
            focusIndex={focusIndex}
            index={index}
            data={data}
            onSelect={() => {
              if (moment(selectedReport.date).diff(data.date, 'days') === 0) return
              setSelectedReport(data)
              setIsChanged(false)
              console.log('===moment().toISOString()===', moment().toISOString())
              setCardKey(moment().toISOString())
            }}
          />
        ))}
      </div>
      <div className="month-info">
        <div className="month-text">{`${bottomDate}`}</div>
      </div>
    </div>
  );
}

export default App;
