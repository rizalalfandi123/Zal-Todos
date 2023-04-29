import { Button } from './button.component';
import { circularProgressClasses } from '@mui/material/CircularProgress';

describe('Button', () => {
 it('use "isLoading" props and render circular progress', () => {
  cy.mount(
   <Button isLoading variant='contained'>
    Click me
   </Button>
  );

  cy.get('span').should('have.class', circularProgressClasses.root);
 });
});
