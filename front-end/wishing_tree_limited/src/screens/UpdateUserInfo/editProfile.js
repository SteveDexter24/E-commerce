import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/formContainer'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { getUserInfo, updateUserProfile } from '../../actions/user'
import FormComponent from '../../components/formComponent'
import EditProfileNavbar from '../../components/editProfileNavbar'

const ProfileScreen = ({ history }) => {
  // States: Form items
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [contactNum, setContactNum] = useState('')

  const dispatch = useDispatch()

  // Get states form redux store
  // User Details
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  // User Authentication
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  // Update User
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserInfo(userInfo._id))
      } else {
        setUsername(user.username ? user.username : '')
        setEmail(user.email ? user.email : '')
        setAddress1(user.address1 ? user.address1 : '')
        setAddress2(user.address2 ? user.address2 : '')
        setCountry(user.country ? user.country : '')
        setCity(user.city ? user.city : '')
        setContactNum(user.contactNum ? user.contactNum : '')
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (username !== '' && email !== '') {
      dispatch(
        updateUserProfile(
          username,
          email,
          contactNum,
          city,
          address1,
          address2,
          country,
        ),
      )
    }
  }

  return (
    <>
      <EditProfileNavbar />
      <FormContainer>
        <h1>UPDATE USER INFO</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{'Profile Updated'}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} autoComplete="on">
          <FormComponent
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormComponent
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormComponent
            label="Address Line 1 (optional)"
            type="text"
            placeholder={'Enter floor, Block and Room'}
            value={address1}
            required={false}
            onChange={(e) => setAddress1(e.target.value)}
          />
          <FormComponent
            label="Address Line 2 (optional)"
            type="text"
            placeholder={'Enter Steet and District'}
            value={address2}
            required={false}
            onChange={(e) => setAddress2(e.target.value)}
          />
          <Form.Group className="py-2">
            <Form.Label>Country or Region (optional)</Form.Label>
            <Form.Select
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            >
              <option value="">Select a Country or Region</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Japan">Japan</option>
            </Form.Select>
          </Form.Group>

          <FormComponent
            label="City (optional)"
            type="text"
            placeholder={'Enter City'}
            value={city}
            required={false}
            onChange={(e) => setCity(e.target.value)}
          />

          <Form.Group className="py-2">
            <Form.Label>{'Contact Number'}</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                {country === 'Hong Kong' ? '+852' : '+81'}
              </InputGroup.Text>
              <FormControl
                value={contactNum}
                onChange={(e) => setContactNum(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="py-3">
            <Button
              type="submit"
              variant="primary"
              disabled={username === '' || email === ''}
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProfileScreen
