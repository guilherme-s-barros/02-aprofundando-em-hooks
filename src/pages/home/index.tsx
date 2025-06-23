import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Countdown } from './components/countdown'
import { NewCycleForm } from './components/new-cycle-form'

import {
	Form,
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, 'Informe a tarefa.'),
	minutesAmount: z
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
	id: string
	task: string
	minutesAmount: number
	startDate: Date
	interruptedDate?: Date
	finishedDate?: Date
}

interface CyclesContextData {
	activeCycle?: Cycle
	markCurrentCycleAsFinished(): void
}

export const CyclesContext = createContext({} as CyclesContextData)

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

	const { register, handleSubmit, watch, reset } = useForm({
		resolver: zodResolver(newCycleFormValidationSchema),
	})

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	const task = watch('task')
	const isSubmitDisabled = !task

	// function handleCreateNewCycle(data: NewCycleFormData) {
	// 	const newCycleId = String(Date.now())

	// 	const newCycle = {
	// 		id: newCycleId,
	// 		task: data.task,
	// 		minutesAmount: data.minutesAmount,
	// 		startDate: new Date(),
	// 	} satisfies Cycle

	// 	setAmountSecondsElapsed(0)
	// 	setCycles((state) => [...state, newCycle])
	// 	setActiveCycleId(newCycleId)

	// 	reset()
	// }

	function handleInterruptCycle() {
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

	return (
		<HomeContainer $isCountdownRunning={!!activeCycle}>
			<Form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
				<CyclesContext.Provider
					value={{ activeCycle, markCurrentCycleAsFinished }}
				>
					{/* <NewCycleForm /> */}
					<Countdown />
				</CyclesContext.Provider>

				{activeCycle ? (
					<StopCountdownButton type="button" onClick={handleInterruptCycle}>
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</Form>
		</HomeContainer>
	)
}
