import { useContext, useEffect, useState } from 'react'

import { CyclesContext } from '../..'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
	const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

	const { activeCycle, markCurrentCycleAsFinished } = useContext(CyclesContext)

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
					(Date.now() - activeCycle.startDate.getTime()) / 1000,
				)

				if (timeElapsedInSeconds >= minutesAmountInSeconds) {
					markCurrentCycleAsFinished()
				} else {
					setAmountSecondsElapsed(timeElapsedInSeconds)
				}
			}, 1000)
		}

		return () => {
			clearInterval(countdownInterval)
		}
	}, [activeCycle, minutesAmountInSeconds, markCurrentCycleAsFinished])

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
