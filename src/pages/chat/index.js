import styles from '../headphone/ImageChat.module.css';
import Loading from '../../../components/Loading/loading';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchData, fetchGenerativeAi, fetchChat } from '../../../api/axios';
import ChatInterface from '../chatbot';

function Color({ languages }) {

    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const [translatedData, setTranslatedData] = useState(null);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            try {
                const [response, translationData, chatData] = await Promise.all([
                    fetchData(languages),
                    fetchGenerativeAi(languages),
                    fetchChat(),
                ]);
    
                setResponseData(response.data);
                setTranslatedData(translationData.data);
                setChat(chatData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
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
                            <Loading />
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>Type Anything</p>
                           <ChatInterface/>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Color;