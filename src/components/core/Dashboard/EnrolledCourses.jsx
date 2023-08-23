import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
  const {token} = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses]= useState([]);

  const getEnrolledCourses = async() => {
    try{
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response);
    } catch(error){
      console.log(error)
      console.log("Unable to fetch enrolled courses");
    }
   
  }

  //network / backend call
  useEffect(() => {   
    getEnrolledCourses();
  }, [])
  return (
    <div className=' text-white'>
      <div>
        Enrolled Courses
        {
          !enrolledCourses ? 
              (<div>loading....</div>) : !enrolledCourses.length ? 
                  (<p>You have not enrolled in any course</p>) :
                  (
                    <div>
                      <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                      </div>
                      {/* cards */}
                      {
                        enrolledCourses.map((course, index) => (
                          <div>
                            {/* left */}
                            <div>
                              <img
                                src={course.thumbnail}
                              />
                              <div>
                                <p>{course.courseName}</p>
                                <p>{course.courseDescription}</p>
                              </div>
                            </div>

                            {/* mid part */}
                            <div>
                              {course?.totalDuration}
                            </div>

                            {/* progress */}
                            <div>
                              <p>Progress: {course.progressPercentage || 0}%</p>
                              <ProgressBar
                                completed={course.progressPercentage || 0}
                                height='8px'
                                isLabelVisible={false}
                              />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
        }
      </div>
    </div>
  )
}

export default EnrolledCourses