export function ContactForm () {
    return (
        <div className={'prose'}>
            <h1>Contact Us</h1>
            <form id="contact" className={'md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8'}>
                <div className={'py-3'}>
                    <label htmlFor="name" className={'block text-gray text-sm font-bold mb-2'}>Name</label>
                    <input type="text" id="name" name="name"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="message" className="block text-gray text-sm font-bold mb-2">Message</label>
                    <textarea
                        rows={3}
                        name="message"
                        id="message"
                        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                </textarea>
                </div>
                <div className="py-3">
                    <button type="submit" className="btn btn-primary font-bold py-2 px-4 rounded">
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}