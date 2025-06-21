import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import { useState } from 'react'
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
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

	const { register, handleSubmit, watch, reset } = useForm({
		resolver: zodResolver(newCycleFormValidationSchema),
	})

	function handleCreateNewCycle(data: NewCycleFormData) {
		const newCycleId = String(Date.now())

		const newCycle = {
			id: newCycleId,
			task: data.task,
			minutesAmount: data.minutesAmount,
		} satisfies Cycle

		setCycles((state) => [...state, newCycle])
		setActiveCycleId(newCycleId)

		reset()
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	const task = watch('task')
	const minutesAmount = watch('minutesAmount')
	const isSubmitDisabled = !task || !minutesAmount

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
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
					<Play size={24} />
					Começar
				</StartCountdownButton>
			</FormContainer>
		</HomeContainer>
	)
}
