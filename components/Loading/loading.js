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
            </div>
        </div>
    )
}

export default Loading;