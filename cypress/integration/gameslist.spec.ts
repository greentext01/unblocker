describe('Add button', function () {
  it('should navigate on click', function () {
    cy.visit('http://localhost:3000/');
    cy.get('button[id="addButton"]').click();
    cy.url().should('include', 'signin');
  });
});
