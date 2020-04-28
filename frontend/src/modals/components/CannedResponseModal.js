import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// react-redux hooks
import { useDispatch, useSelector } from 'react-redux'

import { hideModal } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'
import { TextField } from '@material-ui/core';

import { getCannedResponses } from '../../api/incident'

const hourlyResponseTimes = []
for (var i = 1; i < 24; i++) {
    hourlyResponseTimes.push(i);
}

const onSubmitClick = (dispatch, incidentId, responseId) => {
    dispatch(fetchUpdateWorkflow(incidentId, "send_canned_response", {
        id: responseId
    } ));
    dispatch(hideModal());
}

const CannedResponseModal = (props) => {
    const [selectedResponse, setSelectedResponse] = useState("");
    const [responseData, setResponseData] = useState({
        byIds:[],
        allIds:[]
    });
    const {cannedResponses} = useSelector(store=>store.shared)
    const dispatch = useDispatch();
    useEffect(()=>{
        setResponseData(cannedResponses)
    },[])

    const loadData = async () => {
        setResponseData((await getCannedResponses()).data)
    }

    return (
        <div>
            <DialogTitle id="form-dialog-title">Canned response</DialogTitle>
            <DialogContent style={{ marginTop: 10 }}>

                <InputLabel htmlFor="selector"> Selected response: </InputLabel>
                <Select
                    style={{width:300}}
                    value={selectedResponse}
                    name="response"
                    fullWidth
                    displayEmpty
                    onChange={(e) => { setSelectedResponse(e.target.value) }}
                    inputProps={{
                        name: 'selector',
                        id: 'selector',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>

                    {responseData.allIds.map((responseId, index) => {
                        return (
                        <MenuItem key={responseId} value={responseId}>
                            {responseData.byIds[responseId].title}
                        </MenuItem>)
                    })}
                </Select>

                <DialogContentText style={{ marginTop: 20 }}>
                    Message:  
                    {responseData.byIds[selectedResponse]?
                    <i> "{responseData.byIds[selectedResponse].message}"</i>:
                    " No message selected"}
                </DialogContentText>


            </DialogContent>
            <DialogActions>
                <Button onClick={() => { dispatch(hideModal()) }} color="secondary">
                    Close
                </Button>
                <Button
                    onClick={() => onSubmitClick(dispatch, props.activeIncident.id, selectedResponse)}
                    color="primary">
                    Send
                </Button>
            </DialogActions>
        </div>
    );
}

export default CannedResponseModal;
