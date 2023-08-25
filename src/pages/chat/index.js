import styles from './chat.module.css';
import Loading from '../../../components/Loading/loading';
import { useEffect, useState } from 'react';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';
import ChatInterface from '../chatbot';


function Chat({ languages }) {

    const [loading, setLoading] = useState(false);
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
                            <div className={styles.selectedImage}>   
                                <p className={styles.inputHeader}>Type anything</p>

                                <ChatInterface/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Chat;