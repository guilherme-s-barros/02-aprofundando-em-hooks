import { CountdownContainer } from './styles'

export function Countdown() {
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
