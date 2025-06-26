import { Action, Cycle } from './reducer'

export function addNewCycleAction(newCycle: Cycle): Action {
	return {
		type: 'ADD_NEW_CYCLE',
		payload: {
			newCycle,
		},
	}
}

export function markCurrentCycleAsFinishedAction(): Action {
	return {
		type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
	}
}

export function interruptCurrentCycleAction(): Action {
	return {
		type: 'INTERRUPT_CURRENT_CYCLE',
	}
}
