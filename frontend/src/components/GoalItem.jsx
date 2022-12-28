import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(deleteGoal(goal._id))
  }
  return (
    <div className="goal">
      <button className="close" onClick={onClick}>
        X
      </button>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
    </div>
  )
}

export default GoalItem
