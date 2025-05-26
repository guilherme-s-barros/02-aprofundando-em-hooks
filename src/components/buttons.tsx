import { ButtonContainer, ButtonVariants } from './button.styles'

interface ButtonProps {
	variant?: ButtonVariants
}

export function Button({ variant = 'primary' }: ButtonProps) {
	return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
