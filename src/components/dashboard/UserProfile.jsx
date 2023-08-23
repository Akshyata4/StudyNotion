import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(logout(navigate))
    }
  return (
    <div className=' mx-auto'>
        <form onSubmit={submitHandler}>
            <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
            Log Out
            </button>
        </form>
        
    </div>
  )
}

export default UserProfile