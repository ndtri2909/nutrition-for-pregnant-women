const { get_day_of_time } = require("./caculatorLeave");
const checkValidLeave = (leave, elements) => {
  const from_date = new Date(leave.FROM_DATE_TIME);
  const to_date = new Date(leave.TO_DATE_TIME)
 
  const { MIN_LEAVE_DAYS, MAX_LEAVE_DAYS, DAYS_REQUEST_BEFORE_LEAVE } =
    elements;
  const result = get_day_of_time(from_date,to_date);
  const dayNow = new Date();
  const caculator_days_request = get_day_of_time(dayNow,from_date);
  const isCheckValid = MIN_LEAVE_DAYS <= result && result <= MAX_LEAVE_DAYS;

  if (caculator_days_request >= DAYS_REQUEST_BEFORE_LEAVE) {
    if (isCheckValid) {
        return true;
    }
  }
  return false;
};

module.exports = { checkValidLeave };
