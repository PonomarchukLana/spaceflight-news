import React, { useState, useEffect } from "react";
import localStorageState from "../../services/localStorageState";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import InputSearch from "src/components/InputSearch";
import PreviewCard from "../../features/PreviewCard";
import { getAllArticles, filteredArticles } from "./articlesSlice";
import "./styles.scss";

let requestValue: string;
const HomePage = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.articlesSlice.data);
    const dataStatus = useAppSelector(state => state.articlesSlice.status);

    const { setStorage, getStorage, clearStorage } = localStorageState;
    const keywordsStorage = getStorage('keywords');

    const [keywords, setKeywords] = useState<[] | string[]>(keywordsStorage ? keywordsStorage.split(" ") : []);

    useEffect(() => {
        if (typeof keywordsStorage === "string") {
            dispatch(filteredArticles({ queryParams: keywordsStorage?.split(" ") }));
        } else {
            dispatch(getAllArticles());
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length == 0) {
            clearStorage();
            setKeywords([]);
        } else {
            setTimeout(() => {
                const arr = e.target.value.replace(/  +/g, " ").split(" ");
                const params = arr.filter(i => i != "");

                if ((params.length >= 1) && (requestValue != (e.target.value.trim()))) {
                    dispatch(filteredArticles({ queryParams: params }));
                    setKeywords(params);
                    setStorage('keywords', params.join(" "));
                    requestValue = e.target.value.trim();
                };
            }, 2000);
        };
    };

    return (
        <Container className="home-page__container" maxWidth="xl">
            <InputSearch defaultValue={keywords.join(" ")} onchange={handleSearch} />
            {dataStatus == "fulfilled" ?
                <>
                    <Typography variant="subtitle2" component="div" className="home-page__count" gutterBottom>Results: {data.length}</Typography>
                    <Grid container alignItems="stretch" className="home-page__cards-section">
                        {data.map(i =>
                            <Grid className="home-page__cards" item xs={12} sm={6} md={4} key={i.title}>
                                <PreviewCard id={i.id} keywords={keywords} img={i.imageUrl} date={i.publishedAt} title={i.title} summary={i.summary} />
                            </Grid>)}
                    </Grid>
                </>
                :
                <>
                    <Typography variant="subtitle2" component="div" className="home-page__count" gutterBottom style={{ display: "flex" }}>Results: <RotateLeftIcon className="home-page__icon" /></Typography>
                </>}
        </Container>
    );
};

export default HomePage;
