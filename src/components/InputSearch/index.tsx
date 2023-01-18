import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    defaultValue: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputSearch = ({ defaultValue, onchange }: Props) => {

    return (
        <>
            <Typography variant="subtitle2" gutterBottom>Filter by keywords</Typography>
            <TextField defaultValue={defaultValue} autoComplete="off" variant="outlined" onChange={onchange} InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }} />
        </>
    );
};

export default InputSearch;
