import React from "react";
import styled from "@emotion/styled";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";

interface DayProps extends MenuItemProps {
    isStart?: boolean;
    isEnd?: boolean;
    isInRange?: boolean | null;
    isToday?: boolean;
}

export const Day = styled(MenuItem) <DayProps>`
  padding: 0.75rem 0;
  justify-content: center;
  border-radius: 0;
  transition: background-color 0.2s ease, color 0.2s ease;

  ${({ isToday }) =>
        isToday &&
        `
    position: relative;
    font-weight: bold;
    border: 1px solid #2196f3;
    color: #2196f3;
    background-color: #e3f2fd;
  `}

  ${({ isInRange }) =>
        isInRange &&
        `
    background-color: #cfd8dc;
    color: black;
  `}

  ${({ isStart }) =>
        isStart &&
        `
    background-color: #455a64;
    color: white;
    font-weight: bold;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  `}

  ${({ isEnd }) =>
        isEnd &&
        `
    background-color: #455a64;
    color: white;
    font-weight: bold;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  `}

  ${({ isStart, isEnd }) =>
        isStart && isEnd &&
        `
    border-radius: 1rem !important;
  `}

  &:hover {
    background-color: #e3f2fd;
    color: #0d47a1;
  }

  &[disabled] {
    color: #bdbdbd;
    pointer-events: none;
    background-color: transparent;
  }
`;
