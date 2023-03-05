import React, {FC, useEffect, useState, MouseEvent} from 'react';
import { useAppSelector } from '../../app/hooks';

import './FieldItemSlice.scss';

interface FieldItemProps {
    className: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
    onContextMenu?: (e: MouseEvent<HTMLButtonElement>) => void
}

const FieldItem: FC<FieldItemProps> = ({
    className,
    onClick,
    onContextMenu
}) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const gameStatus = useAppSelector(({main}) => main.gameStatus);

    useEffect(() => {
        if (gameStatus === 'lose' || gameStatus === 'win') {
            setIsDisabled(state => true)
        }
        if (gameStatus === 'playing') {
            setIsDisabled(state => false)
        }
    }, [gameStatus])

    return (
        <button
            className={className}
            onClick={onClick}
            onContextMenu={onContextMenu}
            disabled={isDisabled}
        >
        </button>
    );
};

export default FieldItem;