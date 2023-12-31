import {FormikProps, FormikValues} from 'formik'


interface DisplayErrorProps {
    errors: FormikProps<FormikValues>['errors']
    touched: FormikProps<FormikValues>['touched']
    field: string
}

interface DisplayStatusProps {
    status: {
        type: string
        message: string
    }
}

export function DisplayError(props: Readonly<DisplayErrorProps>) {
    const { errors, touched, field } = props
    if(errors[field] && touched[field]) {
        return (

            <output className={'block alert alert-danger'}>
                {errors[field] as string}
            </output>
        )
    } else {
        return <></>
    }
}



export function DisplayStatus(props: Readonly<DisplayStatusProps>) {
    const {status} = props
    if(status) {
        return(
            <output className={`block ${status.type}`}>
                {status.message}
            </output>
        )
    }
    return <></>
}