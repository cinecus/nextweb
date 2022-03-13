import React from 'react'
import styles from '../styles/About.module.css'
const about = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.title}>
                About
                <div className='underline'></div>
            </div>
            <div className={styles.content}>
                <div className={styles.subtitle}>
                    Info
                </div>
                This project developed front-end and back-end by use Next JS Framework, Any Mock Up Data in this site not use for commercial.
                <div className={styles.subtitle}>
                    Library
                </div>
                <ul>
                    <li>
                        next
                    </li>
                    <li>
                        antd
                    </li>
                    <li>
                        react-icons
                    </li>
                    <li>
                        @madzadev/image-slider
                    </li>
                    <li>
                        swr
                    </li>
                </ul>
                <div className={styles.subtitle}>
                    Source Code
                </div>
                <a href='https://github.com/cinecus/nextweb' target='_blank' rel="noreferrer">https://github.com/cinecus/nextweb</a>
                <div className={styles.subtitle}>
                    Other Projects
                </div>
                <a href='https://cinecus-project.et.r.appspot.com' target='_blank' rel="noreferrer">https://cinecus-project.et.r.appspot.com</a>
            </div>
        </div>
    )
}

export default about