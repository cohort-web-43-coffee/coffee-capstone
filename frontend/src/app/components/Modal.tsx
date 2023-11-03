import {SignUp} from "@/app/components/ContactForm";

export function SignUpModal () {
    return (
        <dialog id="sign-up-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Sign Up</h3>
                <SignUp/>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}