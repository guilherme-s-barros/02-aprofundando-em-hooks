import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Cycle, useCyclesContext } from '../../contexts/cycles-context'

import { HistoryContainer, HistoryList, Status } from './styles'

interface CycleStatusProps {
	cycle: Cycle
}

function CycleStatus({ cycle }: CycleStatusProps) {
	if (cycle.finishedDate) {
		return <Status color="green">Concluído</Status>
	}

	if (cycle.interruptedDate) {
		return <Status color="red">Interrompido</Status>
	}

	return <Status color="yellow">Em andamento</Status>
}

export function History() {
	const { cycles } = useCyclesContext()

	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => {
							return (
								<tr key={cycle.id}>
									<td>{cycle.task}</td>
									<td>{cycle.minutesAmount} minutos</td>
									<td>
										{formatDistanceToNow(cycle.startDate, {
											addSuffix: true,
											locale: ptBR,
										})}
									</td>
									<td>
										<CycleStatus cycle={cycle} />
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
