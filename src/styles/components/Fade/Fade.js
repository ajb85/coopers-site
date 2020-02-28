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
  overflow: hidden;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: width 0.5s;

  position: relative;

  img {
    transition: width 0.5s, height 0.5s;

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
    padding: 10px 20px;
    width: 100%;
    z-index: 1;
    height: 100px;

    opacity: ${({ direction }) => {
      return direction === 'in' ? 0 : 1;
    }};

    animation: ${({ direction }) =>
        direction === 'in' ? emerge : direction === 'out' ? hide : null}
      0.5s linear
      ${({ direction }) =>
        direction === 'in' ? '0.5s' : direction === 'out' ? '0s' : null}
      1;

    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.5) 75%,
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
        transition: margin 0.5s;
        font-size: 18px;
      }

      &:nth-child(n + 2) {
        font-size: 12px;
      }
    }
  }
`;
