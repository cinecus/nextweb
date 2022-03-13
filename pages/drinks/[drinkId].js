import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/DrinksSingle.module.css'
import { GiCoffeeCup, GiIceCubes } from 'react-icons/gi'
import { BsCupStraw } from 'react-icons/bs'
import Slider from "@madzadev/image-slider";
import "@madzadev/image-slider/dist/index.css";
import useSwr, { useSWRConfig } from 'swr'
import { Loading } from '../../components/Loading'

const fetcher_get = (url) => fetch(url).then((res) => res.json())


const drinkIdPage = () => {
    const router = useRouter()
    const { drinkId } = router.query
    const { data, error } = useSwr(`/api/drinks/${drinkId}`, fetcher_get)

    if (error) return <div>Failed to load drinks</div>
    if (!data) return <div><Loading></Loading></div>
    return (
        <>
            <div className={styles.hero} >
                <div className={styles.container}>
                    <Slider imageList={data.url.map((el => ({ url: el })))} width={'35rem'} height={'25rem'} />
                </div>
                <div className={styles.container} style={{ 'background': '#fff', padding: '3rem 3rem', marginTop: '-1.6rem' }}>
                    <div className={styles.title}>
                        {data.name}
                    </div>
                    <div className={styles.subtitle}>
                        {data.description}
                    </div>
                    <div className={styles.price}>
                        <div><GiCoffeeCup /> HOT : {data.price.hot} Baht</div>
                        <div><GiIceCubes /> ICED : {data.price.ice}  Baht</div>
                        <div><BsCupStraw /> FRAPPE : {data.price.frappe}  Baht</div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default drinkIdPage