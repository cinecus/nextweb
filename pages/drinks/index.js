import { useState } from 'react'
import { useRouter } from 'next/router'
import useSwr, { useSWRConfig } from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Drinks.module.css'
import { ModalInsert, ModalEdit, ModalSuccess } from '../../components/Modal'
import { Switch } from 'antd'

const fetcher = (url) => fetch(url).then((res) => res.json())
const fetcher_delete = (url) => fetch(url, {
  method: 'DELETE',
}).then((res) => res.json())

export default function Home() {
  const router = useRouter()
  const { data, error } = useSwr('/api/drinks', fetcher, { refreshInterval: 3000 })
  const [toggleDeleteMode, setToggleDeleteMode] = useState(false)
  const [toggleEditMode, setToggleEditMode] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState({ insert: false, edit: false });
  const [editId, setEditId] = useState(0)
  const showModal = (type) => {
    setIsModalVisible({ ...isModalVisible, [type]: true });
  };

  const handleOk = (type) => {
    setIsModalVisible({ ...isModalVisible, [type]: false });
  };

  const handleCancel = (type) => {
    setIsModalVisible({ ...isModalVisible, [type]: false });
  };

  const handleEdit = (id) => {
    console.log('id', id)
    // mutate(`http://localhost:8080/api/drinks/${id}`, [...data, values], false)

    setEditId(+id)
    showModal('edit')
    // trigger(`http://localhost:8080/api/drinks/${id}`)
  }

  const handleDelete = async (id) => {
    const response = await fetcher_delete(`/api/drinks/${id}`)
    await ModalSuccess(response.msg)
  }
  if (error) return <div>Failed to load drinks</div>
  if (!data) return <div>Loading ...</div>
  return (
    <div className='wrapper'>
      <div className={styles.title}>
        COFFEE MENU
      </div>
      <div className={styles.action_container}>
        <div className={styles.back_btn} onClick={() => router.push('/')}> {'<<'} Back</div>
        <div>
          <button className={styles.btn} onClick={() => showModal('insert')}>ADD</button>
          <button className={toggleEditMode ? styles.edit_btn_active : styles.edit_btn} onClick={() => setToggleEditMode(!toggleEditMode)}>EDIT</button>
          <button className={toggleDeleteMode ? styles.delete_btn_active : styles.delete_btn} onClick={() => setToggleDeleteMode(!toggleDeleteMode)}>DELETE</button>
        </div>
      </div>
      <div className={styles.grid_container}>
        {
          data.filter(item => !item.is_delete).map(_ => {
            return <div className={styles.card}>
              <div className={styles.tag}>
                #{_.id}
              </div>
              {
                toggleEditMode && <div className={styles.edit_tag} onClick={() => handleEdit(_.id)}>
                  EDIT
                </div>
              }

              {
                toggleDeleteMode && <div className={styles.delete_btn} onClick={() => handleDelete(_.id)}>
                  x
                </div>
              }
              <div className={styles.bg}>
                <img src={_.url} />
              </div>
              <div className={styles.title}>
                {_.name}
              </div>
            </div>
          })
        }
      </div>
      <ModalInsert prop={{ isModalVisible, handleCancel, handleOk }} />
      <ModalEdit prop={{ isModalVisible, handleCancel, handleOk, editId }} />
      {/* <ModalInsert isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} /> */}
    </div>
  )
}
