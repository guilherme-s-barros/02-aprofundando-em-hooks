import { Scroll, Timer } from 'phosphor-react'

import igniteLogo from '../../assets/logo-ignite.svg'

import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'

export function Header() {
	return (
		<HeaderContainer>
			<img
				src={igniteLogo}
				alt="Logotipo do Ignite - Dois triângulos verdes equiláteros sobrepostos formando outro triângulo em sua interseção."
			/>

			<nav>
				<NavLink to="/" title="Ir para o timer">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="Ir para o histórico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	)
}
