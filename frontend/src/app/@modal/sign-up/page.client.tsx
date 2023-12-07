'use client'
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {SignUp, SignUpSchema} from "@/utils/models/SignUp";
import {DisplayError, DisplayStatus} from '@/components/Display'
import {useRouter} from 'next/navigation'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {SignIn} from '@/utils/models/signin'


export function SignUpForm () {
    const router = useRouter()
    const handleSubmit = makeSignUpHandler(router)
    const initialValues: SignUp = {
        accountEmail: '',
        accountName: '',
        accountPassword: '',
        accountPasswordConfirm: '',
        accountId: null,
        accountActivationToken: null
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(SignUpSchema)}>
            {SignUpFormContent}
        </Formik>
    );
}

function SignUpFormContent (props: FormikProps<SignUp>) {
    const {
        status,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;

    return (
        <form onSubmit={handleSubmit} className={''}>
            <div className='form-control'>
                <label className='label' htmlFor='accountEmail'>Email</label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountEmail}
                    className='input input-bordered w-full max'
                    type='text'
                    name='accountEmail'
                    id='accountEmail'
                />
                <DisplayError errors={errors} touched={touched} field={'accountEmail'}/>
            </div>
            <div className='form-control'>
                <label className='label' htmlFor='accountName'>Account Name</label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountName}
                    className='input input-bordered w-full max'
                    type='text'
                    name='accountName'
                    id='accountName'
                />
                <DisplayError errors={errors} touched={touched} field={'accountName'}/>
            </div>
            <div className='form-control'>
                <label className='label' htmlFor='accountPassword'>Password</label>
                <input
                    className='input input-bordered w-full max'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountPassword}
                    type='password'
                    name='accountPassword'
                    id='accountPassword'
                />
                <DisplayError errors={errors} touched={touched} field={'accountPassword'}/>
            </div>
            <div className='form-control'>
                <label className='label' htmlFor='accountPasswordConfirm'>Confirm Password</label>
                <input
                    className='input input-bordered w-full max'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountPasswordConfirm}
                    type='password'
                    name='accountPasswordConfirm'
                    id='accountPasswordConfirm'
                />
                <DisplayError errors={errors} touched={touched} field={'accountPasswordConfirm'}/>
            </div>
            <div className='py-2 flex gap-2'>
                <button className='btn btn-success' type='submit'>Sign Up</button>
                <button className='btn btn-danger' onClick={handleReset} type='reset'>Reset</button>
            </div>
            <DisplayStatus status={status}/>
        </form>
    )
}

function makeSignUpHandler (router: AppRouterInstance) {
    return (values: SignUp, actions: FormikHelpers<SignUp>) => {
        const {setStatus, resetForm} = actions;
        fetch('/apis/sign-up/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
                router.back()
            }
            setStatus({type: json.type, message: json.message})
        })

        resetForm();
        setStatus({type: 'success', message: 'Signup successful'})
    }
}