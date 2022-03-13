import React, { useEffect, useState, useCallback } from 'react'

export const Loading = () => {
    const [text, setText] = useState('Loading')
    useEffect(() => {
        let loading = setInterval(() => {
            if (text !== 'Loading...') {
                setText(text + '.')
            } else {
                setText('Loading')
            }
        }, 1000)
        return () => {
            clearInterval(loading)
        }
    }, [text])
    return (
        <div className='container_center'>
            <img src='https://media2.giphy.com/media/ohFe5JEvS5FbSdhh7k/giphy.gif' width={200} height={200}></img>
            <div style={{ 'fontSize': '1rem' }}>{text}</div>
        </div>
    )
}

