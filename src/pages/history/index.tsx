import { useCyclesContext } from '../../contexts/cycles-context'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
	const { cycles } = useCyclesContext()

	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>

			<pre>{JSON.stringify(cycles, null, 2)}</pre>

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
						<tr>
							<td>Revisar código do projeto</td>
							<td>24 minutos</td>
							<td>Há cerca de 1 semana</td>
							<td>
								<Status color="green">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Implementar autenticação</td>
							<td>30 minutos</td>
							<td>Há cerca de 2 dias</td>
							<td>
								<Status color="yellow">Em andamento</Status>
							</td>
						</tr>
						<tr>
							<td>Atualizar documentação</td>
							<td>15 minutos</td>
							<td>Há cerca de 3 horas</td>
							<td>
								<Status color="red">Interrompido</Status>
							</td>
						</tr>
						<tr>
							<td>Corrigir bugs no formulário</td>
							<td>45 minutos</td>
							<td>Há cerca de 5 dias</td>
							<td>
								<Status color="green">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Refatorar componentes</td>
							<td>10 minutos</td>
							<td>Há cerca de 10 minutos</td>
							<td>
								<Status color="yellow">Em andamento</Status>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
