import moment from "moment"

export const convertDate = date => {
  if (moment().diff(date, 'days') === 0) return 'Today'
  if (moment().diff(date, 'days') === 1) return 'Yesterday'
  return moment(date).format('MMM DD')
}

export const convertSavedTime = date => {
  return "Saved on " + moment(date).format('MMM DD') + " at " +  moment(date).format('h:mma')
}