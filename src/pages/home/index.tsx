import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

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

export function Home() {
	const { register, handleSubmit, watch } = useForm()

	function handleCreateNewCycle(data: any) {
		console.log(data)
	}

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
