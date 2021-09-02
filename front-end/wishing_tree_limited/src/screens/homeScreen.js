import React from 'react'
import { Row, Col } from 'react-bootstrap'

import {
  CardComponent,
  cardArr,
  socialHandles,
  ProductsCardComponent,
} from '../Utils/homeUIItems'

const HomeScreen = ({ history }) => {
  return (
    <>
      <CardComponent
        history={history}
        title={'Wishing Tree Limited'}
        text={'Check out our lastest product'}
        link={'/new-arrivals'}
        buttonName={'New Arrivals'}
      />
      <Row className="d-flex justify-content-center">
        <Row className="g-4">
          {cardArr.map((item, idx) => (
            <Col key={idx} md>
              <ProductsCardComponent item={item} height={550} />
            </Col>
          ))}
        </Row>
        <Row className="g-4">
          {socialHandles.map((item, idx) => (
            <Col key={idx} md={3} xs={6} className="p-4">
              <ProductsCardComponent item={item} height={120} social={true} />
            </Col>
          ))}
        </Row>
      </Row>
    </>
  )
}

export default HomeScreen
