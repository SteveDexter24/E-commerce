import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/formContainer'
import Message from '../components/message'
import Loader from '../components/loader'
import { register } from '../actions/user'

const FormComponent = ({ label, type, onChange, value, placeholder }) => {
  return (
    <Form.Group controlId={placeholder} className="py-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        autoComplete="on"
        onChange={onChange}
        value={value}
      ></Form.Control>
    </Form.Group>
  )
}

const selLang = [
  {
    label: 'English',
    lang: 'en',
  },
  {
    label: 'Japanese',
    lang: 'jpn',
  },
  {
    label: 'Chinese (Traditional)',
    lang: 'cn',
  },
]

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('en')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(language)
  }

  return (
    <FormContainer>
      <h1>REGISTER</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} autoComplete="on">
        <FormComponent
          label=" Given Name"
          type="text"
          value={name}
          placeholder={'Enter your given name'}
          onChange={(e) => setName(e.target.value)}
        />

        <FormComponent
          label="Surname"
          type="text"
          value={surname}
          placeholder="Enter your surname"
          onChange={(e) => setSurname(e.target.value)}
        />
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
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormComponent
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormComponent
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          placeholder="Enter your password again to confirm"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Form.Group controlId={'radio'} className="py-2">
          <Form.Label>Select preferred langauge: </Form.Label>
          {selLang.map((l) => {
            return (
              <Form.Check
                id={l.lang}
                key={`${l.lang}-radio`}
                type="radio"
                label={l.label}
                value={l.lang}
                checked={l.lang === language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            )
          })}
        </Form.Group>
        <div className="py-3">
          <Button type="submit" variant="primary">
            Register
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/login'}>
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
