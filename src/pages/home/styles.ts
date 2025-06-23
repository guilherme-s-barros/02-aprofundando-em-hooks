import styled, { css } from 'styled-components'

interface HomeContainerProps {
	isCountdownRunning: boolean
}

export const HomeContainer = styled.main<HomeContainerProps>`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.theme.gray[900]};
    visibility: none;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  ${(props) =>
		props.isCountdownRunning &&
		css`
    &::after {
      visibility: visible;
      opacity: 0.8;
    }
  `}
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
`

export const FormInputs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.gray[100]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.gray[500]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.gray[100]};
  transition: border-color 0.2s;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.green[500]};
  }

  &:not(:focus):not(:disabled):hover {
    border-color: ${(props) => props.theme.gray[300]};
  }

  &::placeholder {
    color: ${(props) => props.theme.gray[500]};
  }
`

export const TextInput = styled(BaseInput)`
  flex: 1;

  &::webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.gray[100]};

  display: flex;
  gap: 1rem;
  z-index: 9999;

  span {
    background: ${(props) => props.theme.gray[700]};
    padding: 2rem 1rem;
    border-radius: 0.5rem;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme.green[500]};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 0.5rem;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 9999;

  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.gray[100]};
  transition: background 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme.green[500]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.green[700]};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme.red[500]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.red[700]};
  }
`
