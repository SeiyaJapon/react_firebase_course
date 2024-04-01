import { chunk } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submit } from 'redux-form'
import { ThunkDispatch } from 'redux-thunk'
import { IState } from 'src/ducks'

import Button from '../../components/Button'
import Card from '../../components/Card'
import ProfileImg from '../../components/ProfileImg'
import * as postsDuck from '../../ducks/Posts'
import * as usersDuck from '../../ducks/Users'
import services from '../../services'           

const { auth } = services

const style = {
    container: {
        padding: '15px',
    },
    img: {
        width: '30vw'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    }
}

interface IProfileProps {
    submitProfileImg: () => void
    fetchPosts: () => void
    handleProfileImageSubmit: (a: { file: File }) => void
    fetched: boolean
    loading: boolean
    profileImage: string
    data: postsDuck.IPosts[][]
}

class Profile extends React.Component<IProfileProps> {
    constructor(props: IProfileProps) {
        super(props)

        const { fetchPosts, fetched } = props

        if (fetched) {
            return
        }

        fetchPosts()
    }

    public render() {
        const { data, submitProfileImg, handleProfileImageSubmit, profileImage } = this.props
        return (
            <div style={style.container}>
                <div style={style.row}>
                    <ProfileImg
                         profileImage={profileImage}
                        onSubmit={handleProfileImageSubmit}
                        submitProfileImg={submitProfileImg}
                    />
                    <Button>Agregar</Button>
                </div>
                {data.map((x, i) => 
                <div key={i} style={style.row}>
                    {x.map(y => 
                        <Card key={y.imageURL}>
                            <img style={style.img} src={y.imageURL} />
                        </Card>
                    )}
                </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    const { Posts: { data, fetched, fetching } } = state
    const { Users: { profileImage: tempPI } } = state
    const loading = fetching || !fetched
    const profileImage = tempPI || 'http://placekitten.com/100/100'
    const filtered = Object.keys(data).reduce((accumulator, element) => {
        if (data[element].userId !== (auth.currentUser && auth.currentUser.uid)) {
            return accumulator
        }

        return accumulator.concat(data[element])
    }, [] as postsDuck.IPosts[])

    return {
        data: chunk(filtered, 3),
        fetched,
        loading,
        profileImage,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators({
    ...postsDuck,
    ...usersDuck,
    submitProfileImg: () => submit('profileImg')
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile)