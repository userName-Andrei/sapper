import React, {useState, useCallback} from 'react';
import Restart from '../Restart';
import FieldArea from '../FieldArea';
import Timer from '../Timer';

import styles from './Main.module.scss';

const Main = () => {
    const [isLeftBtnPressed, setIsLeftBtnPressed] = useState<boolean>(false);

    const onMouseDown = useCallback(() => {
        setIsLeftBtnPressed(state => true)
    }, []) ;

    const onMouseUp = useCallback(() => {
        setIsLeftBtnPressed(state => false)
    }, []) ;

    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <Timer min />
                <Restart isMousePressed={isLeftBtnPressed} />
                <Timer sec />
            </div>
            <div className={styles.bottom}>
                <FieldArea
                    onMouseDown={onMouseDown} 
                    onMouseUp={onMouseUp}
                />
            </div>
        </div>
    );
};

export default Main;