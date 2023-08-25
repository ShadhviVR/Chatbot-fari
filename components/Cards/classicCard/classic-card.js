import styles from '../imageTextCard/ImageTextCard.module.css';
import Image from 'next/image';
import cls from 'classnames';
import { useRouter } from 'next/router';

const ImageCard = ({
    handleSelectedInput,
    handlePathValueClick,
    handleSelectedOutput,
    selectedInputType,
    task,
    selectedOutputType }) => {

    const router = useRouter();

    const handleInputOutputClick = (event) => {
        event.stopPropagation();
        if (handleSelectedInput) {
            handleSelectedInput();
        } else if (handleSelectedOutput) {
            handleSelectedOutput();
        }
    }

    const iconContainerClasses = cls(styles.iconContainer, {
        [styles.selectedInput]: selectedInputType,
        [styles.selectedOutput]: selectedOutputType
    });

    return (
        <div onClick={handleSelectedInput} className={styles.container} >
            <div onClick={handlePathValueClick} className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                
                    <h3 className={styles.exampleParagraph}>Classic Chatbot</h3>
                    <p className={styles.exampleText}>This chatbot lets you have a conversation and ask any questions</p>
                
                <div className={styles.secondColorDiv}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/chat.svg"
                        alt="Fox in the show" width={320} height={149} />
                </div>
            </div>
        </div>
    )
}


export default ImageCard;
