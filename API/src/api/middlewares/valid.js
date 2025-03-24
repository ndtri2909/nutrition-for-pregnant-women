const createError = require("http-errors");
const {
  checkInValidate,
  checkOutValidate,
  checkInStatusValidate,
  checkInTypeValidate,
  employeeLeaveValidate,
  allowLeaveValidate,
  responeLeaveValidate,
  updatEemployeeLeaveValidate,
  absentceReportValidate,
  leaveStatusValidate,
  evalutionCriteriaValidate,
  leavePolicyValidate,
  gradeReviewValidate,
  reviewTypeDateValidate,
  evalutionResultValidate,
  employeeEvalutionValidate,
  candidateValidate,
  candidateStatusValidate,
  laborContractValidate,
  contractTypeValidate,
  contractStatusValidate,
  uploadFileValidate,
  employeeLeaveStatusValidate,
  dayLeaveValidate,
  updatEemployeeLeaveValidateForAdmin,
  interviewScheduleValidate,
  allowLeaveValidateUpdate,
  checkAwardPunishTypeValidate,
  checkUserAwardPunishValidate,
} = require("../validations/validation");

module.exports.validDayLeave = (req, res, next) => {
  const { error } = dayLeaveValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
}

module.exports.validEmployeeLeaveStatus = (req, res, next) => {
  const { error } = employeeLeaveStatusValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validUploadFile = (req, res, next) => {
  const { error } = uploadFileValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validContractStatus = (req, res, next) => {
  const { error } = contractStatusValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validContractType = (req, res, next) => {
  const { error } = contractTypeValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validLaborContract = (req, res, next) => {
  const { error } = laborContractValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validCandidateStatus = (req, res, next) => {
  const { error } = candidateStatusValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validCandidate = (req, res, next) => {
  const { error } = candidateValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validEmployeeEvalution = (req, res, next) => {
  const { error } = employeeEvalutionValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validEvalutionResult = (req, res, next) => {
  const { error } = evalutionResultValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validReviewTypeDate = (req, res, next) => {
  const { error } = reviewTypeDateValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validGradeReview = (req, res, next) => {
  const { error } = gradeReviewValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validLeavePolicy = (req, res, next) => {
  const { error } = leavePolicyValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validEvalutionCriteria = (req, res, next) => {
  const { error } = evalutionCriteriaValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validLeaveType = (req, res, next) => {
  const { error } = leaveStatusValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validAbsentceReport = (req, res, next) => {
  const { error } = absentceReportValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validUpdateEmployeeLeave = (req, res, next) => {
  const { error } = updatEemployeeLeaveValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validResponeLeave = (req, res, next) => {
  const { error } = responeLeaveValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validAllowLeave = (req, res, next) => {
  const { error } = allowLeaveValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validAllowLeaveUpdate = (req, res, next) => {
  const { error } = allowLeaveValidateUpdate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validEmployeeLeave = (req, res, next) => {
  const { error } = employeeLeaveValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validCheckIn = (req, res, next) => {
  const { error } = checkInValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validCheckOut = (req, res, next) => {
  const { error } = checkOutValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validChecInStatus = (req, res, next) => {
  const { error } = checkInStatusValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validCheckInType = (req, res, next) => {
  const { error } = checkInTypeValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validInterviewSchedule = (req, res, next) => {
  const { error } = interviewScheduleValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validCheckAwardPunishType = (req, res, next) => {
  const { error } = checkAwardPunishTypeValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validCheckUserAwardPunish = (req, res, next) => {
  const { error } = checkUserAwardPunishValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
