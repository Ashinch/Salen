import { useEffect, useState } from 'react'
import { Button, Card, Spacer } from '@geist-ui/react'
import { ChevronLeft, ChevronRight } from '@geist-ui/react-icons'
import '../utils/index'

const icsParser = require('../utils/ics-parser')

const CalView = () => {
  const [curDate, setCurDate] = useState({ year: 0, month: 0, day: 0, week: 0 })
  const [nowDate, setNowDate] = useState(curDate)
  const [selectedDate, setSelectedDate] = useState(curDate)
  const [calDays, setCalDays] = useState([])
  const [events, setEvents] = useState([])
  const [latestEvent, setLatestEvent] = useState({})
  const [selectedEvent, setSelectedEvent] = useState()
  const [parsed, setParsed] = useState(undefined)

  const renderCalendar = () => {
    let curMonthDaysNum = new Date(curDate.year, curDate.month + 1, -1).getDate() + 1
    let preMonthDaysNum = new Date(curDate.year, curDate.month, -1).getDate() + 1
    let daysNum = curMonthDaysNum
    let firstDayWeek = new Date(curDate.year, curDate.month, 1).getDay()
    let days = [[], [], [], [], [], []]
    let curMonthEnd = false
    let nextMonthDay = 1
    // 总共显示6周
    for (let i = 0; i < 6; i++) {
      // 遍历星期日至星期六
      for (let j = 0; j < 7; j++) {
        if (firstDayWeek === 0 || firstDayWeek <= j || i > 0) {
          // 当月第一天为星期天 或 上月星期数已填充完毕 或 不是当月第一周
          // 填充当月天数和下月天数
          let nowDay = curMonthDaysNum - daysNum + 1
          if (nowDay <= curMonthDaysNum && !curMonthEnd) {
            // 填充当月天数
            days[i][j] = {
              year: curDate.year,
              month: curDate.month,
              day: nowDay,
              week: j
            }
            curMonthEnd = nowDay === curMonthDaysNum
            daysNum--
          } else {
            // 填充下月天数
            days[i][j] = {
              year: curDate.month === 11 ? curDate.year + 1 : curDate.year,
              month: curDate.month === 11 ? 0 : curDate.month + 1,
              day: nextMonthDay,
              week: j
            }
            nextMonthDay++
          }
        } else {
          // 填充上月天数
          days[i][j] = {
            year: curDate.month === 0 ? curDate.year - 1 : curDate.year,
            month: curDate.month === 0 ? 11 : curDate.month - 1,
            day: preMonthDaysNum - (firstDayWeek - j) + 1,
            week: j
          }
        }
      }
    }
    setCalDays(days)
  }

  const preMonth = () => {
    let tempDate = Object.assign({}, curDate)
    if (tempDate.month === 0) {
      tempDate.month = 11
      tempDate.year--
    } else {
      tempDate.month--
    }
    setCurDate(tempDate)
  }

  const nextMonth = () => {
    let tempDate = Object.assign({}, curDate)
    if (tempDate.month === 11) {
      tempDate.month = 0
      tempDate.year++
    } else {
      tempDate.month++
    }
    setCurDate(tempDate)
  }

  const gotoDay = (rawDateParam, today = false) => {
    const parseDate = {
      year: rawDateParam.getFullYear(),
      month: rawDateParam.getMonth(),
      week: rawDateParam.getDay(),
      day: rawDateParam.getDate()
    }
    if (today) {
      setNowDate(parseDate)
    }
    setSelectedDate(parseDate)
    setCurDate(parseDate)
  }

  const onClickDay = (dateParam, even) => {
    setEvents(even)
    console.log(parsed?.getEventsOnDate(new Date(dateParam.year, dateParam.month, dateParam.day)))
    if (!isSelectedDate(dateParam)) {
      setSelectedEvent({})
    }
    setSelectedDate({
      year: dateParam.year,
      month: dateParam.month,
      day: dateParam.day,
      week: dateParam.week
    })
    gotoDay(new Date(dateParam.year, dateParam.month, dateParam.day))
  }

  const onClickEventItem = (event) => {
    onClickDay({
      year: event.start.getFullYear(),
      month: event.start.getMonth(),
      day: event.start.getDate()
    })
    setSelectedEvent(event)
  }

  const isSelectedDate = (dateParam) => {
    return selectedDate.year === dateParam.year
      && selectedDate.month === dateParam.month
      && selectedDate.day === dateParam.day
  }

  const isToday = (dateParam) => {
    return nowDate.year === dateParam.year
      && nowDate.month === dateParam.month
      && nowDate.day === dateParam.day
  }

  const isNotCurMonth = (dateParam) => {
    return curDate.month !== dateParam.month
  }

  useEffect(() => {
    gotoDay(new Date(), true)
    let xmlHttp
    try {
      xmlHttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP')
    } catch (e) {
    }
    xmlHttp.onreadystatechange = () => {
      if ((xmlHttp.readyState === 4) && (xmlHttp.status === 200)) {
        const parse = icsParser.parseString(xmlHttp.responseText)
        setParsed(parse)
        setLatestEvent(parse?.events?.[parse.events.length - 1])
        const value = parse?.events?.[parse.events.length - 1].dtstart.value
        const even = parsed?.getEventsOnDate(value)
        onClickDay({ year: value.getFullYear(), month: value.getMonth(), day: value.getDate() }, even)
      }
    }
    xmlHttp.open('GET', '../lpl.ics', true)
    xmlHttp.send(null)
  }, [])

  useEffect(() => {
    renderCalendar()
  }, [curDate])

  useEffect(() => {
    console.log('calendarData', parsed?.calendarData)
    console.log('events', parsed?.events)
  }, [parsed])

  return (
    <div className="container flex flex-col lg:flex-row mx-auto my-5">
      <div className="flex-grow">
        <Card shadow>
          <div className="flex items-center justify-between border-b pb-5">
            <div className="flex items-center">
              <div
                className="flex justify-center items-center w-8 h-8 rounded-md text-gray-500 transition-all duration-300 cursor-pointer hover:bg-gray-200"
                onClick={() => preMonth()}
              >
                <ChevronLeft size={18} />
              </div>
              <h2 className="text-xl font-bold mx-1">{curDate.year + '年' + (curDate.month + 1) + '月'}</h2>
              <div
                className="flex justify-center items-center w-8 h-8 rounded-md text-gray-500 transition-all duration-300 cursor-pointer hover:bg-gray-200"
                onClick={() => nextMonth()}
              >
                <ChevronRight size={18} />
              </div>
            </div>
            <div className="flex">
              <div className="hidden sm:flex">
                <Button auto size="small">最近事件</Button>
                <Spacer x={.2} />
                <Button auto size="small" onClick={() => {
                  gotoDay(latestEvent?.dtstart.value)
                }}>最新更新</Button>
                <Spacer x={.2} />
              </div>
              <Button auto size="small" type="secondary" onClick={() => gotoDay(new Date(), true)}>今天</Button>
            </div>
          </div>
          <div className="flex flex-col flex-nowrap w-full h-full pt-2 select-none sm:text-xl">
            <div className="flex py-2 text-sm text-gray-300 bg-white border-gray-100">
              <p className="w-1/7 text-center">日</p>
              <p className="w-1/7 text-center">一</p>
              <p className="w-1/7 text-center">二</p>
              <p className="w-1/7 text-center">三</p>
              <p className="w-1/7 text-center">四</p>
              <p className="w-1/7 text-center">五</p>
              <p className="w-1/7 text-center">六</p>
            </div>
            <div className="flex flex-col text-gray-500">
              {calDays.map((week, weekIndex) => {
                return (
                  <div key={weekIndex} className="flex flex-row cursor-pointer">
                    {week.map((itemDay, index) => {
                      const even = parsed?.getEventsOnDate(new Date(itemDay.year, itemDay.month, itemDay.day))
                      return (
                        <div
                          key={index} onClick={() => onClickDay(itemDay, even)}
                          className={
                            'overflow-hidden px-1 m-0.5 w-1/7 h-12 sm:h-24 pt-2 flex flex-col border-gray-100 rounded-md sm:rounded-xl transition-all ' + (!isToday(itemDay) && !isSelectedDate(itemDay) ? 'hover:text-black hover:bg-gray-200 ' : ' ') +
                            (isToday(itemDay) ? 'z-10 text-white bg-black shadow-lg rounded-md sm:rounded-xl ' : '') +
                            (isNotCurMonth(itemDay) ? 'text-gray-200 ' : '') +
                            (isSelectedDate(itemDay) && !isToday(itemDay) ? 'z-10 text-white bg-gray-400 shadow-lg rounded-md sm:rounded-xl ' : '')
                          }
                        >
                          <div className="w-full text-center font-semibold whitespace-nowrap">
                            {weekIndex === 0 && index === 0
                              ? (itemDay.month + 1) + '月'
                              : itemDay.day === 1 && !isToday(itemDay)
                                ? (itemDay.month + 1) + '月'
                                : itemDay.day
                            }
                          </div>
                          <div
                            className="w-full text-center text-xs transition flex justify-center sm:flex-col sm:items-center">
                            {even?.map((item, index) => {
                              return index < 3 && (
                                <div key={index} className={'flex sm:block sm:w-full ' + (index === 2 ? 'sm:hidden' : '')}>
                                  <span className={
                                    'sm:hidden w-1 h-1 rounded-full ' +
                                    (isNotCurMonth(itemDay) ? 'bg-gray-200 ' :
                                      isSelectedDate(itemDay) ? 'bg-white ' : 'bg-gray-500 ') +
                                    ((even.length < 4 && index === even.length - 1) || (index === 2) ? '' : 'mr-1')
                                  } />
                                  <p className="sm:block hidden truncate">{item.summary.value}</p>
                                </div>
                              )
                            })}
                            {even?.length > 2 && (
                              <p className="sm:w-full sm:block truncate hidden ">
                                还有{even.length - 2}项
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-col mt-5 lg:pl-5 lg:w-3/10 lg:h-auto lg:mt-0">
        {events?.map((item, index) => {
          return (
            <div key={index} className={(index !== 0 ? 'mt-3' : '')}>
              <Card shadow>
                <h4 className="font-semibold">{item.summary.value}</h4>
                <p className="text-xs">
                  {`${item.dtstart.value.format('yyyy/MM/dd hh:mm')} - ${parsed.sameDay(item.dtstart.value, item.dtend.value)
                    ? item.dtend.value.format('hh:mm')
                    : item.dtend.value.format('yyyy/MM/dd hh:mm')}`}
                </p>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalView
