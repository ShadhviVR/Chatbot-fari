import Head from 'next/head';
import React from 'react';
import styles from '../../styles/Home.module.css';
import Pdf1 from '../../../components/Cards/pdfCard/pdf-card1';
import Pdf2 from '../../../components/Cards/pdfCard/pdf-card2';
import Pdf3 from '../../../components/Cards/pdfCard/pdf-card3';
import Pdf4 from '../../../components/Cards/pdfCard/pdf-card4';
import { useContext, useEffect, useState } from 'react';
import { InputTypeContext } from '../../../context/InputTypeContext';
import usePathValue from '../../../handlers/path_handler';
import { fetchGenerativeAi } from '../../../api/axios';

export default function PdfPage({ setNextPageHref, languages }) {

    const [translation, setTranslation] = useState(null);
    const { selectedInputType, setSelectedInputType } = useContext(InputTypeContext);
    const { handleGetPathValue } = usePathValue();

    const pathValues = ['/pdf1', '/pdf2', '/pdf3', '/pdf4'];
  
    const handleSelectedInput = (inputType) => {
      setSelectedInputType((prevInputType) => (prevInputType === inputType ? null : inputType));
    };
  
  
    const handlePathValueClick = (index) => {
    const selectedPathValue = pathValues[index];
    handleGetPathValue(selectedPathValue);
    setNextPageHref(selectedPathValue);
    setSelectedInputType(null);
  };
  
  
  
    useEffect(() => {
  
      const fetchDataAndUpdateState = async () => {
        const response = await fetchGenerativeAi(languages);
        setTranslation(response?.data);
      };
  
      fetchDataAndUpdateState();
    }, [languages]);
  
  
    return (
      <>
        <div className={styles.container}>
          <div className={styles.headingInfo}>
            <h2 className={styles.header}>
              {translation && translation.attributes.step2_pdf_title}
            </h2>
            <p className={styles.inputParagraph}>
              {translation && translation.attributes.step2_pdf_description}
            </p>
          </div>
          <div className={styles.box}>
            <Pdf1
              handleSelectedInput={() => handleSelectedInput('pdf1')}
              selectedInputType={selectedInputType === 'pdf1'}
              handlePathValueClick={() => handlePathValueClick(0)}
            />
            <Pdf2
              handleSelectedInput={() => handleSelectedInput('pdf2')}
              selectedInputType={selectedInputType === 'pdf2'}
              handlePathValueClick={() => handlePathValueClick(1)}
            />
            <Pdf3
              handleSelectedInput={() => handleSelectedInput('pdf3')}
              selectedInputType={selectedInputType === 'pdf3'}
              handlePathValueClick={() => handlePathValueClick(2)}
            />
            <Pdf4
              handleSelectedInput={() => handleSelectedInput('pdf4')}
              selectedInputType={selectedInputType === 'pdf4'}
              handlePathValueClick={() => handlePathValueClick(3)}
            />
          </div>
        </div>
      </>
    )
  };