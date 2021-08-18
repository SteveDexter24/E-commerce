import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/formContainer'
import Message from '../components/message'
import Loader from '../components/loader'
import { register } from '../actions/user'
import { selLang } from '../Utils/setlang'
import FormComponent from '../components/formComponent'

const RegisterScreen = ({ location, history }) => {
  const [language, setLanguage] = useState('en')
  const [username, setUsername] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState(null)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)
  const [validPassword, setValidPassword] = useState(false)
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error } = userRegister
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      username !== '' &&
      email !== '' &&
      validPassword &&
      validConfirmPassword
    ) {
      dispatch(register(username, email, password, language))
    }
  }

  const passwordOnChangeHandler = (e) => {
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
  const passwordConfirmOnChangeHandler = (e) => {
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
      <h1>REGISTER</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} autoComplete="on">
        <FormComponent
          label="Username"
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormComponent
          label="Email address"
          type="email"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormComponent
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          errorMessage={passwordErrorMessage}
          valid={validPassword}
          onChange={passwordOnChangeHandler}
        />
        <FormComponent
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          placeholder="Enter your password again to confirm"
          errorMessage={passwordMessage}
          valid={validConfirmPassword}
          onChange={passwordConfirmOnChangeHandler}
        />
        <Form.Group controlId={'radio'} className="py-2">
          <Form.Label>Select preferred langauge: </Form.Label>
          {selLang.map((l) => {
            return (
              <Col md={4}>
                <Form.Check
                  id={l.lang}
                  key={`${l.lang}-radio`}
                  type="radio"
                  label={l.label}
                  value={l.lang}
                  checked={l.lang === language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </Col>
            )
          })}
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
            Register
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
