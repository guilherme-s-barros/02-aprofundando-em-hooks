import { ReactNode, createContext, useContext, useState } from 'react'

interface Cycle {
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
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return {
						...cycle,
						finishedDate: new Date(),
					}
				}

				return cycle
			}),
		)

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
		setCycles((state) => [...state, newCycle])
		setActiveCycleId(newCycleId)

		// reset()
	}

	function interruptCurrentCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return {
						...cycle,
						interruptedDate: new Date(),
					}
				}

				return cycle
			}),
		)

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
