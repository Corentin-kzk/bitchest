import styled from 'styled-components'
import PropTypes from 'prop-types'

const _Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const _ImageWrapper = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : '300px')};
  height: ${(props) => (props.height ? props.height : '300px')};
`

const Image = ({ src, width, height, props }) => {
  return (
    <_ImageWrapper width={width} height={height} {...props}>
      <_Image src={src} />
    </_ImageWrapper>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number | PropTypes.string,
  height: PropTypes.number | PropTypes.string,
}

export default Image
