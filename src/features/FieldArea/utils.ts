import { MINE } from "./constants";
import { Mask } from "./types";

export const createMap = (size: number, bombsCount: number): number[] => {
    const cellsCount:number = size * size;
    let map:number[] = new Array(cellsCount).fill(0);

    for(let i = 0; i < bombsCount;) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (map[getIndex(x, y, size)] === MINE) continue;

        map[getIndex(x, y, size)] = MINE;

        i++;

        map = setCountMineNearby(x, y, size, map);
    }
                   
    return map;
}

const setCountMineNearby = (row: number, column: number, size: number, map: number[]) => {
    
    for(let x = -1; x <= 1; x++) {
        for(let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0 || map[getIndex(row + x, column + y, size)] === MINE) continue;
            
            if (row + x >= 0 && row + x < size && column + y >= 0 && column + y < size) {
                map[getIndex(row + x, column + y, size)]++;
            }
        }
    }
    
    return map
}

export const openEmptyCells = (
    size: number,
    index: number,
    map: number[],
    mask: Mask[],
    setMask: any,
) => {
    const openedArr: [number, number][] = [];

    function openCell(x: number, y: number) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
            if (mask[getIndex(x, y, size)] === Mask.Open) return;

            openedArr.push([x, y]);
        }
    }

    openCell(getRow(index, size), getColumn(index, size))

    while(openedArr.length) {
        const [x, y] = openedArr.pop()!;

        mask[getIndex(x, y, size)] = Mask.Open

        if (map[getIndex(x, y, size)] !== 0) continue;

        openCell(x + 1, y);
        openCell(x - 1, y);
        openCell(x, y + 1);
        openCell(x, y - 1);
    }

    setMask((state: any) => [...state]);
}

const getIndex = (row: number, column: number, size: number): number => {
    return row * size + column;
}

const getRow = (index: number, size: number): number => {
    return Math.floor(index / size);
}

const getColumn = (index: number, size: number): number => {
    return index % size;
}