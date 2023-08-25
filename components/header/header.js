import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InputTypeContext } from '../../context/InputTypeContext';
import { OutputTypeContext } from '../../context/OutputTypeContext';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { PredictionContext } from '../../context/PredictionContext';
import { VersionContext } from '../../context/VersionContext';
import { LinkContext } from '../../context/LinkContext';
import { useContext, useEffect, useState } from 'react';
import { fetchData, fetchGenerativeAi, fetchInterfaceComponent } from '../../api/axios';

const Header = ({ setNextPageHref, setSubmitForm, languages, setLanguages, disabled }) => {

    const { setSelectedInputType } = useContext(InputTypeContext);
    const { setSelectedOutputType } = useContext(OutputTypeContext);
    const { setGlobalInput } = useContext(GlobalInputContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { setSelectedVersion } = useContext(VersionContext);
    const { setLinkSource } = useContext(LinkContext);
    const [translation, setTranslation] = useState(null);


    const router = useRouter();

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
        setSubmitForm(false);
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



    const handleLanguageChange = async (event) => {
        const selectedLanguage = event.target.value;
        setLanguages(selectedLanguage);
        await fetchGenerativeAi(selectedLanguage);
        await fetchData(selectedLanguage);
        await fetchInterfaceComponent(selectedLanguage);
        router.push({
            pathname: router.pathname,
            query: { languages: selectedLanguage },
        });
    };


    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const translatedData = await fetchInterfaceComponent(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);

    return (
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
            <div className={styles.btnContainer}>
                <div className={styles.btnWrapper}>
                    <Link className={styles.link} href="/">
                        <button onClick={() => handleResetPathValue(null)} className={styles.homeBtn}>
                            <Image className={styles.icon} alt="house" src="/static/house-light.svg" width={24} height={24} />
                            {translation && translation.data.attributes.home}
                        </button>
                    </Link>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.languageBtn}>
                        <Image className={styles.icon} alt="earth" src="/static/language-light.svg" width={24} height={24} />
                        {languages === "en" ? <Image src="/static/united-kingdom.png" alt="england flag" width={20} height={20} /> : null}
                        {languages === "fr-FR" ? <Image src="/static/france.png" alt="france flag" width={20} height={20} /> : null}
                        {languages === "nl" ? <Image src="/static/netherlands.png" alt="netherlands flag" width={20} height={20} /> : null}
                        <select
                            className={styles.select}
                            name="languages"
                            onChange={handleLanguageChange}
                            value={languages}
                        >
                            <option value="en" defaultValue="en">
                                EN
                            </option>
                            <option value="fr-FR">
                                FR
                            </option>
                            <option value="nl">
                                NL
                            </option>
                        </select>
                    </button>
                </div>
                <div className={styles.btnWrapper}></div>

                <button className={styles.helpBtn}>
                    <Image className={styles.icon} alt="question mark" src="/static/question-light.svg" width={24} height={24} />
                    {translation && translation.data.attributes.help}
                </button>
            </div>
        </div>
    )
}

export default Header;