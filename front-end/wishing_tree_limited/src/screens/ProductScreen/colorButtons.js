import React from 'react'
import {
  ButtonGroup,
  Col,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

// TODO
// traverse the product object to search all the avaliable colors
const SearchAllColors = (product) => {
  let colorHexArr = []
  let colorObjArr = []
  for (let i = 0; i < product.size.length; i++) {
    for (let j = 0; j < product.size[i].colors.length; j++) {
      if (!colorHexArr.includes(product.size[i].colors[j].colorHex)) {
        colorHexArr.push(product.size[i].colors[j].colorHex)
        colorObjArr.push(product.size[i].colors[j].color)
      }
    }
  }

  return { colorHexArr, colorObjArr }
}

const ColorButtons = ({
  product,
  language,
  colors,
  buttonClick,
  selectedIndex,
}) => {
  const onTrigger = (s, i) => {
    buttonClick({ color: s, index: i })
  }

  const { colorHexArr, colorObjArr } = SearchAllColors(product)

  return (
    <ButtonGroup>
      <Row>
        {colorObjArr.map((s, i) => {
          return (
            <Col key={i} md={1} className="mx-2 my-1">
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip">{s[language]}</Tooltip>}
              >
                <Button
                  variant={s[language] === colors ? 'primary' : 'secondary'}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: `${colorHexArr[i]}`,
                    padding: '6px 0px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.42857',
                  }}
                  onClick={() => onTrigger(s[language], i)}
                ></Button>
              </OverlayTrigger>
            </Col>
          )
        })}
      </Row>
    </ButtonGroup>
  )
}

export default ColorButtons
