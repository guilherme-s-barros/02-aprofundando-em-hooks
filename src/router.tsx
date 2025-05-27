import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { History } from './pages/history'
import { Home } from './pages/home'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={Home} />
				<Route path="/history" Component={History} />
			</Routes>
		</BrowserRouter>
	)
}
