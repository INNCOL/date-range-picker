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
        font-weight: bold;
        background-color: darkgray;
        color: white;
        border-bottom-left-radius: 1rem;
        border-top-left-radius: 1rem;
    `}

    ${({ isEnd }) => isEnd && `
        font-weight: bold;
        background-color: darkgray;
        color: white;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
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
