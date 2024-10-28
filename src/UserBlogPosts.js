import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { List, ListItem, ListItemText, Button, Typography, Container, CircularProgress, Snackbar } from '@mui/material';

const UserBlogPosts = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'blogPosts'), where('userId', '==', user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsArray);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching posts: ", error);
            setSnackbarMessage('Error fetching posts: ' + error.message);
            setSnackbarOpen(true);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleDelete = async (postId) => {
        try {
            await deleteDoc(doc(db, 'blogPosts', postId));
            setSnackbarMessage('Post deleted successfully!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting document: ", error);
            setSnackbarMessage('Error deleting post: ' + error.message);
            setSnackbarOpen(true);
        }
    };

    return (
        <Container sx={{ marginTop: 4, backgroundColor: '#f9f9f9', padding: 4, borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom>Your Blog Posts</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <ListItem key={post.id}>
                                <ListItemText primary={post.title} secondary={post.content} />
                                <Button onClick={() => handleDelete(post.id)} color="secondary">Delete</Button>
                                <Button onClick={() => { /* Call your edit function here */ }} color="primary">Edit</Button>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No blog posts available.</Typography>
                    )}
                </List>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default UserBlogPosts;

