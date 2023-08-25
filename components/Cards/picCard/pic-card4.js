import styles from '../imageTextCard/ImageTextCard.module.css';
import Image from 'next/image';
import cls from 'classnames';


const ImageTextCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick }) => {


    return (
        <div onClick={handleSelectedInput} >
            <div onClick={handlePathValueClick} className={cls({ [styles.selected]: selectedInputType })}>
                
                <div>
                    <Image
                        priority={true}
                        className={styles.images}
                        src="https://source.unsplash.com/dqXiw7nCb9Q"
                        alt="Building" width={320} height={149} />
                </div>
            </div>
        </div>
    )
}

export default ImageTextCard;