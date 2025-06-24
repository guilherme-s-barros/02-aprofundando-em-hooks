import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'

import { useCyclesContext } from '../../contexts/cycles-context'
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

export function Home() {
	const { activeCycle, createNewCycle, interruptCurrentCycle } =
		useCyclesContext()

	const newCycleForm = useForm({
		resolver: zodResolver(newCycleFormValidationSchema),
	})

	const { handleSubmit, watch } = newCycleForm

	const task = watch('task')
	const isSubmitDisabled = !task

	return (
		<HomeContainer $isCountdownRunning={!!activeCycle}>
			<Form onSubmit={handleSubmit(createNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />

				{activeCycle ? (
					<StopCountdownButton type="button" onClick={interruptCurrentCycle}>
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
