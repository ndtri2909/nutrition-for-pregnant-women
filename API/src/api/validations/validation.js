const Joi = require("joi");

const checkInValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().required().label("USER_ID"),
    LOCATION_ID: Joi.number().required().label("LOCATION_ID"),
    CHECKIN_TYPE_ID: Joi.string().label("CHECKIN_TYPE_ID"),
    CHECKIN_TYPE_CD: Joi.string().label("CHECKIN_TYPE_CD"),
    CD: Joi.string().label("CD"),
    NOTE: Joi.string().label("NOTE"),
    CREATED_BY: Joi.string().label("CREATED_BY"),
  });

  return schema.validate(data);
};

const checkOutValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().required().label("USER_ID"),
    LOCATION_ID: Joi.number().required().label("LOCATION_ID"),
    CHECKIN_TYPE_ID: Joi.string().label("CHECKIN_TYPE_ID"),
    CHECKOUT_TYPE_CD: Joi.string().label("CHECKOUT_TYPE_CD"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });

  return schema.validate(data);
};

const checkInStatusValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().required().label("NAME"),
    CD: Joi.string().required().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};

const checkInTypeValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().required().label("NAME"),
    CD: Joi.string().required().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};

const employeeLeaveValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().required().label("USER_ID"),
    REASON: Joi.string().required().label("REASON"),
    NOTE: Joi.string().label("NOTE"),
    CD: Joi.string().label("CD"),
    TO_DATE_TIME: Joi.date()
      .min("now")
      .iso()
      .required()
      .label("TO_DATE_TIME")
      .messages({
        "date.base": "The field must be a valid date",
        "date.empty": "Field cannot be left blank",
        "date.min": "The date must not be in the past",
      }),
    FROM_DATE_TIME: Joi.date()
      .min("now")
      .iso()
      .custom((value, helpers) => {
        const toDate = helpers.state.ancestors[0].TO_DATE_TIME; // Lấy giá trị của trường TO_DATE
        if (value > toDate) {
          return helpers.message("From_date must not greater to_date");
        }
        return value;
      })
      .required()
      .label("FROM_DATE_TIME")
      .messages({
        "date.base": "The field must be a valid date",
        "date.empty": "Field cannot be left blank",
        "date.min": "The date must not be in the past",
      }),
    EMPLOYEE_LEAVE_STATUS_ID: Joi.number().label("EMPLOYEE_LEAVE_STATUS_ID"),
    USER_ID_APPROVED: Joi.number().label("USER_ID_APPROVED"),
    USER_ID_LEAVE: Joi.number().label("USER_ID_LEAVE"),
    LEAVE_POLICY_ID: Joi.number().label("LEAVE_POLICY_ID"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
    LEAVE_TYPE_ID: Joi.number().label("LEAVE_TYPE_ID"),
    CREATED_BY: Joi.number().label("CREATED_BY")
  });
  return schema.validate(data);
};

const updatEemployeeLeaveValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().label("USER_ID"),
    REASON: Joi.string().label("REASON"),
    NOTE: Joi.string().allow(null).label("NOTE"),
    CD: Joi.string().label("CD"),
    TO_DATE_TIME: Joi.date()
      .iso()
      .label("TO_DATE_TIME")
      .messages({
        "date.base": "The field must be a valid date",
        "date.empty": "Field cannot be left blank",
        "date.min": "The date must not be in the past",
      }),
    FROM_DATE_TIME: Joi.date()
      .iso()
      .custom((value, helpers) => {
        const toDate = helpers.state.ancestors[0].TO_DATE_TIME; // Lấy giá trị của trường TO_DATE
        if (value > toDate) {
          return helpers.message("From_date must not greater to_date");
        }
        return value;
      })

      .label("FROM_DATE_TIME")
      .messages({
        "date.base": "The field must be a valid date",
        "date.empty": "Field cannot be left blank",
        "date.min": "The date must not be in the past",
      }),
    EMPLOYEE_LEAVE_STATUS_ID: Joi.number().label("EMPLOYEE_LEAVE_STATUS_ID"),
    USER_ID_APPROVED: Joi.number().label("USER_ID_APPROVED"),
    USER_ID_LEAVE: Joi.number().label("USER_ID_LEAVE"),
    LEAVE_POLICY_ID: Joi.number().label("LEAVE_POLICY_ID"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    LEAVE_TYPE_ID: Joi.number().label("LEAVE_TYPE_ID"),
  });

  return schema.validate(data);
};


const responeLeaveValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    TYPE_LEAVE_STATUS: Joi.string().label("TYPE_LEAVE_STATUS"),
    WORKING_STATUS: Joi.string().required().label("WORKING_STATUS"),
  });
  return schema.validate(data);
};


const allowLeaveValidate = (data) => {
  const dateTime = new Date();
  const year = dateTime.getFullYear();

  const schema = Joi.object({
    id: Joi.number(),
    YEAR: Joi.number().min(year).max(2100).label("YEAR"),
    ALLOW_DAYS: Joi.number().label("ALLOW_DAYS"),
    USER_ID: Joi.number().label("USER_ID"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    IS_MOVED: Joi.boolean().label("IS_MOVED")
  });
  return schema.validate(data);
};

const allowLeaveValidateUpdate = (data) => {
  const dateTime = new Date();
  const year = dateTime.getFullYear();

  const schema = Joi.object({
    id: Joi.number(),
    YEAR: Joi.number().label("YEAR"),
    ALLOW_DAYS: Joi.number().label("ALLOW_DAYS"),
    USER_ID: Joi.number().label("USER_ID"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    IS_MOVED: Joi.boolean().label("IS_MOVED")
  });
  return schema.validate(data);
};


const dayLeaveValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    MONTH: Joi.number().label("MONTH"),
    DAY_ADDED: Joi.number().label("DAY_ADDED"),
    ALLOW_LEAVE_ID: Joi.number().label("ALLOW_LEAVE_ID"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const absentceReportValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().label("USER_ID"),
    TO_DATE_TIME: Joi.date().iso().label("TO_DATE_TIME").messages({
      "date.base": "The field must be a valid date",
      "date.empty": "Field cannot be left blank",
      "date.min": "The date must not be in the past",
    }),
    FROM_DATE_TIME: Joi.date()
      .iso()
      .custom((value, helpers) => {
        const toDate = helpers.state.ancestors[0].TO_DATE_TIME; // Lấy giá trị của trường TO_DATE
        if (value > toDate) {
          return helpers.message("From_date must not greater to_date");
        }
        return value;
      })

      .label("FROM_DATE_TIME")
      .messages({
        "date.base": "The field must be a valid date",
        "date.empty": "Field cannot be left blank",
        "date.min": "The date must not be in the past",
      }),
  });

  return schema.validate(data);
};

const leaveStatusValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    LEAVE_POLICY_ID: Joi.number().label("LEAVE_POLICY_ID").required(),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const leavePolicyValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    CD: Joi.string().label("CD"),
    DESC: Joi.string().label("DESC"),
    MIN_LEAVE_DAYS: Joi.number().label("MIN_LEAVE_DAYS"),
    MAX_LEAVE_DAYS: Joi.number().label("MAX_LEAVE_DAYS"),
    DAYS_REQUEST_BEFORE_LEAVE: Joi.number().label("MAX_LEAVE_DAYS"),
    IS_PAID: Joi.boolean().label("IS_PAID"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const evalutionCriteriaValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const gradeReviewValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const reviewTypeDateValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const evalutionResultValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NOTE: Joi.string().label("NAME"),
    CD: Joi.string().label("CD"),
    EMPLOYEE_EVALUTION_ID: Joi.number().label("EMPLOYEE_EVALUTION_ID"),
    EVALUTION_CRITERIA_ID: Joi.number().label("EVALUTION_CRITERIA_ID"),
    GRADE_REVIEW_ID: Joi.number().label("GRADE_REVIEW_ID"),
    CREATED_BY: Joi.string().label("CREATED_BY"),
  });
  const evalutionResultsArraySchema = Joi.array().items(schema);
  return evalutionResultsArraySchema.validate(data);
};
const employeeEvalutionValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().label("USER_ID"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    TO_DATE: Joi.date().iso().label("TO_DATE"),
    FROM_DATE: Joi.date()
      .iso()
      .custom((value, helpers) => {
        const toDate = helpers.state.ancestors[0].TO_DATE; // Lấy giá trị của trường TO_DATE
        if (value > toDate) {
          return helpers.message("From_date must not greater to_date");
        }
        return value;
      })
      .label("FROM_DATE"),

    NOTE: Joi.string().label("NOTE"),
    REVIEW_TYPE_DATE_ID: Joi.number().label("REVIEW_TYPE_DATE_ID"),
  });

  return schema.validate(data);
};

const candidateValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    LAST_NAME: Joi.string().label("LAST_NAME"),
    FIRST_NAME: Joi.string().label("FIRST_NAME"),
    GENDER_ID: Joi.number().label("GENDER_ID"),
    EMAIL: Joi.string().email().label("EMAIL"),
    PHONE: Joi.string().label("PHONE"),
    POSITION_ID: Joi.number().label("POSITION_ID"),
    POSITION_NAME: Joi.string().label("POSITION_NAME"),
    DESC: Joi.string().label("DESC"),
    NOTE: Joi.string().allow(null).label("NOTE"),
    USER_ID: Joi.number().allow(null).label("USER_ID"),
    ATTACHMENT: Joi.string().label("ATTACHMENT"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    STATUS_ID: Joi.number().label("STATUS_ID"),
    APPLY_DATE: Joi.date().iso().label("APPLY_DATE"),
    CREATED_DATE: Joi.date().iso().label("CREATED_DATE"),
  });
  return schema.validate(data);
};
const candidateStatusValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    INDEX: Joi.number().label("INDEX"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};

const laborContractValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.string().label("USER_ID"),
    CONTRACT_DATE: Joi.date().iso().label("CONTRACT_DATE"),
    START_CONTRACT_DATE: Joi.date().iso().label("START_CONTRACT_DATE"),
    END_CONTRACT_DATE: Joi.date().iso().label("END_CONTRACT_DATE"),
    FILE_NAME: Joi.string().label("FILE_NAME"),
    FILE_PATH: Joi.string().label("FILE_PATH"),
    STATUS_ID: Joi.number().label("STATUS_ID"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    CREATED_BY: Joi.number().label("CREATED_BY"),
    CONTRACT_TYPE_ID: Joi.number().label("CONTRACT_TYPE_ID"),
    CD: Joi.string().label("CD"),
  });
  return schema.validate(data);
};
const contractTypeValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const contractStatusValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const uploadFileValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    CANDIDATE_ID: Joi.number().required().label("CANDIDATE_ID"),
  });
  return schema.validate(data);
};
const employeeLeaveStatusValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().label("CD"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const interviewScheduleValidate = (data) =>{
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().required().label("USER_ID"),
    CANDIDATE_USER_ID: Joi.number().allow(null).label("CANDIDATE_USER_ID"),
    LOCATION_ID: Joi.number().allow(null).label("LOCATION_ID"),
    ROOM_ID: Joi.number().allow(null).label("ROOM_ID"),
    INTERVIEW_START_TIME: Joi.date().required().iso().label("INTERVIEW_START_TIME"),
    INTERVIEW_END_TIME: Joi.date().required()
      .iso()
      .custom((value, helpers) => {
        const toDate = helpers.state.ancestors[0].INTERVIEW_START_TIME; // Lấy giá trị của trường INTERVIEW_START_TIME
        if (value < toDate) {
          return helpers.message("start time must not greater end time");
        }
        return value;
      })
      .label("INTERVIEW_END_TIME"),
    TITLE: Joi.string().allow(null).label("TITLE"),
    DESC: Joi.string().allow(null).label("DESC"),
    STATUS_ID: Joi.number().label("STATUS_ID"),
    UPDATED_BY: Joi.number().required().label("UPDATED_BY"),
  })
  return schema.validate(data)
}
const quitJobValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    LAST_NAME: Joi.string().label("LAST_NAME"),
    FIRST_NAME: Joi.string().label("FIRST_NAME"),
    EMAIL: Joi.string().email().label("EMAIL"),
    PHONE: Joi.string().label("PHONE"),
    POSITION_ID: Joi.number().label("POSITION_ID"),
    POSITION_NAME: Joi.string().label("POSITION_NAME"),
    DESC: Joi.string().label("DESC"),
    NOTE: Joi.string().allow(null).label("NOTE"),
    USER_ID: Joi.number().allow(null).label("USER_ID"),
    ATTACHMENT: Joi.string().label("ATTACHMENT"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
    STATUS_ID: Joi.number().label("STATUS_ID"),
    APPLY_DATE: Joi.date().iso().label("APPLY_DATE"),
    CREATED_DATE: Joi.date().iso().label("CREATED_DATE"),
  });
  return schema.validate(data);
};

const checkAwardPunishTypeValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().required().label("NAME"),
    GROUP_ID: Joi.number().required().label("GROUP_ID"),
    ICON: Joi.string().label("ICON"),
    DESC: Joi.string().allow(null).allow("").label("DESC"),
    NOTE: Joi.string().allow(null).allow("").label("NOTE"),
    SCORE: Joi.number().required().label("SCORE"),
    CD: Joi.string().required().label("CD"),
    UPDATED_BY: Joi.string().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
const checkUserAwardPunishValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    USER_ID: Joi.number().required().label("USER_ID"),
    AWARD_PUNISH_TYPE_ID: Joi.number().required().label("AWARD_PUNISH_TYPE_ID"),
    REWARDER_ID: Joi.number().required().label("REWARDER_ID"),
    COMMENT: Joi.string().label("COMMENT"),
    NOTE: Joi.string().allow(null).allow("").label("NOTE"),
    UPDATED_BY: Joi.number().label("UPDATED_BY"),
  });
  return schema.validate(data);
};
module.exports = {
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
  interviewScheduleValidate,
  allowLeaveValidateUpdate,
  checkAwardPunishTypeValidate,
  checkUserAwardPunishValidate
};
