import styled from 'styled-components'

const _Loader = styled.div`
  width: 44.8px;
  height: 44.8px;
  animation: animationSpinner 2.4s infinite ease;
  transform-style: preserve-3d;

  & > div {
    background-color: rgba(71, 255, 83, 0.219);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 2.2px solid #01e119;
  }

  & div:nth-of-type(1) {
    transform: translateZ(-22.4px) rotateY(180deg);
  }

  & div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }

  & div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }

  & div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }

  & div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }

  & div:nth-of-type(6) {
    transform: translateZ(22.4px);
  }
  @keyframes animationSpinner {
    0% {
      transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }

    50% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }

    100% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
  }
`

export const Loader = () => {
  return (
    <_Loader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </_Loader>
  )
}
