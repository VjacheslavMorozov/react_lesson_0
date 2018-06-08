import React from "react";
import styles from './watch.scss';

import TimeComponent from "../timeComponent/timeComponent";

class Watch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: Date.now()
        };
        this.checkTime = this.checkTime.bind(this);
    }
    checkTime() {
        this.setState({
            time: Date.now()
        });
    };

    componentDidMount() {
        setInterval(this.checkTime, 1000);
    };

    render() {
        return(
            <div className={styles.watch}>
                {console.log(styles)}
                <TimeComponent currentTime = {new Date(this.state.time).getHours()} />
                <span className="delimiter">:</span>
                <TimeComponent currentTime = {new Date(this.state.time).getMinutes()} />
                <span className="delimiter">:</span>
                <TimeComponent currentTime = {new Date(this.state.time).getSeconds()} />
            </div>
            )
    }
}

export default Watch;