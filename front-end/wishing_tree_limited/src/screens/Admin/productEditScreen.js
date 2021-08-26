import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/formContainer'
import Message from '../../components/message'
import Loader from '../../components/loader'
import FormComponent from '../../components/formComponent'
import { listProductDetails } from '../../actions/product'
import { Link } from 'react-router-dom'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [nameObj, setNameObj] = useState({})
  const [categoryObj, setCategoryObj] = useState({})
  const [gender, setGender] = useState('')
  const [images, setImages] = useState([])
  const [featureObj, setFeatureObj] = useState({})
  const [descriptionObj, setDescriptionObj] = useState({})
  const [styleObj, setStyleObj] = useState({})
  const [priceObj, setPriceObj] = useState({})
  const [material, setMaterial] = useState('')
  const [washing_care, setWashing_care] = useState('')
  const [discount, setDiscount] = useState('')

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (userInfo.role !== 'admin') {
        history.push('/')
      }
      if (!product) {
        dispatch(listProductDetails(productId))
      } else {
        if (product._id !== productId) {
          dispatch(listProductDetails(productId))
        }
        setNameObj(product.productName)
        setCategoryObj(product.category)
        setGender(product.gender)
        setImages(product.images)
        setFeatureObj(product.feature)
        setDescriptionObj(product.description)
        setStyleObj(product.style)
        setPriceObj(product.price)
        setMaterial(product.material ? product.material : '')
        setWashing_care(product.washing_care ? product.washing_care : '')
        setDiscount(product.discount ? product.discount : '')
      }
    }
  }, [dispatch, history, match, productId, product])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT PRODUCT</h1>
        {error && <Message variant="danger">{error}</Message>}
        {product ? (
          <Form onSubmit={submitHandler} autoComplete="on">
            <h5 className="my-4">Product Name</h5>
            <FormComponent
              label="Product Name (English)"
              type="text"
              value={nameObj.en}
              placeholder="Product Name in English"
              onChange={(e) => setNameObj({ ...nameObj, en: e.target.value })}
            />

            <FormComponent
              label="Product Name (Chinese)"
              type="text"
              value={nameObj.cn}
              placeholder="Product Name in Chinese"
              onChange={(e) => setNameObj({ ...nameObj, cn: e.target.value })}
            />
            <FormComponent
              label="Product Name (Japanese)"
              type="text"
              value={nameObj.jpn}
              placeholder="Product Name in Japanese"
              onChange={(e) => setNameObj({ ...nameObj, jpn: e.target.value })}
            />

            <h5 className="my-4">Category</h5>

            <FormComponent
              label="Category (English)"
              type="text"
              value={categoryObj.en}
              placeholder="Category in English"
              onChange={(e) =>
                setCategoryObj({ ...categoryObj, en: e.target.value })
              }
            />

            <FormComponent
              label="Category (Chinese)"
              type="text"
              value={categoryObj.cn}
              placeholder="Category in Chinese"
              onChange={(e) =>
                setCategoryObj({ ...categoryObj, cn: e.target.value })
              }
            />
            <FormComponent
              label="Category (Japanese)"
              type="text"
              value={categoryObj.jpn}
              placeholder="Category in Japanese"
              onChange={(e) =>
                setCategoryObj({ ...categoryObj, jpn: e.target.value })
              }
            />

            <h5 className="my-4">Gender</h5>

            <FormComponent
              label="Gender"
              type="text"
              value={gender}
              placeholder="Gender"
              onChange={(e) => setGender(e.target.value)}
            />

            <h5 className="my-4">Images</h5>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>

            <h5 className="my-4">Feature</h5>
            <FormComponent
              label="Feature (English)"
              type="text"
              value={featureObj.en}
              placeholder="Feature in English"
              onChange={(e) =>
                setFeatureObj({ ...featureObj, en: e.target.value })
              }
            />

            <FormComponent
              label="Feature (Chinese)"
              type="text"
              value={featureObj.cn}
              placeholder="Feature in Chinese"
              onChange={(e) =>
                setFeatureObj({ ...featureObj, cn: e.target.value })
              }
            />
            <FormComponent
              label="Feature (Japanese)"
              type="text"
              value={featureObj.jpn}
              placeholder="Feature in Japanese"
              onChange={(e) =>
                setFeatureObj({ ...featureObj, jpn: e.target.value })
              }
            />

            <h5 className="my-4">Description</h5>
            <FormComponent
              label="Description (English)"
              type="text"
              value={descriptionObj.en}
              placeholder="Description in English"
              onChange={(e) =>
                setDescriptionObj({ ...descriptionObj, en: e.target.value })
              }
            />

            <FormComponent
              label="Description (Chinese)"
              type="text"
              value={descriptionObj.cn}
              placeholder="Description in Chinese"
              onChange={(e) =>
                setDescriptionObj({ ...descriptionObj, cn: e.target.value })
              }
            />
            <FormComponent
              label="Description (Japanese)"
              type="text"
              value={descriptionObj.jpn}
              placeholder="Description in Japanese"
              onChange={(e) =>
                setDescriptionObj({ ...descriptionObj, jpn: e.target.value })
              }
            />

            <h5 className="my-4">Style</h5>
            <FormComponent
              label="Style (English)"
              type="text"
              value={styleObj.en}
              placeholder="Style in English"
              onChange={(e) => setStyleObj({ ...styleObj, en: e.target.value })}
            />

            <FormComponent
              label="Style (Chinese)"
              type="text"
              value={styleObj.cn}
              placeholder="Style in Chinese"
              onChange={(e) => setStyleObj({ ...styleObj, cn: e.target.value })}
            />
            <FormComponent
              label="Style (Japanese)"
              type="text"
              value={styleObj.jpn}
              placeholder="Style in Japanese"
              onChange={(e) =>
                setStyleObj({ ...styleObj, jpn: e.target.value })
              }
            />

            <h5 className="my-4">Price</h5>
            <FormComponent
              label="Price (HKD)"
              type="text"
              value={priceObj.hkd}
              placeholder="Price in Hong Kong Dollars"
              onChange={(e) =>
                setPriceObj({ ...priceObj, hkd: e.target.value })
              }
            />

            <FormComponent
              label="Price (Japanese Yen)"
              type="text"
              value={priceObj.jpn}
              placeholder="Price in Japanese Yen"
              onChange={(e) =>
                setPriceObj({ ...priceObj, jpn: e.target.value })
              }
            />

            <h5>{JSON.stringify(product.size[0])}</h5>

            <h5 className="my-4">Other Information</h5>
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
            <FormComponent
              label="Discount"
              type="text"
              value={discount}
              placeholder="Enter discounted price"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className="py-4">
              <Button type="submit" variant="primary">
                EDIT PRODUCT
              </Button>
            </div>
          </Form>
        ) : loading ? (
          <></>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <></>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
