import { useState } from 'react'
import { useRouter } from 'next/router'
import useSwr, { trigger } from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ModalInsert, ModalEdit } from '../components/Modal'
import { Switch } from 'antd'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const router = useRouter()

  return (
    <div className={'wrapper'}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <img src='https://media2.giphy.com/media/ohFe5JEvS5FbSdhh7k/giphy.gif'></img>
        </div>
        <div className={styles.container}>
          <div className={styles.title}>
            CC COFFEE
          </div>
          <div className={styles.subtitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex numquam blanditiis molestiae eveniet, ea reprehenderit excepturi illo, ipsum quisquam, quidem dicta ipsam? Temporibus culpa doloremque nam omnis, architecto dolore corporis!
          </div>
          <button className={styles.btn} onClick={() => router.push('/drinks')}>See Menu</button>
        </div>
      </div>
    </div>
  )
}


