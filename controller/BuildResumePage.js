

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
export const BuildResumePage = (req, res) => {
  if (!req.user) return res.redirect("/login");
  const resumes = [
    { name: "Sample Resume", tag: "Web Dev", created: "July 18", modified: "July 19", viewLink: "#", downloadLink: "#", deleteLink: "#" }
  ];

  res.render("BuildResume", { resumes });
}

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
