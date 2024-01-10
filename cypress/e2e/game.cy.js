describe('Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('X is winner', () => {
    const squareId = '[data-testid="square"]';

    cy.get(squareId).eq(0).click();
    cy.get(squareId).eq(1).click();
    cy.get(squareId).eq(4).click();
    cy.get(squareId).eq(2).click();
    cy.get(squareId).eq(8).click();

    cy
    .get('[data-testid="status"')
    .should(($div) => {
        expect($div).to.have.length(1)
        expect($div[0]).to.have.text('X wins!')
    });
  });

  it('O is winner', () => {
    const squareId = '[data-testid="square"]';

    cy.get(squareId).eq(1).click();
    cy.get(squareId).eq(0).click();
    cy.get(squareId).eq(3).click();
    cy.get(squareId).eq(4).click();
    cy.get(squareId).eq(2).click();
    cy.get(squareId).eq(8).click();

    cy
    .get('[data-testid="status"')
    .should(($div) => {
      expect($div).to.have.length(1)
      expect($div[0]).to.have.text('O wins!')
    });
  });

  it('reset button is clicked', () => {
    const squareId = '[data-testid="square"]';

    cy.get(squareId).eq(1).click();
    cy.get(squareId).eq(0).click();
    cy.get(squareId).eq(3).click();

    const resetButtonId = '[data-testid="reset-button"]';

    cy.get(resetButtonId).should('have.length', 1);
    cy.get(resetButtonId).eq(0).click();

    cy
    .get(squareId)
    .each(($square) => {
      expect($square.text()).equal('')
    })
  });

  it('page state is kept after reload', () => {
    const squareId = '[data-testid="square"]';

    cy.get(squareId).eq(0).click();
    cy.get(squareId).eq(1).click();
    cy.get(squareId).eq(2).click();

    cy.reload();

    cy.get(squareId).eq(0).should('have.text', 'X');
    cy.get(squareId).eq(1).should('have.text', 'O');
    cy.get(squareId).eq(2).should('have.text', 'X');

    cy
    .get('[data-testid="status"')
    .should(($div) => {
        expect($div).to.have.length(1)
        expect($div[0]).to.have.text('Next player: X')
    });
  });
});