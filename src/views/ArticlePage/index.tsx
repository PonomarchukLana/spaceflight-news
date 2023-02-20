import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getArticleById } from "./articleByIdSlice";
import { useNavigate } from 'react-router-dom'; 
import "./styles.scss";

const BackButton = styled(Button)({
    textTransform: "none",
    color: "rgba(0, 0, 0, 0.87)",
});

const ArticlePage = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.articleByIdSlice.data);
    const dataStatus = useAppSelector(state => state.articleByIdSlice.status);
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getArticleById({ id: +id }));
        }
    }, []);

    return (
        <>
            {dataStatus == "fulfilled" &&
                <Container maxWidth="xl" className="article-page__container">
                    <div className="article-page__back">
                        <div style={{backgroundImage: `url(${data?.imageUrl})`}} />
                    </div>
                    <Box className="article-page__content-wrapp">
                        <Paper className="article-page__content">
                            <Typography gutterBottom variant="h5" component="h1" align="center">
                                {data?.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {data?.summary}
                            </Typography>
                        </Paper>
                    </Box>
                    <CardActions className="article-page__back-btn">
                        <BackButton variant="text" size="small" onClick={() => navigate("/")}>Back to homepage</BackButton>
                    </CardActions>
                </Container>}
        </>
    );
};

export default ArticlePage;
