import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});


const IncidentContact = (props) => {
    const { formatMessage: f } = useIntl();

    const {
        classes,
        handleContactDetailsChange,
        contactDetials,
        formErrors
    } = props;

    const handlePhoneNumberInput = (update, newValue) => {
        if(!isNaN(newValue) && newValue.length<11){
            handleContactDetailsChange(update)
        }
    }

    return (
        <form className={classes.container} noValidate autoComplete="off">

            <Grid container>

                <Grid item xs={8}>
                    <TextField
                        id="contactName"
                        label={f({id:"eclk.incident.management.report.incidents.contact.name", defaultMessage:"Name" })}
                        autoFocus
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.name}
                        // onChange={(e) => { handleContactDetailsChange({...contactDetials, name:e.target.value}) }}
                        onChange={e => {
                            handleContactDetailsChange({...contactDetials, name:e.target.value});
                            formErrors.incidentNameErrorMsg = null;
                          }}
                        className={classes.textField}
                        margin="normal"
                        helperText={formErrors.incidentNameErrorMsg || ""}
                        error={formErrors.incidentNameErrorMsg ? true : false}
                        
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                {/* <Grid item xs={8}>
                    <TextField
                        id="contactMobile"
                        label={f({id:"eclk.incident.management.report.incidents.contact.mobile", defaultMessage:"Mobile"})}
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.mobile}
                        // onChange={(e) => { handleContactDetailsChange({ ...contactDetials, mobile:e.target.value}) }}
                        onChange={(e) => { handlePhoneNumberInput({ ...contactDetials, mobile:e.target.value}, e.target.value) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}></Grid> */}

                <Grid item xs={8}>
                    <TextField
                        id="contactLandline"
                        label={f({id:"eclk.incident.management.report.incidents.contact.mobile", defaultMessage:"Primary contact number / Mobile number*"})}
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.phone}
                        onChange={e => {
                            handlePhoneNumberInput({ ...contactDetials, phone:e.target.value}, e.target.value);
                            formErrors.incidentContactErrorMsg = null;
                          }}
                        // onChange={(e) => { handlePhoneNumberInput({ ...contactDetials, phone:e.target.value}, e.target.value)}}
                        className={classes.textField}
                        margin="normal"
                        type="number"
                        helperText={formErrors.incidentContactErrorMsg || ""}
                        error={formErrors.incidentContactErrorMsg ? true : false}
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={8}>
                    <TextField
                        id="contactEmail"
                        label={f({id:"eclk.incident.management.report.incidents.contact.email", defaultMessage:"Email"})}
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.email}
                        type="email"
                        onChange={(e) => { handleContactDetailsChange({...contactDetials, email:e.target.value}) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                

            </Grid>

        </form>
    );
}

IncidentContact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncidentContact);
