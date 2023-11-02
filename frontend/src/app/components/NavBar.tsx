import Link from "next/link";

export function NavBar() {
    return (
        <div className="navbar">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h8m-8 6h16"/>
                    </svg>
                </label>
                <ul className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32">
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/account"}>Account</Link></li>
                    <li><Link href={"/shop"}>Shops</Link></li>
                    <li><Link href={"/about"}>About Us</Link></li>
                </ul>
            </div>
            <div className="flex-1">
                <p className="normal-case text-xl">Valid Coffee</p>
            </div>
            <div className="flex-none">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-40 md:w-auto"/>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href={"/"}>Home</Link></li>
                        <li><Link href={"/account"}>Account</Link></li>
                        <li><Link href={"/shop"}>Shops</Link></li>
                        <li><Link href={"/about"}>About Us</Link></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}