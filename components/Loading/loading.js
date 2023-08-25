import styles from './Loading.module.css';
import Image from 'next/image';

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Image
                    alt='Loader'
                    src='static/logo.svg'
                    width={450}
                    height={450}
                    className={styles.logo}
                />
                <div className={styles.cover}></div>
                <div className={styles.dots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Loading;