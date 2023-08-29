import styles from '../pdf1/pdf.module.css';
import Loading from '../../../components/Loading/loading';
import { useEffect, useState } from 'react';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';
import ChatInterface from '../chatbotpdf2';

function Pdf2({ languages }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [translatedData, setTranslatedData] = useState(null);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const response = await fetchData(languages);
            setResponseData(response.data);
            const translationData = await fetchGenerativeAi(languages);
            setTranslatedData(translationData.data);
        };
        fetchDataAndUpdateState();
    }, [languages]);


    return (
        <>
            {loading ? (<Loading />) : (
                <div className={styles.container}>
                    <h3 className={styles.stepHeader}>
                        {translatedData && translatedData.attributes.step3_title}
                    </h3>
                    <p className={styles.stepParagraph}>
                        {translatedData && translatedData.attributes.step3_description}
                    </p>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>This is the pdf you selected</p>
                            <iframe className={styles.selectedImage} src="https://arxiv.org/pdf/2307.10171.pdf" locale={false}/>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>Ask any question about this pdf</p>
                            <ChatInterface/>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Pdf2;