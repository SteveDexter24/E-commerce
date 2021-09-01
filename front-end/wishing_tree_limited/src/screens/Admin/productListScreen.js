import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { Table, Button, Row, Col, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { deleteProduct, fetchAllProducts } from '../../actions/product'
import { PaginateProductsAdmin } from '../../components/paginate'
import SearchBox from '../../components/searchBox'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  // User Auth
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  // User Settings
  const settings = useSelector((state) => state.settings)
  const { language, currency } = settings

  // Product List
  const productList = useSelector((state) => state.productList)
  const { loading, products, error, page, pages } = productList

  // Product Delete
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (userInfo.role !== 'admin') {
        history.push('/')
      }
      dispatch(fetchAllProducts(keyword, pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber, keyword])

  const deleteHandler = (e, id) => {
    e.preventDefault()
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () => {
    history.push('/admin/create-product')
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <div className="d-flex justify-content-end">
            <Button
              className="my-3 align-items-right"
              onClick={createProductHandler}
            >
              <i className="fas fa-plus" />
              {` Create Product`}
            </Button>
          </div>
        </Col>
      </Row>
      <Route
        render={({ history }) => (
          <SearchBox
            history={history}
            product
            placeholder="Search Product by name, style or category"
          />
        )}
      />
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products ? (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Style</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.productName[language]}</td>
                    <td>
                      {currency === 'hkd' ? '$ ' : '¥ '}
                      {product.price[currency]}
                    </td>
                    <td>{product.category[language]}</td>
                    <td>{product.gender}</td>
                    <td>{product.style[language]}</td>
                    <td>
                      <ButtonGroup className="d-flex justify-content-center">
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button type="button" className="m-1 btn-sm">
                            <i className="fas fa-edit" />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="m-1 btn-sm"
                          onClick={(e) => deleteHandler(e, product._id)}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <PaginateProductsAdmin pages={pages} page={page} keyword={keyword} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductListScreen
