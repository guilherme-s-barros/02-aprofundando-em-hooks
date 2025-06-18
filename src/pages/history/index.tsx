import { HistoryContainer, HistoryList } from './styles'

export function History() {
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
						<tr>
							<td>Revisar código do projeto</td>
							<td>24 minutos</td>
							<td>Há cerca de 1 semana</td>
							<td>Concluído</td>
						</tr>
						<tr>
							<td>Implementar autenticação</td>
							<td>30 minutos</td>
							<td>Há cerca de 2 dias</td>
							<td>Em andamento</td>
						</tr>
						<tr>
							<td>Atualizar documentação</td>
							<td>15 minutos</td>
							<td>Há cerca de 3 horas</td>
							<td>Interrompido</td>
						</tr>
						<tr>
							<td>Corrigir bugs no formulário</td>
							<td>45 minutos</td>
							<td>Há cerca de 5 dias</td>
							<td>Concluído</td>
						</tr>
						<tr>
							<td>Refatorar componentes</td>
							<td>10 minutos</td>
							<td>Há cerca de 10 minutos</td>
							<td>Em andamento</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
