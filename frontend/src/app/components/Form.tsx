import {ChildProps, IdProps} from '@/app/types/Props'

type FormElementProps = {
    label: string
    id: string
    name: string
    placeholder: string
}

type FormInputProps = FormElementProps & {
    type: string
}

type FormTextAreaProps = FormElementProps & {
    rows: number
}

export function Form({children, id}: ChildProps & IdProps) {
    return (
        <form id={id} className={'md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8'}>
            {children}
        </form>
    )
}

export function FormInput ({label, type, id, name, placeholder}: FormInputProps) {
    return (
        <div className="py-3">
            <label htmlFor={id} className={"block text-gray text-sm font-bold mb-2"}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
                className={'mt-1 block w-full rounded-md bg-base-200 border-transparent focus:border-base-300 focus:bg-base-200 focus:ring-0'}
            />
        </div>
    )
}

export function FormTextArea ({label, id, name, placeholder, rows}: FormTextAreaProps) {
    return (
        <div className={"py-3"}>
            <label htmlFor={id} className={'block text-gray text-sm font-bold mb-2'}>{label}</label>
            <textarea
                rows={rows}
                name={name}
                placeholder={placeholder}
                id={id}
                className={'mt-1 block w-full rounded-md bg-base-200 border-transparent focus:border-base-300 focus:bg-base-200 focus:ring-0'}
            />
        </div>
    )
}

export function FormButton () {
    return (
        <div className={'py-3'}>
            <button type={'submit'} className={'btn btn-primary font-bold py-2 px-4 rounded-lg'}>
                Send
            </button>
        </div>
    )
}