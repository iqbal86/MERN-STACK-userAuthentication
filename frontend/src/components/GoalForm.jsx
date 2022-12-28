import { createGoal } from '../features/goals/goalSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

function GoalForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({ text }))
    setText('')
  }
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input
              type="text"
              id="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button className="btn btn-block" type="submit">
            Add
          </button>
        </form>
      </section>
    </>
  )
}

export default GoalForm
