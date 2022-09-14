describe("Pomodoro tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });

  it("displays the timer", () => {
    cy.contains("25 : 00m");
    cy.contains("Current todo: N/A");
  });

  it("displays the todos (empty)", () => {
    cy.contains("Todo list (0) [0h : 0m]");
    cy.contains("Todo list is empty.");
  });

  it("can add a new todo", () => {
    const q = "run 10k";

    cy.getBySel("add-new-todo").wait(100).type(q);
    cy.getBySel("add-button").click();

    cy.getBySel("increase-button").click();
    cy.getBySel("decrease-button").click();
    cy.getBySel("delete-button").click();

    cy.contains("Todo list is empty.");
  });

  it("can add a new todo and start a timer for it", () => {
    const q = "run 10k";

    cy.getBySel("add-new-todo").wait(100).type(q);
    cy.getBySel("add-button").click();

    cy.contains(q).click();
    cy.contains(`Current todo: ${q}`);

    cy.contains("Start").click();

    cy.contains("Stop");
    cy.contains("Pause");
    cy.contains("24 : ");

    cy.contains("Stop").click();

    cy.contains("Completed todo list (1) [0h : 25m]");
    cy.contains(q);

    cy.contains("25 : 00m");
    cy.contains("Current todo: N/A");
  });
});
