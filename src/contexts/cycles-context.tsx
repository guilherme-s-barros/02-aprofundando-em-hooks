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

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [cycles, dispatch] = useReducer<Cycle[], [any]>((state, action) => {
		if (action.type === 'ADD_NEW_CYCLE') {
			return [...state, action.payload.newCycle]
		}

		if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
			return state.map((cycle) => {
				if (cycle.id === action.payload.activeCycleId) {
					return {
						...cycle,
						interruptedDate: new Date(),
					}
				}

				return cycle
			})
		}

		if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
			return state.map((cycle) => {
				if (cycle.id === action.payload.activeCycleId) {
					return {
						...cycle,
						finishedDate: new Date(),
					}
				}

				return cycle
			})
		}

		return state
	}, [])

	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	function markCurrentCycleAsFinished() {
		dispatch({
			type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
			payload: {
				activeCycleId,
			},
		})

		setActiveCycleId(null)
	}

	function setSecondsElapsed(seconds: number) {
		setAmountSecondsElapsed(seconds)
	}

	function createNewCycle(data: CreateCycleData) {
		const newCycleId = String(Date.now())

		const newCycle = {
			id: newCycleId,
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

		setActiveCycleId(newCycleId)
	}

	function interruptCurrentCycle() {
		dispatch({
			type: 'INTERRUPT_CURRENT_CYCLE',
			payload: {
				activeCycleId,
			},
		})

		setActiveCycleId(null)
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
