import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/default-layout'
import { History } from './pages/history'
import { Home } from './pages/home'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={DefaultLayout}>
					<Route path="/" Component={Home} />
					<Route path="/history" Component={History} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
