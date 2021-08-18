import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/formContainer'
import Message from '../components/message'
import Loader from '../components/loader'
import { getUserInfo /*, updateUserInfo*/ } from '../actions/user'
import { selLang } from '../Utils/setlang'
import FormComponent from '../components/formComponent'
import hist from '../history'

const ProfileScreen = ({ history }) => {
  // Form items states
  const [language, setLanguage] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordMessage, setPasswordMessage] = useState(null)

  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)

  const [validPassword, setValidPassword] = useState(false)
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)

  const dispatch = useDispatch()

  // Get states
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserInfo(userInfo._id))
      } else {
        setUsername(user.username)
        setEmail(user.email)
        setLanguage(user.language)
      }
    }
  }, [dispatch, history, userInfo, user, hist])

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      username !== '' &&
      email !== '' &&
      currentPassword !== '' &&
      validPassword &&
      validConfirmPassword
    ) {
      // dispatch(
      //     updateUserInfo(
      //         username,
      //         email,
      //         currentPassword,
      //         password,
      //         language
      //     )
      // );
      console.log(username, email, currentPassword, password, language)
    }
  }

  const passwordOnChangeHandler = (e) => {
    setCurrentPassword(e.target.value)
  }
  const newPasswordOnChangeHandler = (e) => {
    let p = e.target.value
    setPassword(p)
    if (p.length < 8) {
      setPasswordErrorMessage(
        'Password length must be greater than 8 character',
      )
      setValidPassword(false)
    } else {
      setPasswordErrorMessage(null)
      setValidPassword(true)
    }
  }
  const newPasswordConfirmOnChangeHandler = (e) => {
    const cPassword = e.target.value
    setConfirmPassword(cPassword)
    if (password !== cPassword) {
      setPasswordMessage('Passwords does not match')
      setValidConfirmPassword(false)
    } else if (cPassword.length < 8) {
      setPasswordMessage('Password length must be greater than 8 character')
      setValidConfirmPassword(false)
    } else {
      setPasswordMessage(null)
      setValidConfirmPassword(true)
    }
  }

  return (
    <FormContainer>
      <h1>YOUR PROFILE</h1>
      {error && <Message variant="danger">{error}</Message>}
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
          label="Old Password"
          type="password"
          value={currentPassword}
          onChange={passwordOnChangeHandler}
        />
        <FormComponent
          label="New Password"
          type="password"
          value={password}
          errorMessage={passwordErrorMessage}
          valid={validPassword}
          onChange={newPasswordOnChangeHandler}
        />
        <FormComponent
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          errorMessage={passwordMessage}
          valid={validConfirmPassword}
          onChange={newPasswordConfirmOnChangeHandler}
        />
        <Form.Group controlId={'radio'} className="py-2">
          <Form.Label>Select preferred langauge: </Form.Label>
          <Row>
            {selLang.map((l) => {
              return (
                <Col md={4} key={`${l.lang}-radio`}>
                  <Form.Check
                    id={l.lang}
                    type="radio"
                    label={l.label}
                    value={l.lang}
                    checked={l.lang === language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </Col>
              )
            })}
          </Row>
        </Form.Group>
        <div className="py-3">
          <Button
            type="submit"
            variant="primary"
            disabled={
              username === '' ||
              email === '' ||
              !validPassword ||
              !validConfirmPassword
            }
          >
            Update Profile
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen
