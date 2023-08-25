import styles from './ImageTextCard.module.css';
import Image from 'next/image';
import cls from 'classnames';


const ImageTextCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick }) => {


    return (
        <div onClick={handleSelectedInput} className={styles.container} >
            <div onClick={handlePathValueClick} className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                
                    <h3 className={styles.exampleParagraph}>Image Chatbot</h3>
                    <p className={styles.exampleText}>Ask any questions about an image that you chose</p>
                
                <div className={styles.secondColorDiv}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/image.svg"
                        alt="Fox in the show" width={320} height={149} />
                </div>
            </div>
        </div>
    )
}

export default ImageTextCard;