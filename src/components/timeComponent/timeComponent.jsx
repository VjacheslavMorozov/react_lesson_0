import React from "react";
import styles from "./timeComponent.scss"

class TimeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className={styles.clock_block}>
                {this.props.currentTime}
            </div>
        )
    }
}


export default TimeComponent;