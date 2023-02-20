import React from "react";
import moment from 'moment'
import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useNavigate } from 'react-router-dom'; 
import "./styles.scss";

const MoreButton = styled(Button)({
    textTransform: "none",
    color: "rgba(0, 0, 0, 0.87)",
});

type Props = {
    id: number,
    keywords: [] | string[],
    img: string;
    date: string;
    title: string;
    summary: string;
};

const PreviewCard = ({ id, keywords, img, date, title, summary }: Props) => {

    const navigate = useNavigate();

    const highlightMatchingText = (text: string, textToMatch: string[]): JSX.Element[] => {
        const matchRegex = RegExp(textToMatch.join('|'), "ig");
        const matches = [...text.matchAll(matchRegex)];
        return text.split(matchRegex).map((nonBoldText, index, arr) => (
            <React.Fragment key={index}>
                {nonBoldText}
                {index + 1 !== arr.length && <mark style={{ background: "rgba(255, 246, 25, 0.63)" }}>{matches[index]}</mark>}
            </React.Fragment>
        ));
    };

    return (
        <Card className="card__wrapper" onClick={() => navigate(`/article/${id}`)}>
            <div>
                <CardMedia
                    component="img"
                    alt="img"
                    height="140"
                    image={img}
                />
                <CardContent>
                    <Typography className="card__date" gutterBottom variant="body2" component="div">
                        <CalendarTodayOutlinedIcon />
                        {moment(date).format("MMMM Do, YYYY")}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                        {keywords.length > 0 ? highlightMatchingText(title, keywords) : title}
                    </Typography>
                    <Typography className="card__hidden-text" variant="body2" color="text.secondary">
                        {keywords.length > 0 ? highlightMatchingText(summary, keywords) : summary}
                    </Typography>
                </CardContent>
            </div>
            <CardActions>
                <MoreButton variant="text" size="small">Read More</MoreButton>
            </CardActions>
        </Card>
    );
}

export default PreviewCard;
