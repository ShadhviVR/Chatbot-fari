import React from 'react';
import styles from './pdf.module.css';
import Image from 'next/image';
import cls from 'classnames';

const PdfPage = ({ handleSelectedInput, selectedInputType, handlePathValueClick, title, category }) => {
    return (
        <div onClick={handleSelectedInput} className={styles.container}>
            <div onClick={handlePathValueClick} className={cls(styles.iconContainers, { [styles.selected]: selectedInputType })}>
                <h3 className={styles.exampleParagraph}>{title}</h3>
                <p className={styles.exampleText}>{category}</p>
                <div className={styles.secondColorDivs}>
                    <Image priority={true} className={styles.image} src="/static/pdf.svg" alt="pdf" width={320} height={149} />
                </div>
            </div>
        </div>
    );
};

export default PdfPage;
