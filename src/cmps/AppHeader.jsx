import { Link, NavLink } from "react-router-dom"

export function AppHeader(){
    return (
        <section className="header-container">
            <h3>Miss Toys</h3>
            <div className="header-link-container">
                <NavLink className='header-link' to='/'>Home</NavLink>
                <NavLink className='header-link' to='/toys'>Toys</NavLink>
            </div>

        </section>
    )
}