function createEmployeeRecord(array){
  let empRecord = {}
  empRecord.firstName = array[0]
  empRecord.familyName = array[1]
  empRecord.title = array[2]
  empRecord.payPerHour = array[3]
  empRecord.timeInEvents = []
  empRecord.timeOutEvents = []
  return empRecord
}

function createEmployeeRecords(array){
  return array.map((person) => {
    return createEmployeeRecord(person)
  })
}

function createTimeInEvent(empRecord,timeStamp){
  let event = {}
  let [date,time] = timeStamp.split(" ")
  event.type = "TimeIn"
  event.hour = parseInt(time)
  event.date = date
  empRecord.timeInEvents.push(event)
  return empRecord
}

function createTimeOutEvent(empRecord,timeStamp){
  let event = {}
  let [date,time] = timeStamp.split(" ")
  event.type = "TimeOut"
  event.hour = parseInt(time)
  event.date = date
  empRecord.timeOutEvents.push(event)
  return empRecord
}

function hoursWorkedOnDate(empRecord,date){
  let timeOut = empRecord.timeOutEvents.find((event) => event.date === date).hour
  let timeIn = empRecord.timeInEvents.find((event) => event.date === date).hour
  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(empRecord,date){
  let payRate = empRecord.payPerHour
  return hoursWorkedOnDate(empRecord,date) * payRate
}

function allWagesFor(empRecord){
  let datesWorked = empRecord.timeOutEvents.map((event) => event.date)
  let wagesArray = datesWorked.map((date) => wagesEarnedOnDate(empRecord,date))
  return wagesArray.reduce((sum,current) => sum += current,0)
}

function findEmployeeByFirstName(records,firstName){
  return records.find((record) => record.firstName === firstName)
}

function calculatePayroll(records){
  return records.reduce((sum,record) => sum + allWagesFor(record),0)
}