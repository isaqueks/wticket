import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/joy/IconButton';
import ListItem from '@mui/joy/ListItem';
import ListItemText from '@mui/joy/ListItemText';
import ListItemAvatar from '@mui/joy/ListItemAvatar';
import ListItemSecondaryAction from '@mui/joy/ListItemSecondaryAction';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import { makeStyles } from '@mui/joy/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    inline: {
        width: '100%'
    }
}));

export default function ContactNotesDialogListItem (props) {
    const { note, deleteItem } = props;
    const classes = useStyles();

    const handleDelete = (item) => {
        deleteItem(item);
    }

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={note.user.name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {note.note}
                        </Typography>
                    </>
                }
                secondary={
                    <>
                        {note.user.name}, {moment(note.createdAt).format('DD/MM/YY HH:mm')}
                    </>
                }
            />
            <ListItemSecondaryAction>
                <IconButton onClick={() => handleDelete(note)} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )   
}

ContactNotesDialogListItem.propTypes = {
    note: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired
}