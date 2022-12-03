import Link from 'next/link'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Divide as Hamburger } from 'hamburger-react'

export default function Menu({userId}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenuOpen = () => setMenuOpen(prevMenuState => !prevMenuState)
    const logOut = () => signOut({redirect: true, callbackUrl: '/auth'})

    return (
        <>
            <h1>IP Adress Tracker</h1>
            <button 
                className="ip-tracker__menu-btn" 
                onClick={toggleMenuOpen}
            >
                <Hamburger 
                    color="#FFF"
                    hideOutline={true}
                    size={30}
                    toggled={menuOpen}
                    label="Show menu"
                    />
            </button>
            <nav className={`ip-tracker__menu-nav ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li className='ip-tracker__menu-nav-item'>
                        <Link href={`/user/${userId ? userId : ''}`}>
                            <button className='ip-tracker__menu-nav-item-btn'>Your Profile</button>
                        </Link>
                    </li>
                    <li className='ip-tracker__menu-nav-item'>
                        <button className='ip-tracker__menu-nav-item-btn' onClick={logOut}>
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
        </>
      )
}
