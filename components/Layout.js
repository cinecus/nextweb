import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GiCoffeeCup, GiIceCubes } from 'react-icons/gi'
export default function Layout({ children }) {
    const router = useRouter()
    // const [size, setSize] = useState(0);
    // const [isShow, setIsShow] = useState(false)

    // const checkSize = () => {
    //     setSize(window.innerWidth);
    // };

    return (
        <div className='wrapper'>
            {/* {isShow && */}
            <div className='nav'>
                <div>
                    <Link href="/" >
                        <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
                            <GiCoffeeCup size={35} style={{ 'marginRight': '10px' }} /> NEXT COFFEE
                        </div>
                    </Link>
                    {router.asPath === '/' && <div className='underline'></div>}
                </div>

                <div>
                    <Link href="/drinks" >
                        Menu
                    </Link>
                    {router.asPath.split('/')[1] === 'drinks' && <div className='underline'></div>}
                </div>

                <div>
                    <Link href="/about" >
                        About
                    </Link>
                    {router.asPath === '/about' && <div className='underline'></div>}
                </div>
            </div>
            {/* } */}
            <main>{children}</main>
        </div>
    )
}
