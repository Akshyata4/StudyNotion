import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { editCourseDetails, fetchCourseCategories, addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import { toast } from 'react-hot-toast';
import {setStep, setCourse} from '../../../../../slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import {COURSE_STATUS} from '../../../../utils/constants'
import { MdNavigateNext } from 'react-icons/md';
import ChipInput  from './ChipInput';
import Upload from '../Upload';

export default function CourseInformationForm () {
    const{
        register, 
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    //for fetching data for category dropdown
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("courseTitle", course.price);
            setValue("courseTitle", course.tag);
            setValue("courseTitle", course.whatYouWillLearn);
            setValue("courseTitle", course.category);
            setValue("courseTitle", course.instructions);
            setValue("courseTitle", course.thumbnail);
        }
        getCategories();
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            // currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            //currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
            )
            return true;
        else 
            return false;
    }

    //handles next button click
    const onSubmit = async(data) => {
        // for editing course
        if(editCourse){
            if(isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if(
                    currentValues.courseRequirements.toString() !== 
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions", 
                        JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2))
                    dispatch(setCourse(result));
                }
            }
            else {
                toast.error("No changes made so far");
            }
        return;
    } 

    //create a new course
    const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        console.log("BEFORE add course API call");
        console.log("PRINTING FORMDATA", formData);
        const result = await addCourseDetails(formData,token);
        if(result) {
            dispatch(setStep(2))
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);
    }
  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >   
        {/* title */}
        <div className=' flex flex-col space-y-2'>
            <label htmlFor='courseTitle' className=' text-sm text-richblack-5'>Course Title<sup className=' text-pink-200'>*</sup></label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required: true})}
                className='w-full form-style'
            />
            {
                errors.courseTitle && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course title is required
                    </span>
                )
            }
        </div>
        {/* short desc */}
        <div className=' flex flex-col space-y-2'>
            <label htmlFor='courseShortDesc' className=' text-sm text-richblack-5'>Course Short Description<sup className=' text-pink-200'>*</sup></label>
            <input
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required: true})}
                className='w-full form-style'
            />
            {
                errors.courseTitle && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course description is required
                    </span>
                )
            }
        </div>
        {/* price */}
        <div className='relative flex flex-col space-y-2'>
            <label htmlFor='coursePrice' className=' text-sm text-richblack-5'>Course Price<sup className=' text-pink-200'>*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Price'
                {...register("coursePrice", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                className='w-full form-style !pl-12'
            />
            <HiOutlineCurrencyRupee className='absolute text-richblack-400 top-1/2 left-3'/>
            {
                errors.courseTitle && (
                    <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                        Course title is required
                    </span>
                )
            }
        </div>
        {/* category */}
        <div className=' flex flex-col space-y-2'>
            <label htmlFor='courseCategory' className=' text-sm text-richblack-5'>Course Category<sup className=' text-pink-200'>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required:true})}
            className=' w-full form-style'
            >
                <option value="" disabled>Choose a category</option>
                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {errors.courseCategory && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Course Category is Required
                </span>
            )}
        </div>
        {/* component for handling tags input */}
        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        {/* component for thumbnail image*/}
        <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
        />
        {/* Benefits of the course */}
        <div className=' flex flex-col space-y-2'>
            <label className='text-sm text-richblack-5' htmlFor="courseCategory" > Benefits of the course <sup className=' text-pink-200'>*</sup></label>
            <textarea
                id='courseBenefits'
                placeholder='Enter Benefits of the course'
                {...register("courseBenefits", {required:true})}
                className='min-h-[130px] w-full form-style'
            />
            {errors.courseBenefits && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Benefits of the course are required**
                </span>
            )}
        </div>

        <RequirementField
            name="courseRequirements"
            label='Requirements/Instructions'
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <div className=' flex justify-end gap-x-2'>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className=' flex cursor-pointer rounded-md items-center gap-x-2 bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 '
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn
                disabled={loading}
                text={!editCourse ? "Next" : "Save Changes"}
            >
                <MdNavigateNext/>
            </IconBtn>
        </div>
    </form>
  )
}
