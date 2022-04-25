import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';


const AddQuizDialogue = (props: any) => {

    const [name, setName] = useState<string>('')

    const handleClose = () => {
        props.handleClose()
    };

    const addQuiz = () => {
        props.addQuiz({ name }, props.state)
        setName('')
        handleClose()
    }


    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    return (
        <Dialog open={props.openModal} onClose={handleClose}>
            <DialogTitle>{props.state} Quiz</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    value={name}
                    onChange={handleName}
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    autoComplete="subject"
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addQuiz}>Add Quiz</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuizDialogue;