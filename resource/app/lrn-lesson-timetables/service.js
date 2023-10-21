const { Sequelize } = require("sequelize");
const {
  LrnLessonTimetableModel,
} = require("../../models/lrn-lesson-timetables");
const { SysRefMajorModel } = require("../../models/sys-ref-major");
const { SysRefParameterModel } = require("../../models/sys-ref-parameter");

const service = {};

service.getScheduleWithGrouping = async ({ where }) => {
  return await LrnLessonTimetableModel.findAll({
    where,
    group: [
      "day_id",
      "major_id",
      "level_id",
      "sys_ref_major.id",
      "sys_ref_major.role",
      "level.id",
      "school_year",
      "day.id",
    ],
    attributes: ["day_id", "major_id", "level_id", "school_year"],
    include: [
      {
        model: SysRefMajorModel,
        attributes: ["role"],
      },
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "level",
      },
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "day",
      },
    ],
  });
};

service.getDetailDataSchedule = async ({ where }) => {
  return await LrnLessonTimetableModel.findAll({
    where,
    attributes: [
      "id",
      "start_class_time",
      "end_class_time",
      "lesson_id",
      "location_id",
      "day_id",
      "major_id",
      "level_id",
    ],
    include: [
      {
        model: SysRefParameterModel,
        attributes: ["value"],
        as: "lesson",
      },
    ],
  });
};

module.exports = service;
