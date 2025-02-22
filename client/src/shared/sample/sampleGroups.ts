interface Group {
  _id: string;
  title: string;
  thumbnail: string;
  memberCount: number;
}

export const sampleGroups: Group[] = [
  {
    _id: "group1",
    title: "Introduction to Node.js",
    thumbnail:
      "https://res.cloudinary.com/dqrcywqyg/image/upload/v1739591048/course_thumbnails/w03x2vyna6sfuagmgedn.png",
    memberCount: 150,
  },
  {
    _id: "group2",
    title: "Advanced Docker Techniques",
    thumbnail:
      "https://res.cloudinary.com/dqrcywqyg/image/upload/v1739591048/course_thumbnails/w03x2vyna6sfuagmgedn.png",
    memberCount: 200,
  },
  {
    _id: "group3",
    title: "Mastering MongoDB",
    thumbnail:
      "https://res.cloudinary.com/dqrcywqyg/image/upload/v1739591048/course_thumbnails/w03x2vyna6sfuagmgedn.png",
    memberCount: 175,
  },
];
