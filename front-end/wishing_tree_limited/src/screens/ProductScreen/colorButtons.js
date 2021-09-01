import React from 'react'
import {
  ButtonGroup,
  Col,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { SearchAllColors } from '../../Utils/getAllColors'

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
            <Col key={i} xs={1} md={1} lg={1} className="mx-2 my-1">
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
