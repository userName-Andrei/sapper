import React, {FC, useState, useEffect, MouseEvent} from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { restartGame } from '../Main/MainSlice';
import { setMap } from '../FieldArea/FieldAreaSlice';

import styles from './Restart.module.scss';

interface RestartProps {
    isMousePressed: boolean
}

const Restart: FC<RestartProps> = ({isMousePressed}) => {

    const dispatch = useAppDispatch();
    const gameStatus = useAppSelector(({main}) => main.gameStatus);
    const areaSize = useAppSelector(({main}) => main.size);
    const bombsCount = useAppSelector(({main}) => main.bombsCount);
    const [btnClassName, setBtnClassName] = useState<string>('')

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(restartGame());
        dispatch(setMap({size: areaSize, bombsCount}))
    }

    useEffect(() => {
        setBtnClassName(state => {
            return classNames({
                [styles.restartBtn]: true,
                [styles.lose]: gameStatus === 'lose',
                [styles.win]: gameStatus === 'win',
                [styles.wait]: isMousePressed,
            })
        })
    }, [gameStatus, isMousePressed])

    return (
        <button
            type='button'
            className={btnClassName}   //${styles.wait}
            onClick={onClick}
        >
        </button>
    );
};

export default Restart;