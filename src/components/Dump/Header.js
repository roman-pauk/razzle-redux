import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/some">Some</Link></li>
            <li><Link to="/test">Test</Link></li>
        </ul>
    )
}

export default Header
