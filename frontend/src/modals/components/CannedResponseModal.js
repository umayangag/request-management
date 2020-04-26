import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// react-redux hooks
import { useDispatch } from 'react-redux'

import { hideModal } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'
import { TextField } from '@material-ui/core';

const hourlyResponseTimes = []
for (var i = 1; i < 24; i++) {
    hourlyResponseTimes.push(i);
}

const onSubmitClick = (dispatch, incidentId, comment, responseTime) => {

    dispatch(hideModal());
}

const CannedResponseModal = (props) => {
    const [response, setResponse] = useState("");
    const [responseTime, setResponseTime] = useState(null);

    const dispatch = useDispatch();

    return (
        <div>
            <DialogTitle id="form-dialog-title">Canned response</DialogTitle>
            <DialogContent style={{ marginTop: 10 }}>

                <InputLabel htmlFor="selector"> Selected response: </InputLabel>
                <Select
                    value={response}
                    name="response"
                    fullWidth
                    displayEmpty
                    onChange={(e) => { setResponse(e.target.value) }}
                    inputProps={{
                        name: 'selector',
                        id: 'selector',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>

                    {hourlyResponseTimes.map((value, index) => {
                        return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                    })}
                </Select>

                <DialogContentText style={{ marginTop: 20 }}>
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>


            </DialogContent>
            <DialogActions>
                <Button onClick={() => { dispatch(hideModal()) }} color="secondary">
                    Close
                </Button>
                <Button
                    onClick={() => onSubmitClick(dispatch, props.incidentId, "", responseTime)}
                    color="primary">
                    Send
                </Button>
            </DialogActions>
        </div>
    );
}

export default CannedResponseModal;
