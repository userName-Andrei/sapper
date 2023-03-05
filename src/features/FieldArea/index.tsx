import React, {useEffect, useState, useMemo, MouseEvent, FC, memo} from 'react';
import FieldItem from '../FieldItem';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MINE } from './constants';
import { setMap } from './FieldAreaSlice';
import { Mask } from './types';
import { openEmptyCells } from './utils';
import { setGameStatus } from '../Main/MainSlice';

import styles from './FieldArea.module.scss';

interface FieldAreaProps {
    onMouseDown: () => void,
    onMouseUp: () => void
}

const maskToView: Record<Mask, string> = {
    [Mask.Open]: '',
    [Mask.Close]: 'cell empty',
    [Mask.Flag]: 'cell flag',
    [Mask.Question]: 'cell question',
    [Mask.BombActive]: 'cell bomb_active'
}

const FieldArea: FC<FieldAreaProps> = ({onMouseDown, onMouseUp}) => {

    const dispatch = useAppDispatch();
    const areaSize = useAppSelector(({main}) => main.size);
    const bombsCount = useAppSelector(({main}) => main.bombsCount);
    const map = useAppSelector(({field}) => field.map);
    const [maskMap, setMaskMap] = useState<Mask[]>(new Array(areaSize * areaSize).fill(Mask.Close));
    const [firstClick, setFirstClick] = useState<boolean>(true);
    const gameStatus = useAppSelector(({main}) => main.gameStatus);
    const isWin = useMemo(() => {
        if (map.length && maskMap.length) {
            return map.every((cell, i) => {
                return (cell !== MINE && maskMap[i] === Mask.Open) || 
                       (cell === MINE && maskMap[i] !== Mask.Open)
            })
        } else {
            return false
        }
    }, [map, maskMap]);

    useEffect(() => {
        dispatch(setMap({size: areaSize, bombsCount}));
    }, [])

    useEffect(() => {
        if (isWin) dispatch(setGameStatus('win'))
    }, [isWin])

    useEffect(() => {
        if (gameStatus === 'restart') {
            setMaskMap(state => state.map(() => Mask.Close))
            setFirstClick(state => true)
        }
    }, [gameStatus])

    const createClassName = (index: number) => {
        if (maskMap[index] !== Mask.Open) {
            return maskToView[maskMap[index]]
        }

        if (map[index] === MINE) {
            return 'cell bomb'
        }

        return classNames({
            'cell': true,
            'empty_active': map[index] === 0,
            'one': map[index] === 1,
            'two': map[index] === 2,
            'three': map[index] === 3,
            'four': map[index] === 4,
            'five': map[index] === 5,
            'six': map[index] === 6,
            'seven': map[index] === 7,
            'eight': map[index] === 8
        })
    }

    const onClick = (e: MouseEvent<HTMLButtonElement>, index: number) => {

        if (maskMap[index] === Mask.Open) return;

        openEmptyCells(areaSize, index, map, maskMap, setMaskMap);

        if (map[index] === MINE && firstClick) {
            dispatch(setMap({size: areaSize, bombsCount}));
        }

        if (map[index] === MINE && !firstClick) {
            dispatch(setGameStatus('lose'))
            setMaskMap(state => state.map((item, i) => {
                if (i === index) {
                    return Mask.BombActive
                } 
                
                if (map[i] === MINE) {
                    return Mask.Open
                }

                return item
            }))
        }

        setFirstClick(false)
    }

    const onContextMenu = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (gameStatus !== 'playing' || 
            maskMap[index] === Mask.Open || 
            maskMap[index] === Mask.BombActive
        ) return

        switch(maskMap[index]) {
            case Mask.Close:
                maskMap[index] = Mask.Flag;
                break;
            case Mask.Flag:
                maskMap[index] = Mask.Question;
                break;
            default: 
                maskMap[index] = Mask.Close;
        }

        setMaskMap(state => [...state])
    }

    const renderFieldMap = () => {
        return map.map((_, i) => (
            <FieldItem 
                key={i}
                className={createClassName(i)}
                onClick={(e) => onClick(e, i)}
                onContextMenu={(e) => onContextMenu(e, i)}
            />
        ))
    }

    return (
        <div 
            className={styles.field}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {renderFieldMap()}
        </div>
    );
};

export default memo(FieldArea);