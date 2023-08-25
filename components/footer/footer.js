import styles from './footer.module.css';
import cls from 'classnames';
import { useRouter } from 'next/router';
import { fetchInterfaceComponent } from '../../api/axios';
import { useEffect, useState } from 'react';


const Footer = ({ handleNextStep, disabled, onSubmit, languages }) => {

    const [translation, setTranslation] = useState(null);
    console.log(translation, 'from footer')
    const router = useRouter();

    const handleButtonClick = (e) => {
        handleNextStep();
        e.preventDefault();
        if (router.pathname === '/image-page'
            || router.pathname === '/pdf-page') {
            onSubmit();
        }
    };

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const translatedData = await fetchInterfaceComponent(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);

    return (
        <footer className={styles.footer} >
            <div className={styles.container}>
                <div className={styles.btnWrapper}>
                    <button
                        onClick={handleButtonClick}
                        disabled={disabled}
                        className={cls(styles.nextStepBtn, { [styles.disabledBtn]: disabled })}>
                        {translation && translation.data.attributes.next}
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer; 