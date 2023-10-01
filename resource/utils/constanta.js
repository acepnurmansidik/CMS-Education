const methodConstant = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
};

const compaOpr = {
  GT: "gt",
  GTE: "gte",
  LT: "lt",
  LTE: "lte",
  EQUAL: "eq",
  NOT_EQUAL: "ne",
  IS_NULL: "is",
  IS_NOT: "not",
  COLUMN: "col",

  ILIKE: "iLike",
  NOT_ILIKE: "notILike",

  BETWEEN: "between",
  NOT_BETWEEN: "notBetween",
  IN: "in",
  NOT_IN: "notIn",

  AND: "and",
  OR: "or",
};

module.exports = {
  methodConstant,
  compaOpr,
};
