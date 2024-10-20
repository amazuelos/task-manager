describe('Task Manager', () => {
  it('should add a new task', () => {
    cy.visit('/')
    cy.get('input').type('New Task')
    cy.contains('Add Task').click()
    cy.contains('New Task')
  })

  it('should mark a task as completed', () => {
    cy.contains('Complete').click()
    cy.get('li').should('have.class', 'line-through')
  })

  it('should delete a task', () => {
    cy.contains('Delete').click()
    cy.get('li').should('not.exist')
  })
})