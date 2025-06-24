import { useFormContext } from 'react-hook-form'

import { useCyclesContext } from '../../../../contexts/cycles-context'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
	const { activeCycle } = useCyclesContext()
	const { register } = useFormContext()

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<TaskInput
				type="text"
				id="task"
				placeholder="Dê um nome para o seu projeto"
				list="taskSuggestions"
				required
				disabled={!!activeCycle}
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
				disabled={!!activeCycle}
				{...register('minutesAmount', { valueAsNumber: true })}
			/>

			<span>minutos.</span>
		</FormContainer>
	)
}
