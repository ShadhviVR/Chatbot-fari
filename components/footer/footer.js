import styles from './footer.module.css';
import cls from 'classnames';
import { useRouter } from 'next/router';
import { fetchInterfaceComponent } from '../../api/axios';
import { useEffect, useState } from 'react';


const Footer = ({ handleNextStep, handleTryAgain, disabled, onSubmit, languages }) => {

    const [translation, setTranslation] = useState(null);
    const router = useRouter();

    const handleButtonClick = (e) => {
        handleNextStep();
        e.preventDefault();
        if (router.pathname === '/image-page'
            || router.pathname === '/pdf-page') {
            onSubmit();
        }
    };

    const handleTryAgainClick = (e) => {
        handleTryAgain(); // Call the function to handle "Try Again" action
        e.preventDefault();
        router.reload();
    };

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const translatedData = await fetchInterfaceComponent(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);

    const shouldDisplayTryAgainButton = ['/chat', '/headphone', '/tortoise','/color', '/building','/pdf1', '/pdf2','/pdf3', '/pdf4'].includes(router.pathname);

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
                    {shouldDisplayTryAgainButton && (
                    <button
                        onClick={handleTryAgainClick}
                        className={styles.tryAgainBtn}
                    >
                        {translation && translation.data.attributes.try_again}
                    </button>
                    )}
                </div>
            </div>
        </footer>
    )
}

export default Footer; 