import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0
    } to {
        opacity: 1
    }
`;

const fadeOut = keyframes`
 from {
        opacity: 1
    } to {
        opacity: 0
    }`;

export default styled.div`
  width: 80vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  img {
    opacity: ${({ direction }) => {
      return direction === 'in' ? 0 : 1;
    }};
    animation: ${({ direction }) =>
        direction === 'in' ? fadeIn : direction === 'out' ? fadeOut : null}
      0.5s linear
      ${({ direction }) =>
        direction === 'in' ? '0.5s' : direction === 'out' ? '0s' : null}
      1;
  }

  div:last-of-type {
    position: absolute;
    bottom: 0px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;

    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%
    );

    p {
      margin: 10px 0;

      &:first-child {
        font-size: 18px;
      }

      &:nth-child(n + 2) {
        font-size: 12px;
      }
    }
  }
`;
