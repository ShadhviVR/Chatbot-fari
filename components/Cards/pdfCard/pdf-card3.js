import styles from '../imageTextCard/ImageTextCard.module.css';
import Image from 'next/image';
import cls from 'classnames';


const ImageTextCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick }) => {


    return (
        <div onClick={handleSelectedInput} className={styles.container} >
            <div onClick={handlePathValueClick} className={cls(styles.iconContainers, { [styles.selected]: selectedInputType })}>
                
                    <h3 className={styles.exampleParagraph}>Robotics</h3>
                    <p className={styles.exampleText}>About robots in today's era</p>
                
                <div className={styles.secondColorDivs}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/pdf.svg"
                        alt="pdf3" width={320} height={149} />
                </div>
            </div>
        </div>
    )
}

export default ImageTextCard;