// BlogDetailModal.js
import React from 'react';
import { Modal, Typography, Button, Container } from '@mui/material';

const BlogDetailModal = ({ open, handleClose, post }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="blog-detail-modal-title"
            aria-describedby="blog-detail-modal-description"
        >
            <Container style={{ marginTop: '100px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <Typography id="blog-detail-modal-title" variant="h5" component="h2">
                    {post?.title}
                </Typography>
                <Typography id="blog-detail-modal-description" variant="body1" style={{ marginTop: '10px' }}>
                    {post?.content}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleClose} style={{ marginTop: '20px' }}>
                    Close
                </Button>
            </Container>
        </Modal>
    );
};

export default BlogDetailModal;

