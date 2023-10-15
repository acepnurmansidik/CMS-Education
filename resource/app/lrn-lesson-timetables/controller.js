const {
  LrnLessonTimetableModel,
} = require("../../models/lrn-lesson-timetables");
const { SysRefMajorModel } = require("../../models/sys-ref-major");
const { SysRefParameterModel } = require("../../models/sys-ref-parameter");
const { methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");

const controller = {};

controller.Index = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get filter at req.query
    const { limit, page, ...query } = req.query;
    // find data from database with filter condition
    const result = await LrnLessonTimetableModel.findAll({
      where: { ...query },
      offset: page - 1,
      limit,
    });
    // send success response
    response.GetPaginationResponse(res, result, page, limit);
  } catch (err) {
    next(err);
  }
};

controller.StudentSchedule = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get filter at req.query
    const { limit, page, ...query } = req.query;
    // find data from database with filter condition
    const result = await LrnLessonTimetableModel.findAll({
      where: { ...query },
      group: [
        "day_id",
        "major_id",
        "level_id",
        "sys_ref_major.id",
        "sys_ref_major.role",
        "level.id",
        "day.id",
      ],
      attributes: ["day_id", "major_id", "level_id"],
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
    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Create = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyLessonTimetableSchema' }
    }
  */
  try {
    // get data payload from req body
    const payload = req.body;

    // save to database
    const result = await LrnLessonTimetableModel.create(payload);

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params
    const id = req.params.id;
    // find data by id on database
    const result = await LrnLessonTimetableModel.findOne({
      where: { id },
      attributes: ["id", "room_name"],
    });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // send success responses
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Update = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyLessonTimetableSchema' }
    }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnLessonTimetableModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnLessonTimetableModel.update(payload, { where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

controller.Delete = async (req, res, next) => {
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnLessonTimetableModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnLessonTimetableModel.destroy({ where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.DELETE, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
