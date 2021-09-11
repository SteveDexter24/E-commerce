import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalPopup = ({ btnTitle, modalImage }) => {
  const [show, setShow] = useState(false)
  const [hover, setHover] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleMouseOut = () => setHover(false)
  const handleMouseOver = () => setHover(true)

  return (
    <>
      <span
        onClick={handleShow}
        style={{ fontWeight: 'bold', fontSize: `${hover ? '105%' : '100%'}` }}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
      >
        {btnTitle}
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{btnTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalPopup
