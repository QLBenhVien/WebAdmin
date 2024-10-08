import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Controls from './Control';
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from './ActionButton';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: '50%', // Điều chỉnh chiều rộng ở đây
        maxWidth: '600px', // Tùy chỉnh chiều rộng tối đa
    },
    titleStyle: {
        fontSize: '2rem',
        marginBottom: theme.spacing(2),
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}));

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    
    return (
        <Dialog 
            open={openPopup} 
            maxWidth='md' 
            classes={{ paper: classes.dialogWrapper }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                        variant='h6' 
                        component='div' 
                        style={{ flexGrow: 1 }} 
                        className={classes.titleStyle}
                    >
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color='secondary'
                        onClick={() => setOpenPopup(false)}  
                    >
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
    
}