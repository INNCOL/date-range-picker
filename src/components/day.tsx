import React from "react";
import styled from "@emotion/styled";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";

interface DayProps extends MenuItemProps {
    isStart?: boolean;
    isEnd?: boolean;
    isInRange?: boolean | null;
}

export const Day = styled(MenuItem) <DayProps>`
    ${({ isStart }) => isStart && `
        font-weight: bold !important;
        background-color: darkgray !important;
        color: white !important;
        border-bottom-left-radius: 1rem !important;
        border-top-left-radius: 1rem !important;
    `}

    ${({ isEnd }) => isEnd && `
        font-weight: bold !important;
        background-color: darkgray !important;
        color: white !important;
        border-top-right-radius: 1rem !important;
        border-bottom-right-radius: 1rem !important;
    `}

    ${({ isInRange }) => isInRange && `
        font-weight: bold;
        background-color: lightgray;
        color: white;
    `}

    &:hover {
        background-color: aliceblue;
        color: black;
    }
`;
