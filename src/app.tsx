import { ThemeProvider } from 'styled-components'

import { Button } from './components/buttons'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />
			<Button variant="primary" />
			<Button variant="secondary" />
			<Button variant="danger" />
			<Button variant="success" />
			<Button />
		</ThemeProvider>
	)
}
