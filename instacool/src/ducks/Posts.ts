import { firestore } from 'firebase';
import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../services';
import { download } from '../utils';

const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'
const ADD = 'posts/add'

export interface IPosts {
    comment: string
    userId: string
    createdAt: firestore.Timestamp
    imageURL: string
}

export interface IDataPosts {
    [key: string]: IPosts
}

const fetchStart = () => ({
    type: START,
})

const fetchSuccess = (payload: IDataPosts) => ({
    payload,
    type: SUCCESS,
})

const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})

const add = (payload: IDataPosts) => ({
    payload,
    type: ADD,
})

const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true,
            }

        case SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false,
            }

        case ADD:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }

        case ERROR:
            return {
                ...state,
                error: action.error,
            }
    
        default:
            return state
    }
    return state
}

export const fetchPosts = () => 
    async (dispatch: Dispatch, getState: () => any, { db, storage }: IServices) => {
        dispatch(fetchStart())
        
        try {
            const snaps = await db.collection('posts').get()
            const posts = {}

            snaps.forEach(x => posts[x.id] = x.data());
            
            const imgIds = await Promise.all(
                Object.keys(posts).map(async x => {
                    const ref = storage.ref(`posts/${x}.jpg`)
                    const url = await ref.getDownloadURL()

                    return [x, url]
                })
            )
            
            const keyedImages = {}

            imgIds.forEach(x => keyedImages[x[0]] = x[1])

            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageURL: keyedImages[x],
            })

            dispatch(fetchSuccess(posts))
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error)
            dispatch(fetchError(error))
        }
    }

export const like = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (! auth.currentUser) {
            return
        }
        
        const token = await auth.currentUser.getIdToken()
        
        await fetch(`/api/posts/${id}/like`, {
            headers: {
                authorization: token
            }
        })
    }

export const share = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db, storage }: IServices) => {
        if (!auth.currentUser) {
            return
        }

        const token = await auth.currentUser.getIdToken()
        const result = await fetch(`/api/posts/${id}/share`, {
            headers: {
                authorization: token
            }
        })
        const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL()
        const blob = await download(url)
        const { id: postId }: { id: string} = await result.json()
        const ref = storage.ref(`posts/${postId}.jpg`)

        if (blob instanceof Blob) {
            // SOLUCION PARCIAL, EL IF NO DEBERIA IR
            await ref.put(blob)
            // tslint:disable-next-line: no-console
            console.log('tomo blob!!!:)')
        }

        const imageURL = await ref.getDownloadURL()
        const snap = await db.collection('posts').doc(postId).get()
        
        dispatch(add({
            ...snap.data(),
            imageURL,
        } as IDataPosts))
    }