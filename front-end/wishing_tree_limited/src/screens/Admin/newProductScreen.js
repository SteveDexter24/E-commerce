import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
  Image,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/formContainer'
import Message from '../../components/message'
import Loader from '../../components/loader'
import FormComponent from '../../components/formComponent'
import { Link } from 'react-router-dom'
import { productObject } from '../../Utils/createProduct'
import { createProduct } from '../../actions/product'
import { CREATE_PRODUCT_RESET } from '../../actions/types'

const NewProductScreen = ({ match, history }) => {
  const langInit = { en: '', cn: '', jpn: '' }
  const currencyInit = { hkd: '', jpn: '' }
  const colorInit = { colorHex: '', color: langInit, count: 0 }

  const [nameObj, setNameObj] = useState(langInit)
  const [categoryObj, setCategoryObj] = useState(langInit)
  const [gender, setGender] = useState('')
  const [images, setImages] = useState([])
  const [featureObj, setFeatureObj] = useState(langInit)
  const [descriptionObj, setDescriptionObj] = useState(langInit)
  const [styleObj, setStyleObj] = useState(langInit)
  const [priceObj, setPriceObj] = useState(currencyInit)
  const [material, setMaterial] = useState('')
  const [washing_care, setWashing_care] = useState('')
  const [discount, setDiscount] = useState(currencyInit)
  //
  const [colors, setColors] = useState([])
  const [colorsHex, setColorsHex] = useState([])
  const [stock, setStock] = useState([])
  //
  const [newColor, setNewColor] = useState(langInit)
  const [newColorHex, setNewColorHex] = useState('')
  const [newStock, setNewStock] = useState('')
  const [newSizeType, setNewSizeType] = useState('')

  const [sizes, setSizes] = useState([])

  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, product: productMessage } = productCreate

  // file input state
  const [fileInputState, setFileInputState] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [previewSource, setPreviewSource] = useState([])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (userInfo.role !== 'admin') {
      history.push('/')
    }
    if (productMessage) {
      setTimeout(() => {
        dispatch({ type: CREATE_PRODUCT_RESET })
      }, 1500)
    }
  }, [dispatch, history, match, userInfo, productMessage])

  const uploadImage = (base64EncodedImage) => {
    return base64EncodedImage
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
    //const imageArr = []
    const base64Image = uploadImage(previewSource)
    const productObj = productObject(
      nameObj,
      categoryObj,
      gender,
      base64Image,
      featureObj,
      descriptionObj,
      styleObj,
      priceObj,
      material,
      washing_care,
      discount,
      sizes,
    )
    //TODO: uncomment the line below
    console.log(productObj.image)
    dispatch(createProduct(productObj))
  }

  const handleNewSizeAndColor = (e) => {
    e.preventDefault()
    // console.log(colors, stock, colorsHex, images)
    var colorArray = []
    // size obj
    for (var i = 0; i < colors.length; i++) {
      colorArray.push({
        colorHex: colorsHex[i],
        color: colors[i],
        count: stock[i],
      })
    }
    var sizeObject = { sizeType: newSizeType, colors: colorArray }

    setNewSizeType('')
    setColors([])
    setColorsHex([])
    setStock([])
    setSizes(sizes.concat(sizeObject))
  }

  const addSizeRow = (e, i) => {
    e.preventDefault()
    let newArr = [...sizes]
    newArr[i].colors.push(colorInit)
    setSizes(newArr)
  }
  const handleColorOnChange = (e, i, ind, lan) => {
    const value = e.target.value
    const sizeIndex = i
    const colorIndex = ind
    console.log('handle color on change')

    let newArr = [...sizes]
    newArr[sizeIndex].colors[colorIndex].color[lan] = value

    setSizes(newArr)
  }
  const handleColorHexOnChange = (e, i, ind) => {
    const value = e.target.value
    const sizeIndex = i
    const colorIndex = ind
    let newArr = [...sizes]
    newArr[sizeIndex].colors[colorIndex].colorHex = value
    setSizes(newArr)
  }

  const handleCountOnChange = (e, i, ind) => {
    const value = e.target.value
    const sizeIndex = i
    const colorIndex = ind
    let newArr = [...sizes]
    newArr[sizeIndex].colors[colorIndex].count = Number(value)
    setSizes(newArr)
  }

  const handleRemoveColorAndSize = (e, i, ind) => {
    e.preventDefault()
    const sizeIndex = i
    const colorIndex = ind
    let newArr = [...sizes]
    var filteredArr = newArr[sizeIndex].colors.filter((_, index) => {
      return index !== colorIndex
    })
    newArr[sizeIndex].colors = filteredArr
    setSizes(newArr)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    const newImages = [...images]
    newImages.push(file)
    setImages(newImages)
    setSelectedFile(file)
    previewFile(file)
  }
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      let newPreviewSource = [...previewSource]
      newPreviewSource.push(reader.result)
      setPreviewSource(newPreviewSource)
    }
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      {productMessage && <Message variant="success">{productMessage}</Message>}
      <FormContainer>
        <h1>CREATE PRODUCT</h1>
        {error && <Message variant="danger">{error}</Message>}

        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler} autoComplete="on">
            <h5 className="mt-4">Product Name</h5>
            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text id="inputGroup-sizing-sm">
                English
              </InputGroup.Text>
              <FormControl
                value={nameObj.en}
                placeholder="Product Name in English"
                onChange={(e) => setNameObj({ ...nameObj, en: e.target.value })}
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Chinese
              </InputGroup.Text>
              <FormControl
                value={nameObj.cn}
                placeholder="Product Name in Chinese"
                onChange={(e) => setNameObj({ ...nameObj, cn: e.target.value })}
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Japanese
              </InputGroup.Text>
              <FormControl
                value={nameObj.jpn}
                placeholder="Product Name in Japanese"
                onChange={(e) =>
                  setNameObj({ ...nameObj, jpn: e.target.value })
                }
              />
            </InputGroup>

            <h5 className="mt-4">Category</h5>
            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text>English</InputGroup.Text>
              <FormControl
                value={categoryObj.en}
                placeholder="Category in English"
                onChange={(e) =>
                  setCategoryObj({ ...categoryObj, en: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Chinese
              </InputGroup.Text>
              <FormControl
                value={categoryObj.cn}
                placeholder="Category in Chinese"
                onChange={(e) =>
                  setCategoryObj({ ...categoryObj, cn: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Japanese
              </InputGroup.Text>
              <FormControl
                value={categoryObj.jpn}
                placeholder="Category in Japanese"
                onChange={(e) =>
                  setCategoryObj({ ...categoryObj, en: e.target.value })
                }
              />
            </InputGroup>

            <h5 className="mt-4">Gender</h5>

            <InputGroup size="sm" className="mb-3 my-1">
              <InputGroup.Text>Gender</InputGroup.Text>
              <FormControl
                value={gender}
                placeholder="Gender"
                onChange={(e) => setGender(e.target.value)}
              />
            </InputGroup>

            {/* Images need to add map funciton */}
            <h5 className="mt-4">Image</h5>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Control
                type="file"
                onChange={handleFileInputChange}
                value={fileInputState}
                multiple
              />
            </Form.Group>
            <Row>
              {previewSource.length > 0 &&
                previewSource.map((source) => {
                  return (
                    <Col key={source.toString()} xs={4} md={6} className="p-2">
                      <Image
                        className="img-lg"
                        src={source}
                        alt=""
                        fluid
                      ></Image>
                    </Col>
                  )
                })}
            </Row>

            <>
              <h5 className="mt-4">Feature</h5>
              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>English</InputGroup.Text>
                <FormControl
                  value={featureObj.en}
                  placeholder="Feature in English"
                  onChange={(e) =>
                    setFeatureObj({ ...featureObj, en: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>Chinese</InputGroup.Text>
                <FormControl
                  value={featureObj.cn}
                  placeholder="Feature in Chinese"
                  onChange={(e) =>
                    setFeatureObj({ ...featureObj, cn: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>Japanese</InputGroup.Text>
                <FormControl
                  value={featureObj.jpn}
                  placeholder="Feature in Japanese"
                  onChange={(e) =>
                    setFeatureObj({ ...featureObj, jpn: e.target.value })
                  }
                />
              </InputGroup>

              <h5 className="mt-4">Description</h5>
              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>English</InputGroup.Text>
                <FormControl
                  value={descriptionObj.en}
                  placeholder="Description in English"
                  onChange={(e) =>
                    setDescriptionObj({ ...descriptionObj, en: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>Chinese</InputGroup.Text>
                <FormControl
                  value={descriptionObj.cn}
                  placeholder="Description in Chinese"
                  onChange={(e) =>
                    setDescriptionObj({ ...descriptionObj, cn: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>Japanese</InputGroup.Text>
                <FormControl
                  value={descriptionObj.jpn}
                  placeholder="Description in Japanese"
                  onChange={(e) =>
                    setDescriptionObj({
                      ...descriptionObj,
                      jpn: e.target.value,
                    })
                  }
                />
              </InputGroup>

              <h5 className="mt-4">Style</h5>
              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>English</InputGroup.Text>
                <FormControl
                  value={styleObj.en}
                  placeholder="Style in English"
                  onChange={(e) =>
                    setStyleObj({ ...styleObj, en: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>Chinese</InputGroup.Text>
                <FormControl
                  value={styleObj.cn}
                  placeholder="Style in Chinese"
                  onChange={(e) =>
                    setStyleObj({ ...styleObj, cn: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup size="sm" className="mb-3 my-1">
                <InputGroup.Text>Japanese</InputGroup.Text>
                <FormControl
                  value={styleObj.jpn}
                  placeholder="Style in Japanese"
                  onChange={(e) =>
                    setStyleObj({ ...styleObj, jpn: e.target.value })
                  }
                />
              </InputGroup>

              <h5 className="mt-4">Price</h5>
              <InputGroup size="sm" className="mb-3 my-2">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Hong Kong Dollars $
                </InputGroup.Text>
                <FormControl
                  placeholder="Price in Hong Kong Dollars"
                  value={priceObj.hkd}
                  onChange={(e) =>
                    setPriceObj({ ...priceObj, hkd: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3 my-2">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Japanese Yen ¥
                </InputGroup.Text>
                <FormControl
                  placeholder="Price in Japanese Yen"
                  value={priceObj.jpn}
                  onChange={(e) =>
                    setPriceObj({ ...priceObj, jpn: e.target.value })
                  }
                />
              </InputGroup>

              {sizes.length ? <h4 className="my-4">Sizes</h4> : null}
              {sizes.map((s, i) => {
                return (
                  <div key={i} className="my-3">
                    <Row>
                      <Col md={6} className="mt-3">
                        <h6>Colors and sizes for {s.sizeType}</h6>
                      </Col>
                      <Col md={6} className="mt-2">
                        <div className="d-flex justify-content-end">
                          <Button
                            className="align-items-right btn-sm mx-1"
                            onClick={(e) => addSizeRow(e, i)}
                          >
                            <i className="fas fa-plus" />
                          </Button>
                          <Button
                            className="align-items-right btn-sm"
                            variant="danger"
                            onClick={() =>
                              setSizes(sizes.filter((_, index) => index !== i))
                            }
                          >
                            <i className="fas fa-times" />
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    {s.colors.map((c, ind) => {
                      return (
                        <>
                          <InputGroup size="sm" className="mb-1 my-2" key={ind}>
                            <InputGroup.Text id="inputGroup-sizing-sm">
                              Color
                            </InputGroup.Text>
                            <FormControl
                              value={c.color.en}
                              onChange={(e) =>
                                handleColorOnChange(e, i, ind, 'en')
                              }
                            />
                            <FormControl
                              value={c.color.cn}
                              onChange={(e) =>
                                handleColorOnChange(e, i, ind, 'cn')
                              }
                            />
                            <FormControl
                              value={c.color.jpn}
                              onChange={(e) =>
                                handleColorOnChange(e, i, ind, 'jpn')
                              }
                            />
                            <FormControl
                              value={c.colorHex}
                              onChange={(e) =>
                                handleColorHexOnChange(e, i, ind)
                              }
                            />
                            <FormControl
                              className="py-2"
                              type="color"
                              value={c.colorHex}
                              onChange={(e) =>
                                handleColorHexOnChange(e, i, ind)
                              }
                            />
                            <FormControl
                              className="py-2"
                              value={Number(c.count)}
                              onChange={(e) => handleCountOnChange(e, i, ind)}
                            />
                            <Button
                              variant="danger"
                              onClick={(e) =>
                                handleRemoveColorAndSize(e, i, ind)
                              }
                            >
                              <i className="fas fa-times" />
                            </Button>
                          </InputGroup>
                        </>
                      )
                    })}
                  </div>
                )
              })}
            </>
            <div>
              <h4 className="mt-5">Enter new Size and colors</h4>
              <InputGroup size="sm" className="mb-3 my-2">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Size Type
                </InputGroup.Text>
                <FormControl
                  placeholder="Enter size (e.g) XS, S, M, L, XL, XXL"
                  value={newSizeType}
                  onChange={(e) => setNewSizeType(e.target.value)}
                />
              </InputGroup>

              {colors &&
                colors.map((c, i) => {
                  return (
                    <InputGroup size="sm" className="mb-3 my-2" key={i}>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Color
                      </InputGroup.Text>
                      <FormControl value={c.en} readOnly />
                      <FormControl value={c.cn} readOnly />
                      <FormControl value={c.jpn} readOnly />
                      <FormControl value={colorsHex[i]} readOnly />
                      <FormControl
                        className="py-2"
                        type="color"
                        value={colorsHex[i]}
                        readOnly
                      />
                      <FormControl className="py-2" value={stock[i]} readOnly />
                      <InputGroup.Text>
                        <Button
                          className="btn-sm"
                          variant="danger"
                          onClick={() => {
                            setColors(colors.filter((_, index) => i != index))
                            setColorsHex(
                              colorsHex.filter((_, index) => i !== index),
                            )
                            setStock(stock.filter((_, index) => i !== index))
                          }}
                        >
                          Remove
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>
                  )
                })}

              <InputGroup size="sm" className="mb-3 my-2">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Color
                </InputGroup.Text>
                <FormControl
                  placeholder="english"
                  value={newColor.en}
                  onChange={(e) =>
                    setNewColor({ ...newColor, en: e.target.value })
                  }
                />
                <FormControl
                  placeholder="chinese"
                  value={newColor.cn}
                  onChange={(e) =>
                    setNewColor({ ...newColor, cn: e.target.value })
                  }
                />
                <FormControl
                  placeholder="japanese"
                  value={newColor.jpn}
                  onChange={(e) =>
                    setNewColor({ ...newColor, jpn: e.target.value })
                  }
                />
                <FormControl
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                />
                <FormControl
                  className="py-2"
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                />
                <FormControl
                  className="py-2"
                  placeholder="stock"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                />

                <InputGroup.Text>
                  <Button
                    className="btn-sm"
                    onClick={() => {
                      setColors(colors.concat(newColor))
                      setColorsHex(colorsHex.concat(newColorHex))
                      setStock(stock.concat(newStock))
                      setNewColor(langInit)
                      setNewColorHex('')
                      setNewStock('')
                    }}
                  >
                    <i className="fas fa-plus" />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
              <InputGroup size="sm" className="">
                <Button className="btn-sm" onClick={handleNewSizeAndColor}>
                  Create Size and Colors
                </Button>
              </InputGroup>
            </div>

            <>
              <h4 className="mt-5">Other Information</h4>
              <FormComponent
                label="Materials"
                type="text"
                value={material}
                placeholder="Enter the material(s) of the product"
                onChange={(e) => setMaterial(e.target.value)}
              />

              <FormComponent
                label="Washing Care Instruction"
                type="text"
                value={washing_care}
                placeholder="Enter washing care instruction"
                onChange={(e) => setWashing_care(e.target.value)}
              />

              <h6 className="my-3">Discount</h6>
              <InputGroup size="sm" className="mb-3 my-2">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Hong Kong Dollars $
                </InputGroup.Text>
                <FormControl
                  placeholder="Discounted price in Hong Kong Dollars"
                  value={discount.hkd}
                  onChange={(e) =>
                    setDiscount({ ...discount, hkd: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3 my-2">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Japanese Yen ¥
                </InputGroup.Text>
                <FormControl
                  placeholder="Discounted price in Japanese Yen"
                  value={discount.jpn}
                  onChange={(e) =>
                    setDiscount({ ...discount, jpn: e.target.value })
                  }
                />
              </InputGroup>

              <div className="py-4">
                <Button type="submit" variant="primary">
                  CREATE PRODUCT
                </Button>
              </div>
            </>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default NewProductScreen
