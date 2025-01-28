// data/sampleMaterials.ts

import {
  IMaterial,
  IReadingMaterial,
  IAssessmentMaterial,
  IVideoMaterial,
} from "../types/Material";

export const sampleMaterials: IMaterial[] = [
  {
    _id: "1",
    title: "Understanding Asynchronous JavaScript",
    description:
      "Dive into the world of asynchronous JavaScript and learn about callbacks, promises, and async/await.",
    type: "reading",
    content:
      "Asynchronous programming allows JavaScript to perform non-blocking operations. Callbacks were the original solution, but modern JavaScript now uses promises and async/await for cleaner and more readable code.",
    wordCount: 420,
  } as IReadingMaterial,
  {
    _id: "2",
    title: "HTML & CSS Fundamentals Quiz",
    description: "Test your knowledge of basic HTML and CSS concepts.",
    type: "assessment",
    questions: [
      {
        question: "Which tag is used to define a hyperlink in HTML?",
        options: ["<a>", "<link>", "<hyperlink>", "<url>"],
        correctAnswer: "<a>",
      },
      {
        question:
          "Which property is used to change the background color in CSS?",
        options: ["color", "background-color", "bg-color", "color-bg"],
        correctAnswer: "background-color",
      },
    ],
    totalMarks: 10,
  } as IAssessmentMaterial,
  {
    _id: "3",
    title: "CSS Grid Layout Tutorial",
    description:
      "A video tutorial explaining how to create layouts with CSS Grid.",
    type: "video",
    url: "https://www.example.com/video/css-grid-layout",
    duration: 20,
  } as IVideoMaterial,
];
