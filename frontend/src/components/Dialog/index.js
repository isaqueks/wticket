import React, { useState, useEffect } from 'react';
import CoreDialog from '@mui/joy/Dialog';
import DialogTitle from '@mui/joy/DialogTitle';

function Dialog ({ title, modalOpen, onClose, children }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(modalOpen)
    }, [modalOpen])
    
    const handleClose = () => {
        setOpen(false);
        onClose()
    };

    return (
        <>
            <CoreDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                {children}
            </CoreDialog>
        </>
    );
}

export default Dialog;