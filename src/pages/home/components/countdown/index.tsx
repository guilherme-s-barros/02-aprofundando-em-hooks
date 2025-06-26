import { useEffect } from 'react'

import { useCyclesContext } from '../../../../contexts/cycles-context'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
	const {
		activeCycle,
		markCurrentCycleAsFinished,
		amountSecondsElapsed,
		setSecondsElapsed,
	} = useCyclesContext()

	const minutesAmountInSeconds = activeCycle
		? activeCycle.minutesAmount * 60
		: 0

	const currentSeconds = activeCycle
		? minutesAmountInSeconds - amountSecondsElapsed
		: 0

	const minutesAmount = Math.trunc(currentSeconds / 60)
	const secondsAmount = currentSeconds % 60

	const minutes = minutesAmount.toString().padStart(2, '0')
	const seconds = secondsAmount.toString().padStart(2, '0')

	useEffect(() => {
		let countdownInterval: number

		if (activeCycle) {
			countdownInterval = setInterval(() => {
				const timeElapsedInSeconds = Math.trunc(
					(Date.now() - new Date(activeCycle.startDate).getTime()) / 1000,
				)

				if (timeElapsedInSeconds >= minutesAmountInSeconds) {
					markCurrentCycleAsFinished()
				} else {
					setSecondsElapsed(timeElapsedInSeconds)
				}
			}, 1000)
		}

		return () => {
			clearInterval(countdownInterval)
		}
	}, [
		activeCycle,
		minutesAmountInSeconds,
		markCurrentCycleAsFinished,
		setSecondsElapsed,
	])

	useEffect(() => {
		document.title = activeCycle ? `${minutes}:${seconds}` : 'Ignite Timer'
	}, [activeCycle, minutes, seconds])

	return (
		<CountdownContainer>
			<span>{minutes.at(0)}</span>
			<span>{minutes.at(1)}</span>
			<Separator>:</Separator>
			<span>{seconds.at(0)}</span>
			<span>{seconds.at(1)}</span>
		</CountdownContainer>
	)
}
