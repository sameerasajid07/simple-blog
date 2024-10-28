import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import UserBlogPosts from './UserBlogPosts'; // Adjust the import path as necessary

const BlogContainer = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'blogPosts'));
            const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(postsData);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <UserBlogPosts posts={posts} userId={userId} />
        </div>
    );
};

export default BlogContainer;
