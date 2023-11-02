import Link from "next/link";

export function NavBar() {
    return (
        <div className="navbar">
            <div className="flex-1">
                <p className="normal-case text-xl">Valid Coffee</p>
            </div>
            <div className="flex-none">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"/>
                </div>
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details className={'z-50'}>
                            <summary>
                                Navigation
                            </summary>
                            <ul className="p-2 bg-base-100">
                                <li><Link href={"/"}>Home</Link></li>
                                <li><Link href={"/account"}>Account</Link></li>
                                <li><Link href={"/shop"}>Shops</Link></li>
                                <li><Link href={"/about"}>About Us</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>

    )
}