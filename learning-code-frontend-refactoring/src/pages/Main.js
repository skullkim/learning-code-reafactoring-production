import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from "styled-components";

const MainBox = styled.main`
  height: 900px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  height: 700px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 500px;
  max-height: 500px;
`;

const Main = () => {
    const [imageUrls, setImageUrls] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/main-page-images`)
            .then(({data: {data}}) => setImageUrls(data))
            .catch(err => err);
    }, []);

    return (
        <>
            <MainBox>
                <ImageBox>
                    {imageUrls && imageUrls.map(({img_url: img}) => (
                        <Image
                            src={`${process.env.REACT_APP_SERVER_ORIGIN}/${img}`}
                            alt="main page image"
                            key={img}
                        />
                    ))}
                </ImageBox>
            </MainBox>
        </>
    );
}

export default Main;