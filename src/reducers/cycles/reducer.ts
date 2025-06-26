import { produce } from 'immer'

export interface Cycle {
	id: string
	task: string
	minutesAmount: number
	startDate: Date
	interruptedDate?: Date
	finishedDate?: Date
}

export interface CyclesState {
	cycles: Cycle[]
	activeCycleId: string | null
}

// { ActionType: Payload (if exists) }
type ActionMap = {
	ADD_NEW_CYCLE: { newCycle: Cycle }
	INTERRUPT_CURRENT_CYCLE: null
	MARK_CURRENT_CYCLE_AS_FINISHED: null
}

/**
 * Dynamic union type based on 'ActionMap'. If payload exists, its value will be
 * equal to the corresponding 'Type' value of 'ActionMap'.
 */
export type Action = {
	[Type in keyof ActionMap]: ActionMap[Type] extends null
		? { type: Type }
		: { type: Type; payload: ActionMap[Type] }
}[keyof ActionMap]

export const initialCyclesState: CyclesState = {
	cycles: [],
	activeCycleId: null,
}

export function cyclesReducer(state: CyclesState, action: Action): CyclesState {
	switch (action.type) {
		case 'ADD_NEW_CYCLE': {
			return produce(state, (draft) => {
				draft.cycles.push(action.payload.newCycle)
				draft.activeCycleId = action.payload.newCycle.id
			})
		}

		case 'INTERRUPT_CURRENT_CYCLE': {
			return produce(state, (draft) => {
				const cycle = draft.cycles.find(
					(cycle) => cycle.id === state.activeCycleId,
				)

				if (!cycle) {
					return state
				}

				cycle.interruptedDate = new Date()
				draft.activeCycleId = null
			})
		}

		case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
			return produce(state, (draft) => {
				const cycle = draft.cycles.find(
					(cycle) => cycle.id === state.activeCycleId,
				)

				if (!cycle) {
					return state
				}

				cycle.finishedDate = new Date()
				draft.activeCycleId = null
			})
		}

		default: {
			return state
		}
	}
}
