import { InputGroup, FormControl } from 'react-bootstrap'

export const InputGroupComponent = ({
  onChangeHandler,
  stateObject,
  title,
  placeholder,
  dictKey,
}) => {
  return (
    <InputGroup size="sm" className="mb-3 my-1">
      <InputGroup.Text>{title}</InputGroup.Text>
      <FormControl
        value={stateObject[dictKey]}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </InputGroup>
  )
}
