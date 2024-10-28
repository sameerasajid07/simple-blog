import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Ensure this is your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';
import { Card, CardContent, Typography } from '@mui/material';

const PublicBlogView = () => {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const q = collection(db, 'blogPosts');
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({ id: doc.id, ...doc.data() });
            });
            setAllPosts(postsArray);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <div>
            {allPosts.map((post) => (
                <Card key={post.id} sx={{ margin: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{post.title}</Typography>
                        <Typography variant="body2">{post.content}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PublicBlogView;
