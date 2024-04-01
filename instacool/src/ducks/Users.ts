import { AnyAction, Dispatch } from 'redux'
import { IServices } from '../services'
import { IState } from './index'

export interface ILogin {
    email: string
    password: string
}

const SET_PROFILE_IMAGE = 'users/set-profile-image'

export const setProfileImage = (payload: string) => ({
    payload,
    type: SET_PROFILE_IMAGE,
})

export default function reducer(state = {}, action: AnyAction) {
    switch (action.type) {
        case SET_PROFILE_IMAGE: {
            return {
                ...state,
                profileImage: action.payload
            }
        }
    
        default:
            return state
    }
}

export const login = ({ email, password }: ILogin) =>
    async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) => {
        await auth.signInWithEmailAndPassword(email, password)
    }

export const register = ({ email, password }: ILogin) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, db }: IServices) => {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password)
        // tslint:disable-next-line: no-console
        console.log(userCredential)
        const { user } = userCredential
        const id = user ? user.uid : undefined
        const doc = db.collection('users').doc(id)
        
        await doc.set({ role: 'user' })
    }

export const loadUserInitialData = () => 
    async (dispatch: Dispatch, getState: () => IState, { storage, auth}: IServices) => {
        if (! auth.currentUser) {
            return
        }

        const storageRef = storage.ref()
        const { uid } = auth.currentUser
        const imageRef = storageRef
                            .child(`profileImages`)
                            .child(`${uid}.jpg`)

        const url = await imageRef.getDownloadURL()

        dispatch(setProfileImage(url))
    }

export const handleProfileImageSubmit = (payload: { file: File }) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, storage }: IServices) => {
        if (!auth.currentUser) {
            return
        }

        const storageRef = storage.ref()

        const response = await storageRef
            .child(`profileImages`)
            .child(`${auth.currentUser.uid}.jpg`)
            .put(payload.file).then(() => {
                // tslint:disable-next-line: no-console
                console.log(payload.file)
            })

        const url = await response.ref.getDownloadURL()

        dispatch(setProfileImage(url))
    }