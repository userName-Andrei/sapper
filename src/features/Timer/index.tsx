import React, {FC, memo, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { setGameStatus } from '../Main/MainSlice';

import styles from './Timer.module.scss';

interface TimerProps {
    sec?: boolean,
    min?: boolean
}

const Timer: FC<TimerProps> = ({sec, min}) => {
    const dispatch = useAppDispatch();
    const timeOver = useAppSelector(({main}) => main.timeOver);
    //const [minutes, setMinutes] = useState<number>(timeOver);
    const [seconds, setSeconds] = useState<number>(timeOver * 60);
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const minToArr: number[] = (Math.floor(seconds / 60) < 10 ? '00' + Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60)).split('').map(num => +num);
    const secToArr: number[] = ((seconds % 60) < 10 ? '00' + seconds % 60 : '0' + seconds % 60).split('').map(num => +num);
    const gameStatus = useAppSelector(({main}) => main.gameStatus)
    
    
    useEffect(() => {
        if (isCounting) {
            const timer = setInterval(() => {
                setSeconds(state => state >= 1 ? state - 1 : 0)
            }, 1000);

            return () => {
                clearInterval(timer)
            }
        }
    }, [isCounting])

    useEffect(() => {
        if (seconds === 0) {
            dispatch(setGameStatus('lose'))
        }
    }, [seconds])

    useEffect(() => {
        switch(gameStatus) {
            case 'lose':
                setIsCounting(false);
                break;
            case 'win':
                setIsCounting(false);
                break;
            case 'playing':
                setIsCounting(true);
                break;
            case 'restart':
                setSeconds(timeOver * 60);
                setIsCounting(false);
                break;
            default:
                setSeconds(timeOver * 60);
                setIsCounting(true);
        }
    }, [gameStatus])

    const renderMinutes = () => {
        if (min) {
            return minToArr.map((item, i) => {
                const minutesClass = classNames({
                    [styles.item]: true,
                    [styles.zero]: item === 0,
                    [styles.one]: item === 1,
                    [styles.two]: item === 2,
                    [styles.three]: item === 3,
                    [styles.four]: item === 4,
                    [styles.five]: item === 5,
                    [styles.six]: item === 6,
                    [styles.seven]: item === 7,
                    [styles.eight]: item === 8,
                    [styles.nine]: item === 9,
                });
    
                return <li key={i} className={minutesClass}></li>
            })
        }

        if (sec) {
            return secToArr.map((item, i) => {
                const minutesClass = classNames({
                    [styles.item]: true,
                    [styles.zero]: item === 0,
                    [styles.one]: item === 1,
                    [styles.two]: item === 2,
                    [styles.three]: item === 3,
                    [styles.four]: item === 4,
                    [styles.five]: item === 5,
                    [styles.six]: item === 6,
                    [styles.seven]: item === 7,
                    [styles.eight]: item === 8,
                    [styles.nine]: item === 9,
                });
    
                return <li key={i} className={minutesClass}></li>
            })
        }
    }

    return (
        <ul className={styles.timer}>
            {renderMinutes()}
        </ul>
    );
};

export default memo(Timer);