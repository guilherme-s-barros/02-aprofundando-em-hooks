import { ThemeProvider } from 'styled-components'

import { CyclesContextProvider } from './contexts/cycles-context'
import { Router } from './router'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />

			<CyclesContextProvider>
				<Router />
			</CyclesContextProvider>
		</ThemeProvider>
	)
}
