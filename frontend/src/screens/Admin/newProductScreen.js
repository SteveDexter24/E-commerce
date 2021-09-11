import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
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
import { InputGroupComponent } from '../../Utils/Input Form/inputForm'
import {
  formItems,
  priceItems,
  colorItems,
} from '../../Utils/Input Form/formConstants'
import ShowImageForAdmin from '../../components/showImageForAdmin'

const NewProductScreen = ({ match, history }) => {
  const langInit = { en: '', cn: '', jpn: '' }
  const currencyInit = { hkd: '', jpn: '' }
  const colorInit = { colorHex: '', color: langInit, count: 0 }

  const [nameObj, setNameObj] = useState(langInit)
  const [categoryObj, setCategoryObj] = useState(langInit)
  const [gender, setGender] = useState('')
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
  const [newColorHex, setNewColorHex] = useState('#ffffff')
  const [newStock, setNewStock] = useState('')
  const [newSizeType, setNewSizeType] = useState('')

  const [sizes, setSizes] = useState([])

  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, product: productMessage } = productCreate

  // file input state
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
    console.log(productObj)
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
    if (!file) {
      return
    }
    console.log(file)
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

  const handleRemoveImage = (index) => {
    console.log(index)
    let newArr = [...previewSource]

    let finalArr = []
    for (let i = 0; i < newArr.length; i++) {
      if (index !== i) {
        finalArr.push(newArr[i])
      }
    }

    setPreviewSource(finalArr)
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
            {formItems('Product Name').map((item) => {
              return (
                <InputGroupComponent
                  key={item.title}
                  dictKey={item.key}
                  title={item.title}
                  placeholder={item.placeholder}
                  onChangeHandler={(e) =>
                    setNameObj({ ...nameObj, [item.key]: e.target.value })
                  }
                  stateObject={nameObj}
                />
              )
            })}

            <h5 className="mt-4">Category</h5>

            {formItems('Category').map((item) => {
              return (
                <InputGroupComponent
                  key={item.title}
                  dictKey={item.key}
                  title={item.title}
                  placeholder={item.placeholder}
                  onChangeHandler={(e) =>
                    setCategoryObj({
                      ...categoryObj,
                      [item.key]: e.target.value,
                    })
                  }
                  stateObject={categoryObj}
                />
              )
            })}

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
            <Form.Group className="mb-3">
              <Form.Control type="file" onChange={handleFileInputChange} />
            </Form.Group>

            <ShowImageForAdmin
              create
              source={previewSource}
              handleRemoveImage={(index) => handleRemoveImage(index)}
            />
            <>
              <h5 className="mt-4">Feature</h5>

              {formItems('Feature').map((item) => {
                return (
                  <InputGroupComponent
                    key={item.title}
                    dictKey={item.key}
                    title={item.title}
                    placeholder={item.placeholder}
                    onChangeHandler={(e) =>
                      setFeatureObj({
                        ...featureObj,
                        [item.key]: e.target.value,
                      })
                    }
                    stateObject={featureObj}
                  />
                )
              })}

              <h5 className="mt-4">Description</h5>
              {formItems('Description').map((item) => {
                return (
                  <InputGroupComponent
                    key={item.title}
                    dictKey={item.key}
                    title={item.title}
                    placeholder={item.placeholder}
                    onChangeHandler={(e) =>
                      setDescriptionObj({
                        ...descriptionObj,
                        [item.key]: e.target.value,
                      })
                    }
                    stateObject={descriptionObj}
                  />
                )
              })}

              <h5 className="mt-4">Style</h5>
              {formItems('Style').map((item) => {
                return (
                  <InputGroupComponent
                    key={item.title}
                    dictKey={item.key}
                    title={item.title}
                    placeholder={item.placeholder}
                    onChangeHandler={(e) =>
                      setStyleObj({
                        ...styleObj,
                        [item.key]: e.target.value,
                      })
                    }
                    stateObject={styleObj}
                  />
                )
              })}

              <h5 className="mt-4">Price</h5>
              {priceItems().map((item) => {
                return (
                  <InputGroup size="sm" className="mb-3 my-2" key={item.key}>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      {item.title}
                    </InputGroup.Text>
                    <FormControl
                      placeholder={item.placeholder}
                      value={priceObj[item.key]}
                      onChange={(e) =>
                        setPriceObj({ ...priceObj, [item.key]: e.target.value })
                      }
                    />
                  </InputGroup>
                )
              })}

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
                            {colorItems().map((item, _index) => {
                              return (
                                <FormControl
                                  key={_index}
                                  value={c.color[item.key]}
                                  onChange={(e) =>
                                    handleColorOnChange(e, i, ind, item.key)
                                  }
                                />
                              )
                            })}

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
              <h4 className="mt-5">Enter new size and colors</h4>
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
                            setColors(colors.filter((_, index) => i !== index))
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

                {colorItems().map((item, i) => {
                  return (
                    <FormControl
                      key={i}
                      placeholder={item.placeholder}
                      value={newColor[item.key]}
                      onChange={(e) =>
                        setNewColor({ ...newColor, [item.key]: e.target.value })
                      }
                    />
                  )
                })}

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
                  value={Number(newStock)}
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
              {priceItems('Discount').map((item) => {
                return (
                  <InputGroup size="sm" className="mb-3 my-2" key={item.key}>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      {item.title}
                    </InputGroup.Text>
                    <FormControl
                      placeholder={item.placeholder}
                      value={discount[item.key]}
                      onChange={(e) =>
                        setDiscount({ ...discount, [item.key]: e.target.value })
                      }
                    />
                  </InputGroup>
                )
              })}

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
