import React from 'react';
import Image from 'next/image';

const MediaComponent = React.forwardRef((props, ref) => {
    const { src, alt, ...rest } = props;

    if (src?.endsWith(".mp4")) {
        return (
            <video ref={ref} {...rest}>
                <source src={src} type="video/mp4" />
            </video>
        );
    }

    if (src?.endsWith(".gltf") || src?.endsWith(".glb")) {
        return (
            <model-viewer
                src={src}
                alt={alt}
                {...rest}
                style={{ width: "100%", height: "100%" }}
            />
        );
    }

    return <Image ref={ref} src={src} alt={alt} {...rest} />;
});

export default MediaComponent;