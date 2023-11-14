import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import {Signup, SignUpSchema} from "@/utils/models/Signup";

export function SignUpForm() {
    const initialValues: Signup = {
        accountEmail: '',
        accountName: '',
        accountPassword: '',
        accountPasswordConfirm: '',
        accountId: null,
        accountActivationToken: null
    };

    const handleSubmit = (values: Signup, actions: FormikHelpers<Signup>) => {
        const { setStatus, resetForm } = actions;
        const result = fetch('/apis/sign-up/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if(json.status === 200) {
                resetForm()
            }
            setStatus({type: json.type, message: json.message})
        })


        resetForm();
        setStatus({ type: 'success', message: 'Signup successful' });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(SignUpSchema)}
        >
            {SignUpFormContent}
        </Formik>
    );
}

function SignUpFormContent(props: FormikProps<Signup>) {
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
        handleReset,
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className={''}>
                <div className="form-control">
                    <label className="label" htmlFor="accountEmail">
                        Email
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountEmail}
                        className="input input-bordered w-full max"
                        type="text"
                        name="accountEmail"
                        id="accountEmail"
                    />
                    <DisplayError errors={errors} touched={touched} field={'accountEmail'} />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="accountName">
                        Account Name
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountName}
                        className="input input-bordered w-full max"
                        type="text"
                        name="accountName"
                        id="accountName"
                    />
                    <DisplayError errors={errors} touched={touched} field={'accountName'} />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="accountPassword">
                        Password
                    </label>
                    <input
                        className="input input-bordered w-full max"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountPassword}
                        type="password"
                        name="accountPassword"
                        id="accountPassword"
                    />
                    <DisplayError errors={errors} touched={touched} field={'accountPassword'} />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="accountPasswordConfirm">
                        Confirm Password
                    </label>
                    <input
                        className="input input-bordered w-full max"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountPasswordConfirm}
                        type="password"
                        name="accountPasswordConfirm"
                        id="accountPasswordConfirm"
                    />
                    <DisplayError errors={errors} touched={touched} field={'accountPasswordConfirm'} />
                </div>
                <div className="py-2 flex gap-2">
                    <button className="btn btn-success" type="submit">
                        Sign Up
                    </button>
                    <button className="btn btn-danger" onClick={handleReset} type="reset">
                        Reset
                    </button>
                </div>
                <DisplayStatus status={status} />
            </form>
        </>
    );
}