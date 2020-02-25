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

const hide = keyframes`
  from {
    opacity: 1;
    bottom:0px;
  } to {
    opacity: 0;
    bottom: -75px;
  }
`;

const emerge = keyframes`
  from {
    opacity: 0;
    bottom: -75px;
  } to {
    opacity: 1;
    bottom: 0px;
  }
`;

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
    padding: 30px 20px;
    width: 100%;
    z-index: 1;

    opacity: ${({ direction }) => {
      return direction === 'in' ? 0 : 1;
    }};

    animation: ${({ direction }) =>
        direction === 'in' ? emerge : direction === 'out' ? hide : null}
      0.5s linear
      ${({ direction }) =>
        direction === 'in' ? '0.5s' : direction === 'out' ? '0s' : null}
      1;

    background: rgb(255, 255, 255, 1);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%
    );

    &::before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;

      transition: opacity 0.5s linear;
      opacity: 0;

      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }

    &:hover::before {
      opacity: 1;
    }

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
