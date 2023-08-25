import styles from '../../styles/ImagePage.module.css';
import Camera from '../../../components/camera/camera';
import { useState, useContext, useEffect, React } from 'react';
import Image from 'next/image';
import { InputTypeContext } from '../../../context/InputTypeContext';
import Loading from '../../../components/Loading/loading';
import { useRouter } from 'next/router';
import usePathValue from '../../../handlers/path_handler';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';
import Headphone from '../../../components/Cards/picCard/pic-card1';
import Tortoise from '../../../components/Cards/picCard/pic-card2';
import Color from '../../../components/Cards/picCard/pic-card3';
import Building from '../../../components/Cards/picCard/pic-card4';


const ImagePage = ({ setNextPageHref, languages }) => {

    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [translation, setTranslation] = useState(null);
    const [data, setData] = useState(null);

    const { selectedInputType, setSelectedInputType } = useContext(InputTypeContext);

    const { handleGetPathValue } = usePathValue();

    const router = useRouter();

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };

    const { handleGetValue } = usePathValue();

    const handleSelectedInput = (inputType) => {
      setSelectedInputType((prevInputType) => (prevInputType === inputType ? null : inputType));
    };
  
    const pathValues = ['/headphone', '/tortoise', '/color', '/building'];
  
    const handlePathValueClick = (index) => {
    const selectedPathValue = pathValues[index];
    handleGetPathValue(selectedPathValue);
    setNextPageHref(selectedPathValue);
    setSelectedInputType(null);
  };
    const handleImageUrl = async (imageUrl, e) => {
        setSelectedImage(imageUrl);
        e.preventDefault();
       
    };
    
    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const data = await fetchData(languages);
            setData(data);
            const translatedData = await fetchGenerativeAi(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={styles.container}>
                    <div className={styles.headingInfo}>
                        <h2 className={styles.header}>
                            {translation && translation.data.attributes.step2_image_title}
                        </h2>
                        <p className={styles.inputParagraph}>
                            {translation && translation.data.attributes.step2_image_description}
                        </p>
                    </div>
                    {cameraOpen ? (<Camera
                        handleImageUrl={handleImageUrl}
                    />) : (
                        <>
                            <div className={styles.box}>
          <Headphone
            handleSelectedInput={() => handleSelectedInput('headphone')}
            selectedInputType={selectedInputType === 'headphone'}
            handlePathValueClick={() => handlePathValueClick(0)}
          />
          <Tortoise
            handleSelectedInput={() => handleSelectedInput('tortoise')}
            selectedInputType={selectedInputType === 'tortoise'}
            handlePathValueClick={() => handlePathValueClick(1)}
          />
          <Color
            handleSelectedInput={() => handleSelectedInput('color')}
            selectedInputType={selectedInputType === 'color'}
            handlePathValueClick={() => handlePathValueClick(2)}
          />
          <Building
            handleSelectedInput={() => handleSelectedInput('building')}
            selectedInputType={selectedInputType === 'building'}
            handlePathValueClick={() => handlePathValueClick(3)}
          />
        </div>
            <p className={styles.middleParagraph}>Or</p>
            <div className={styles.cameraDivWrapper}>
                <div className={styles.cameraDiv}>
                    <button className={styles.cameraBtn} onClick={handleCameraOpen}><Image src="/static/camera.svg" alt="camera" width={60} height={55} /></button>
                    <p className={styles.cameraPar}>Click here to take a picture using webcam</p>
                </div>
            </div>
        </>
        )}
        </div>
        )}
        </>

    )
}

export default ImagePage;