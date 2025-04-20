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
  height: 56px;

  ${(props) => {
    return css`
      background: ${buttonVariants[props.variant]}
    `
  }}
`
