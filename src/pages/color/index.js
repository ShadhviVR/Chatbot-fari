import styles from '../headphone/ImageChat.module.css';
import Loading from '../../../components/Loading/loading';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';
import ChatInterface from '../chatbot';

function Color({ languages }) {

    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
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
                            <p className={styles.inputHeader}>This is the image you selected</p>
                            <Image
                                className={styles.selectedImage}
                                src="https://source.unsplash.com/D5nh6mCW52c"
                                alt="color"
                                width={500}
                                height={500} />
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>Ask any question about this image</p>
                           <ChatInterface/>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Color;