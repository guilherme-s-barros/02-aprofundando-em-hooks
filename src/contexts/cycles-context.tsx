import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react'

import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'

import {
	Cycle,
	cyclesReducer,
	initialCyclesState,
} from '../reducers/cycles/reducer'

type CreateCycleData = Pick<Cycle, 'task' | 'minutesAmount'>

interface CyclesContextData {
	cycles: Cycle[]
	activeCycle?: Cycle
	activeCycleId: string | null
	amountSecondsElapsed: number
	markCurrentCycleAsFinished(): void
	setSecondsElapsed(seconds: number): void
	createNewCycle(data: CreateCycleData): void
	interruptCurrentCycle(): void
}

interface CyclesContextProviderProps {
	children: ReactNode
}

const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		initialCyclesState,
		(initialState) => {
			const storedStateAsJSON = localStorage.getItem(
				'@ignite-timer:cycles-state-1.0.0',
			)

			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON)
			}

			return initialState
		},
	)

	const { cycles, activeCycleId } = cyclesState
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(() => {
		if (activeCycle) {
			const timeElapsedInSeconds = Math.trunc(
				(Date.now() - new Date(activeCycle.startDate).getTime()) / 1000,
			)

			return timeElapsedInSeconds
		}

		return 0
	})

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState)

		localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
	}, [cyclesState])

	function setSecondsElapsed(seconds: number) {
		setAmountSecondsElapsed(seconds)
	}

	function markCurrentCycleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction())
	}

	function createNewCycle(data: CreateCycleData) {
		const newCycle = {
			id: String(Date.now()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		} satisfies Cycle

		setAmountSecondsElapsed(0)
		dispatch(addNewCycleAction(newCycle))
	}

	function interruptCurrentCycle() {
		dispatch(interruptCurrentCycleAction())
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondsElapsed,
				setSecondsElapsed,
				createNewCycle,
				interruptCurrentCycle,
			}}
		>
			{children}
		</CyclesContext.Provider>
	)
}

export const useCyclesContext = () => useContext(CyclesContext)
