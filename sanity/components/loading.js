import React from 'react'
import styles from '../../styles/Home.module.css';

const Loading = () => {
   
  return (
   
    <div class={styles.loader}>
    <div class={styles.face}>
        <div class={styles.circle}></div>
    </div>
    <div class={styles.face}>
        <div class={styles.circle}></div>
    </div>
</div>
  )
}

export default Loading