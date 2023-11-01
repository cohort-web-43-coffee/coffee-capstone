export function AccountCard() {
    return (
        <section className={'container mx-auto my-16 p-4 text-center'}>
            <div className={'text-center font-bold text-xl p-4'}>
                <h1>ACCOUNT</h1>
            </div>
            <div className={'grid grid-cols-2'}>
                <h1 className={'text-lg'}>NAME:</h1><p>Frederick Douglas</p>
                <h1 className={'text-lg'}>EMAIL:</h1><p>fakeemail@realemail.com</p>
            </div>
        </section>
    )
}