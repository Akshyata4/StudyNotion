import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component"

const RenderCartCourses = () => {
    // course card banane k map function use krenge data k upar....data layenge cart slice se using useSelector
    const {cart} = useSelector((state) => state.cart)

    //to dispatch removeFromCart  
    const dispatch = useDispatch()
  return (
    <div>
    {
        cart.map((course, index) => {
            <div>
                {/* left */}
                <div>
                    <img src={course?.thumbnail}/>
                    <div>
                        <p>
                            {course?.courseName}
                        </p>
                        <p>
                            {course?.category?.name}
                        </p>
                        <div>
                            {/* logic for rating review */}
                            <span>4.8</span> 
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<GiNinjaStar/>}
                                fullIcon={<GiNinjaStar/>}
                            />

                            <span>{course?.ratingAndReviews?.length} ratings</span>
                        </div>
                    </div>
                </div>

                {/* right */}
                <div>
                    <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p>
                        Rs {course?.price}
                    </p>
                </div>
            </div>
        })
    }
    </div>
  )
}

export default RenderCartCourses