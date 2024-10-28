import React from 'react';
import { Container, Typography } from '@mui/material';

const UserBlogPosts = ({ posts = [], userId }) => {
    // Filter posts to show only those that belong to the user
    const userPosts = posts.filter(post => post.userId === userId);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Your Blog Posts</Typography>
            {userPosts.length === 0 ? (
                <Typography variant="body1">No posts available.</Typography>
            ) : (
                userPosts.map(post => (
                    <div key={post.id} style={{ marginBottom: '20px' }}>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body1">{post.content}</Typography>
                    </div>
                ))
            )}
        </Container>
    );
};

export default UserBlogPosts;
