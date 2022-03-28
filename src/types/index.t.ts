export type PostsDataInterface = {
    title: string,
    url: string,
    created_at: Date,
    author: string
}

export type PostArrayType = PostsDataInterface[];

export type PostContextType = {
    postsInfo: PostArrayType;
    loading: boolean;
    pageCount: number;
    postsInfoLength: number;
    handlePageChange: (e: unknown, selectedPage: number) => void;
    currentPage: number;
};