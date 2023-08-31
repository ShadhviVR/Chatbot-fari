import styles from './footer.module.css';
import cls from 'classnames';
import { useRouter } from 'next/router';
import { fetchInterfaceComponent, fetchChat, fetchData, fetchGenerativeAi } from '../../api/axios';
import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { InputTypeContext } from '../../context/InputTypeContext';
import { OutputTypeContext } from '../../context/OutputTypeContext';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { PredictionContext } from '../../context/PredictionContext';
import { VersionContext } from '../../context/VersionContext';
import { LinkContext } from '../../context/LinkContext';

const Footer = ({ setNextPageHref, setSubmitForm, handleNextStep, handleTryAgain, disabled, onSubmit, languages }) => {

    const { setSelectedInputType } = useContext(InputTypeContext);
    const { setSelectedOutputType } = useContext(OutputTypeContext);
    const { setGlobalInput } = useContext(GlobalInputContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { setSelectedVersion } = useContext(VersionContext);
    const { setLinkSource } = useContext(LinkContext);
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

    const handleResetPathValue = (pathValue) => {
        setNextPageHref(pathValue);
        setSelectedInputType(null);
        setSelectedOutputType(null);
        setGlobalInput({});
        setPrediction(null);
        setSubmitForm(false);
        setSelectedVersion([]);
        setLinkSource('');
    };

    const handlePreviousStep = async () => {
        
        if (router.pathname === '/output') {
            setSelectedInputType(null);
            setSelectedOutputType(null);
            setNextPageHref(null);
        }
        else if
            (router.pathname === '/image-page' || router.pathname === '/pdf-page') {
            setSelectedOutputType(null);
            setGlobalInput({});
            //cancelPrediction(cancelUrl);
        } else if (router.pathname === '/result') {
            setPrediction(null);
            setGlobalInput({});
            setLinkSource('');
        }
        router.back(); // Navigate to the previous page
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
                <div className={styles.btnContainer}>
                <button
                    disabled={disabled}
                    onClick={handlePreviousStep}
                    className={styles.previousBtn}>
                    <Image className={styles.icon} src="/static/arrow-left-light.svg" alt="arrow" width={24} height={24} />
                    {translation && translation.data.attributes.previous}
                </button>
                </div>
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