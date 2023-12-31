'use client'
import {useRouter} from 'next/navigation'
import {SignIn, signInAccountSchema} from '@/utils/models/SignIn'
import {Formik, FormikHelpers, FormikProps} from 'formik'
import {toFormikValidationSchema} from 'zod-formik-adapter'
import {DisplayError, DisplayStatus} from '@/components/Display'
import React from 'react'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'


export function SignInForm () {
    const router = useRouter()
    const submitHandler = makeSignInHandler(router)
    const initialValues: any = {
        accountEmail: '',
        accountPassword: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={toFormikValidationSchema(signInAccountSchema)}>
            {SignInFormContent}
        </Formik>
    )
}

function SignInFormContent (props: FormikProps<SignIn>) {
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
            <div className={'form-control'}>
                <label className={'label'} htmlFor='accountEmail'>E-mail</label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountEmail}
                    className={'input input-bordered w-full max'}
                    type='text'
                    name='accountEmail'
                    id='accountEmail'
                />
                <DisplayError errors={errors} touched={touched} field={'accountEmail'}/>
            </div>
            <div className='form-control'>
                <label className={' label'} htmlFor='password'>Password</label>
                <input
                    className={'input input-bordered w-full max'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountPassword}
                    type='password'
                    name='accountPassword'
                    id='password'
                />
                <DisplayError errors={errors} touched={touched} field={'accountPassword'}/>
            </div>
            <div className={'py-2 flex gap-2'}>
                <button className={'btn btn-success'} type='submit'>Log In</button>
                <button className={'btn btn-danger'} onClick={handleReset} type='reset'>reset</button>
            </div>
            <DisplayStatus status={status}/>
        </form>
    )
}

function makeSignInHandler (router: AppRouterInstance) {
    return (values: SignIn, actions: FormikHelpers<SignIn>) => {
        const {setStatus, resetForm} = actions
        fetch('/api/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
                router.back()
                router.refresh()
            }
            setStatus({type: json.type, message: json.message})
        })
    }
}