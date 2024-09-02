import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from "react";
import styles from "./index.module.css"
type Props = {
    initialImageUrl: string
}

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     fetchImage().then((image) => {
    //         setImageUrl(image.url);
    //         setLoading(false);
    //     })
    // }, []);

    const changeImage = async () => {
        setLoading(true)
        const image = await fetchImage()
        setImageUrl(image.url)
        setLoading(false)
    }

    return (
        <div className={styles.page}>
            <button className={styles.button} onClick={changeImage}>他の猫ちゃんも見る</button>
            <div className={styles.frame}>{loading || <img className={styles.img} src={imageUrl} />}</div>
        </div>
    );
}
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return { props: { initialImageUrl: image.url } }
}

type CatImage = {
    url: string
}
const fetchImage = async (): Promise<CatImage> => {
    let url: string = "https://api.thecatapi.com/v1/images/search";
    const res = await fetch(url);
    const cat = await res.json();
    console.log(cat);

    return cat[0];
}
