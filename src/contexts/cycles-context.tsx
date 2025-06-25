import {
	ReactNode,
	createContext,
	useContext,
	useReducer,
	useState,
} from 'react'

export interface Cycle {
	id: string
	task: string
	minutesAmount: number
	startDate: Date
	interruptedDate?: Date
	finishedDate?: Date
}

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

interface CyclesState {
	cycles: Cycle[]
	activeCycleId: string | null
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [cyclesState, dispatch] = useReducer<CyclesState, [any]>(
		(state, action) => {
			switch (action.type) {
				case 'ADD_NEW_CYCLE': {
					return {
						...state,
						cycles: [...state.cycles, action.payload.newCycle],
						activeCycleId: action.payload.newCycle.id,
					}
				}

				case 'INTERRUPT_CURRENT_CYCLE': {
					const cyclesWithInterruptedCycle = state.cycles.map((cycle) => {
						if (cycle.id === state.activeCycleId) {
							return {
								...cycle,
								interruptedDate: new Date(),
							}
						}

						return cycle
					})

					return {
						...state,
						cycles: cyclesWithInterruptedCycle,
						activeCycleId: null,
					}
				}

				case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
					const cyclesWithFinishedCycle = state.cycles.map((cycle) => {
						if (cycle.id === state.activeCycleId) {
							return {
								...cycle,
								finishedDate: new Date(),
							}
						}

						return cycle
					})

					return {
						...state,
						cycles: cyclesWithFinishedCycle,
						activeCycleId: null,
					}
				}

				default: {
					return state
				}
			}
		},
		{
			cycles: [],
			activeCycleId: null,
		},
	)

	const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

	const { cycles, activeCycleId } = cyclesState

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	function setSecondsElapsed(seconds: number) {
		setAmountSecondsElapsed(seconds)
	}

	function markCurrentCycleAsFinished() {
		dispatch({
			type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
		})
	}

	function createNewCycle(data: CreateCycleData) {
		const newCycle = {
			id: String(Date.now()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		} satisfies Cycle

		setAmountSecondsElapsed(0)

		dispatch({
			type: 'ADD_NEW_CYCLE',
			payload: {
				newCycle,
			},
		})
	}

	function interruptCurrentCycle() {
		dispatch({
			type: 'INTERRUPT_CURRENT_CYCLE',
		})
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
