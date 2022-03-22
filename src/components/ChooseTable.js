import React, { useState } from 'react';
import BuildTable from './BuildTable';
import Verifies from './Verifies';
import { connect } from 'react-redux';

let chosen = <BuildTable />;

function ChooseTable(props) {
    let forceUpdate = useForceUpdate();
    let choice = "Default";
    const change = () => {
        let dd = document.getElementById("dropdown");
        choice = dd.value;
        console.log("Current Table", choice);
        if(choice == "Default")
        {
            chosen = <BuildTable />;
            forceUpdate();
        }
        else
        {
            chosen = <Verifies />;
            forceUpdate();
        }
    }
    return (
        <div>
            <select id="dropdown" onChange={change}>
                <option>Default</option>
                <option>Verifies</option>
            </select>
            {chosen}
        </div>
    )
}

function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, { })(ChooseTable);