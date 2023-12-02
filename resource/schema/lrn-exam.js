const QuestionExamSchema = {
  BodyQuestionExamSchema: {
    exam_date: "2024-01-01",
    processing_time: 60,
    is_active: "false",
    major_id: "8053488f-318f-4ec3-b90b-331c50949bd0",
    day_id: "580a91bf-16ec-4ff1-b61d-32b9240a772d",
    teacher_id: "ce877533-6ab2-4583-81fa-ba838c01d04c",
    level_id: "aa53de8a-29f4-4562-96b8-f557f9f43e5c",
    lesson_id: "74f94d7f-7183-4598-9034-d850f634193e",
    type_exam_id: "74bb2172-d27a-4599-b1f7-0444bd4d0b95",
    questions: [
      {
        question_number: 1,
        value: 20,
        question:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ante egestas, maximus massa vel, vehicula odio.",
        flag_img: false,
        file_url_id: null,
        question_type_id: "a66ea6a6-c193-407c-a700-c5b07db97640",
        right_answer: "35f402d0-f103-4b0f-894b-fd2c3c162bdb",
        multiple_question: [
          {
            description: "Lorem ipsum dolor sit amet",
            flag_img: false,
            file_url_id: null,
            answer_type_id: "35f402d0-f103-4b0f-894b-fd2c3c162bdb",
          },
        ],
      },
    ],
  },
};

module.exports = QuestionExamSchema;
