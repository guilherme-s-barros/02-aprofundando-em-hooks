import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	CountdownContainer,
	FormContainer,
	FormInputs,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	TextInput,
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
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

	const { register, handleSubmit, watch, reset } = useForm({
		resolver: zodResolver(newCycleFormValidationSchema),
	})

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	const minutesAmountInSeconds = activeCycle
		? activeCycle.minutesAmount * 60
		: 0

	const currentSeconds = activeCycle
		? minutesAmountInSeconds - amountSecondsElapsed
		: 0

	const minutesAmount = Math.trunc(currentSeconds / 60)
	const secondsAmount = currentSeconds % 60

	const [firstDigitOfMinutes, secondDigitOfMinutes] = minutesAmount
		.toString()
		.padStart(2, '0')

	const [firstDigitOfSeconds, secondDigitOfSeconds] = secondsAmount
		.toString()
		.padStart(2, '0')

	const task = watch('task')
	const isSubmitDisabled = !task

	useEffect(() => {
		let countdownInterval: number

		if (activeCycle) {
			countdownInterval = setInterval(() => {
				const timeElapsedInSeconds = Math.trunc(
					(Date.now() - activeCycle.startDate.getTime()) / 1000,
				)

				setAmountSecondsElapsed(timeElapsedInSeconds)
			}, 1000)
		}

		return () => {
			clearInterval(countdownInterval)
		}
	}, [activeCycle])

	function handleCreateNewCycle(data: NewCycleFormData) {
		const newCycleId = String(Date.now())

		const newCycle = {
			id: newCycleId,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		} satisfies Cycle

		setCycles((state) => [...state, newCycle])
		setActiveCycleId(newCycleId)

		reset()
	}

	return (
		<HomeContainer>
			<FormContainer onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormInputs>
					<label htmlFor="task">Vou trabalhar em</label>
					<TextInput
						type="text"
						id="task"
						placeholder="Dê um nome para o seu projeto"
						list="taskSuggestions"
						required
						{...register('task')}
					/>

					<datalist id="taskSuggestions">
						<option value="Projeto 1" />
						<option value="Projeto 2" />
						<option value="Projeto 3" />
						<option value="Projeto 4" />
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						min={5}
						max={60}
						step={5}
						required
						{...register('minutesAmount', { valueAsNumber: true })}
					/>

					<span>minutos.</span>
				</FormInputs>

				<CountdownContainer>
					<span>{firstDigitOfMinutes}</span>
					<span>{secondDigitOfMinutes}</span>
					<Separator>:</Separator>
					<span>{firstDigitOfSeconds}</span>
					<span>{secondDigitOfSeconds}</span>
				</CountdownContainer>

				<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
					<Play size={24} />
					Começar
				</StartCountdownButton>
			</FormContainer>
		</HomeContainer>
	)
}
