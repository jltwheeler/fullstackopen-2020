describe("Blog app", () => {
  let user, otherUser;
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    user = {
      name: "Cypres Bot",
      username: "cypress_bot",
      password: "cypress123",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is displayed by default", () => {
    cy.contains("login");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("login").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#btn-login").click();

      cy.contains(`${user.name} is logged-in`);
    });

    it("fails with wrong credentials", () => {
      cy.contains("login").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type("blah");
      cy.get("#btn-login").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", `${user.name} is logged-in`);
    });
  });

  describe("when logged in", () => {
    const newBlog = {
      title: "cypress blog",
      author: "cypress",
      url: "www.cypress.com",
    };

    beforeEach(() => {
      cy.login({ username: user.username, password: user.password });
    });

    it("A blog can be created", () => {
      cy.contains("new blog").click();

      cy.get(".blog-form__title").type(newBlog.title);
      cy.get(".blog-form__author").type(newBlog.author);
      cy.get(".blog-form__url").type(newBlog.url);

      cy.contains("create").click();

      cy.contains(`${newBlog.title} ${newBlog.author}`);
    });

    it("A user can like a blog", () => {
      cy.createBlog(newBlog);

      cy.get(".btn-visible").click();
      cy.get(".btn-like").click();

      cy.get(".blog__likes").contains("1");
    });

    it("A user can delete the blog they created", () => {
      cy.createBlog(newBlog);
      cy.get(".btn-visible").click();
      cy.contains("remove").click();
      cy.get("#root").should("not.contain", "cypress blog");
    });

    it("other users cannot delete the blog", () => {
      cy.createBlog(newBlog);

      otherUser = {
        name: "Cypres Other",
        username: "cypress_other",
        password: "cypress123",
      };
      cy.request("POST", "http://localhost:3001/api/users/", otherUser);
      cy.login(otherUser);

      cy.get(".btn-visible").click();

      cy.get("button:last").should("have.css", "display", "none");
    });

    it("check that blogs are ordered according to descending likes", () => {
      const blogs = [
        {
          title: "high like blog",
          author: "snoop dog",
          url: "www.cypress.com",
          likes: 100,
        },
        {
          title: "med like blog",
          author: "beast",
          url: "www.cypress.com",
          likes: 50,
        },
        {
          title: "low like blog",
          author: "ned flanders",
          url: "www.cypress.com",
          likes: 0,
        },
      ];

      cy.createBlog(blogs[0]);
      cy.createBlog(blogs[1]);
      cy.createBlog(blogs[2]);

      cy.get(".blog").each((blog, idx) => {
        expect(blog).to.contain(blogs[idx].title);
      });
    });
  });
});
