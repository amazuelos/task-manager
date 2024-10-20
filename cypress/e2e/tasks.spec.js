
describe('Task Manager', () => {

  beforeEach(() => {
    cy.visit('/page')
  })

  it('should add a new task', () => {
    cy.get('input').type('New Task')
    cy.get('[data-test="addTask"]').contains('Add Task').click()
  })

  it('should mark a task as completed', () => {
    cy.get('[data-test="toggleTask"]').contains('Mark as Completed').click()
    cy.get('[data-test="toggleTask"]').contains('Mark as Not Completed')
  })

  it('should mark a task as completed', () => {
    cy.get('[data-test="toggleTask"]').contains('Mark as Not Completed').click()
    cy.get('[data-test="toggleTask"]').contains('Mark as Completed')
  })

  it('should delete a task', () => {
    cy.get('[data-test="deleteTask"]').contains('Delete').click()
    cy.get('li').should('not.exist')
  })
})

describe('Tasks Filter', () => {
  
  beforeEach(() => {
    cy.visit('/page')
  })

  it('should add a new task', () => {
    cy.get('input').type('New Task')
    cy.get('[data-test="addTask"]').contains('Add Task').click()
  })

  it('Should have task in all', () => {
    cy.get('button').contains('All')
    cy.get('li').contains('New Task').should('exist')
  })

  it('Should not have task in Completed', () => {
    cy.get('button').contains('Completed').click()
    cy.get('li').should('not.exist')
  })

  it('Should have task in Pending', () => {
    cy.get('button').contains('Pending').click()
    cy.get('li').contains('New Task').should('exist')
  })

  it('Mark task as completed, should have task in Completed', () => {
    cy.get('[data-test="toggleTask"]').contains('Mark as Completed').click()
    cy.get('[data-test="toggleTask"]').contains('Mark as Not Completed')
    cy.get('button').contains('Completed').click()
    cy.get('li').should('exist')
  })

  it('Mark task as completed, should not have task in Pending', () => {
    cy.get('button').contains('Pending').click()
    cy.get('li').should('not.exist')
  })

  it('Delete a task, should not have tasks in All', () => {
    cy.get('[data-test="deleteTask"]').contains('Delete').click()
    cy.get('li').should('not.exist')
    cy.get('button').contains('All').click()
    cy.get('li').should('not.exist')
  })
})