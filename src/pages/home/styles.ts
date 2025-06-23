import styled, { css } from 'styled-components'

interface HomeContainerProps {
	$isCountdownRunning: boolean
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
		props.$isCountdownRunning &&
		css`
    &::after {
      visibility: visible;
      opacity: 0.8;
    }
  `}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
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
