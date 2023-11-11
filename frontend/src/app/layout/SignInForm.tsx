"use client"
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {SignIn, signInAccountSchema} from "@/utils/models/signin";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import {FormDebugger} from "@/app/components/formDebbuger";


export function SignInForm() {
    const initialValues : any = {
        accountEmail: '',
        accountPassword: ''
    }

    const handleSubmit = (values: SignIn, actions: FormikHelpers<SignIn>) => {
        const {setStatus, resetForm } = actions
        const result = fetch('/api/sign-in', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
            }
            setStatus({type: json.type, message: json.message})
        })
    }

    return(
        <>
        <Formik initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(signInAccountSchema)}
        >
            {SignInFormContent}
        </Formik>
        </>
    )
}

function SignInFormContent(props: FormikProps<SignIn>) {
    const {
        status,
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;

    return(
        <>
            <form onSubmit={handleSubmit} className={""}>
                <div className="form-control">
                    <label className="label" htmlFor="accountEmail">email</label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountEmail}
                        className="input input-bordered w-full max"
                        type="text"
                        name="accountEmail"
                        id="accountEmail"
                    />
                    <DisplayError errors={errors} touched={touched} field={"accountEmail"} />
                </div>
                <div className=" form-control">
                    <label className={" label"} htmlFor="password">Password</label>
                    <input
                        className="input input-bordered w-full max"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountPassword}
                        type="password"
                        name="accountPassword"
                        id="password"
                    />
                    <DisplayError errors={errors} touched={touched} field={"accountPassword"} />
                </div>
                <div className="py-2 flex gap-2">
                    <button className='btn btn-success' type="submit">Log In</button>
                    <button className='btn btn-danger' onClick={handleReset} type="reset">reset</button>
                </div>
                <DisplayStatus status={status}/>
            </form>
        </>
    )
}