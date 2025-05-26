import styled, { css } from 'styled-components'

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariants
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'gray',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 0 32px;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 0 8px;
  background: ${(props) => props.theme.green[500]};
  color: ${(props) => props.theme.white};
  font-weight: bold;

  /* ${(props) => {
    return css`
      background: ${buttonVariants[props.variant]}
    `
  }} */
`
