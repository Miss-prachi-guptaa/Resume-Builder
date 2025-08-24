import { Router } from "express";
import { BuildResumePage, CreateNewPage, getHomePage, } from "../controller/BuildResumePage.js";
import * as pdf from 'html-pdf-node';

const router = Router();

router.get('/', getHomePage);
router.get("/buildResume", BuildResumePage);

router.get('/CreateNew', CreateNewPage);

router.get('/edit/:templateId', (req, res) => {
  const templateId = req.params.templateId;

  // Dummy data for testing
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    skills: ["JavaScript", "Node.js", "React", "MongoDB"],
    references: [
      { name: "Jane Smith", contact: "jane@example.com" },
      { name: "Bob Johnson", contact: "bob@example.com" }
    ],
    education: [
      {
        degree: "B.Tech CSE",
        institution: "XYZ University",
        year: "2024",
        details: [
          "Specialization in Artificial Intelligence",
          "Secured 8.7 CGPA",
          "Member of Coding Club"
        ]
      },
      {
        degree: "12th CBSE",
        institution: "ABC School",
        year: "2020",
        details: [
          "Achieved 92% marks",
          "Participated in Science Olympiad"
        ]
      }
    ]
    ,
    experience: [
      {
        role: "Intern",
        company: "ABC Corp",
        duration: "Jan 2023 - Jun 2023",
        points: [
          "Worked on backend APIs with Node.js and Express",
          "Implemented authentication using JWT",
          "Collaborated with frontend team for integration"
        ]
      },
      {
        role: "Software Developer Intern",
        company: "XYZ Tech",
        duration: "Jan 2024 - May 2024",
        points: [
          "Built reusable React components",
          "Improved database queries for faster response",
          "Contributed to deployment using Docker"
        ]
      }
    ]

    ,
    projects: [
      { title: "Resume Builder", description: "Built with Node.js and EJS templates" }
    ],
    certificates: [
      {
        name: "Full Stack Web Development",
        date: "July 2023",
        details: "Completed certification on MERN stack including React, Node.js, Express, and MongoDB."
      },
      {
        name: "Data Structures and Algorithms",
        date: "March 2022",
        details: "Certified by GeeksforGeeks for solving 300+ coding problems."
      },
      {
        name: "Cloud Fundamentals",
        date: "December 2021",
        details: "Microsoft Azure Fundamentals certification covering cloud basics, storage, and compute services."
      }
    ]

  };
  // dynamically pick the template file
  let templateFile = '';
  switch (templateId) {
    case '1':
      templateFile = 'templates/template1';
      break;
    case '2':
      templateFile = 'templates/template2';
      break;
    case '3':
      templateFile = 'templates/template3';
      break;
    case '4':
      templateFile = 'templates/template4';
      break;
    case '5':
      templateFile = 'templates/template5';
      break;
    default:
      templateFile = 'templates/template1'; // fallback
  }

  res.render(templateFile, { templateId, user });
});



router.post('/generate-pdf/:templateId', async (req, res) => {
  const editedHTML = req.body.resumeHTML;

  const fullHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
     <link rel="stylesheet" href="http://localhost:3000/template1.css">
    </head>
    <body>
      ${editedHTML}
    </body>
    </html>
  `;

  let options = { format: 'A4' };
  let file = { content: fullHTML };

  try {
    const pdfBuffer = await pdf.generatePdf(file, options);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('PDF generation error');
  }
});


export const BuildResumePageRoute = router;