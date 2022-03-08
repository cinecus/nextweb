import { useState } from 'react'
import { useRouter } from 'next/router'
import useSwr from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ModalInsert } from '../components/Modal'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSwr('/api/drinks', fetcher)
  const [toggleDeleteMode, setToggleDeleteMode] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (error) return <div>Failed to load drinks</div>
  if (!data) return <div>Loading ...</div>
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        CRUD NEXT JS
      </div>
      <button className={styles.btn} onClick={showModal}>ADD</button>
      <div className={styles.grid_container}>
        {
          data.map(_ => {
            return <div className={styles.card}>
              <div className={styles.tag}>
                {_.id}
              </div>
              {
                toggleDeleteMode && <div className={styles.delete_btn}>
                  x
                </div>
              }
              <div className={styles.bg}>
                <img src={_.url} />
              </div>
              <div className={styles.title}>
                #{_.id} {_.name}
              </div>
            </div>
          })
        }
      </div>
      <ModalInsert prop={{ isModalVisible, handleCancel, handleOk }} />
      {/* <ModalInsert isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} /> */}
    </div>
  )
}
