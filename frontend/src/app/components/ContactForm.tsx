type ContactFormInputProps = {
    label: string;
    type: string;
    id: string;
    name: string;
    placeholder: string
}

type ContactFormTextAreaProps = {
    label: string,
    id: string,
    name: string,
    placeholder: string,
    rows: number
}


export function ContactForm () {
    return (
        <div>
            <div style={{margin: 'auto', width: '50%'}}>
                <div className="prose">
                    <h1>Contact Us</h1>
                </div>
            </div>
            <form id="contact" className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <ContactFormInput label="Name" type="text" id="name" name="name" placeholder="ex.Agent Smith"/>
                <ContactFormInput label="Email" type="email" id="email" name="email" placeholder="Smith@example.com"/>
                <ContactFormTextArea label="Message" id="message" name="message" placeholder="Enter message max 250"
                                     rows={3}/>
                <ContactFormButton/>
            </form>
        </div>
    )
}

export function SignUp () {
    return (
        <>
            <ContactFormInput label="Name" type="text" id="name" name="name" placeholder="ex.Agent Smith"/>
            <ContactFormInput label="Email" type="email" id="email" name="email" placeholder="Smith@example.com"/>
            <ContactFormInput label="Password" type="password" id="password" name="password"
                              placeholder="Enter Password"/>
            <ContactFormInput label="Confirm Password" type="password" id="password" name="password"
                              placeholder="Confirm Password"/>
        </>
    )
}


function ContactFormInput ({label, type, id, name, placeholder}: ContactFormInputProps) {
    return (
        <div className="py-3">
            <label htmlFor={id} className="block text-gray text-sm font-bold mb-2">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
            />
        </div>
    )
}

function ContactFormTextArea ({label, id, name, placeholder, rows}: ContactFormTextAreaProps) {
    return (
        <div className="py-3">
            <label htmlFor={id} className="block text-gray text-sm font-bold mb-2">{label}</label>
            <textarea
                rows={rows}
                name={name}
                placeholder={placeholder}
                id={id}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            ></textarea>
        </div>
    )
}

function ContactFormButton () {
    return (
        <div className="py-3">
            <button type="submit" className="btn btn-primary font-bold py-2 px-4 rounded">
                Send
            </button>
        </div>
    )
}