import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PostContextType, PostsDataInterface } from '../types/index.t';

const PostContext = createContext<PostContextType>({
    postsInfo: [],
    loading: false,
    pageCount: 0,
    postsInfoLength: 0,
    handlePageChange: () => {},
    currentPage: 1,
})

export const usePost = () => useContext(PostContext);

const PostProvider = ({children} : {children: React.ReactChild | React.ReactChild[]}) => {

    const [postsInfo, setPostsInfo] = useState<PostsDataInterface[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [postsInfoLength, setPostsInfoLength] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setPageCount(_pageCount => _pageCount + 1)
        }, 10000)

        return () => clearInterval(interval);
    }, [pageCount])

    useEffect(() => {
        const getPostsInfo = async () => {
            try{
                setLoading(true);
    
                return await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`)
                .then(response => {
    
                    const getPostData = response.data;
    
                    const _postsInfo = [...postsInfo, ...getPostData.hits];
    
                    setPostsInfo(_postsInfo);
                    setPostsInfoLength(_postsInfo.length);
                    setLoading(false);
                })
            }
            catch(error) {
                setLoading(false);
            }
        }

        getPostsInfo();
    }, [pageCount]);

    useEffect(() => {
        return () => {
            setPostsInfo(postsInfo);
        };
    }, [])

    const handlePageChange = async (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    }

    const contextValue = {
        postsInfo,
        loading,
        pageCount,
        postsInfoLength,
        handlePageChange,
        currentPage,
    };

    return (
        <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
    );
};

export default PostProvider;