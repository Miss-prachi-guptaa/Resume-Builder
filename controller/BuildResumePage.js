import ResumeSave from "../schema/resume.js";


export const getHomePage = (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {

    // let isLoggedIn = req.headers.cookie;
    // let isLoggedIn = req.cookies.isLoggedIn;

    return res.render("index");

  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }

}
// 2nd page button build resume route


export const BuildResumePage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  try {
    // Fetch resumes of logged-in user
    const resumes = await ResumeSave.find({ userId: req.user.id }).lean();


    res.render("BuildResume", { resumes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading resumes");
  }
};

//
export const CreateNewPage = (req, res) => {
  if (!req.user) return res.redirect("/login");
  const templates = [
    { id: 1, image: '/templates/template1.png' },
    { id: 2, image: '/templates/template2.png' },
    { id: 3, image: '/templates/template3.png' },
    { id: 4, image: '/templates/template4.png' },
    { id: 5, image: '/templates/template5.png' },
  ];
  res.render('templates', { templates });
};
