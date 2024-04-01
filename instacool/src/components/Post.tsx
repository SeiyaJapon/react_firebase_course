import * as React from 'react';

import Footer from '../components/Footer';

const style = {
    backgroundColor: '#FFF',
    border: '1px solid #DDD',
    marginBottom: '10px',
    padding: '10px 15px'
}

interface IPostProps {
    image: string
    like: () =>  void
    share: () => void
}

export default class Post extends React.Component<IPostProps> {
    public render() {
        const { image, like, share } = this.props

        return (
            <div style={style}>
                <img style={{ width: '300px' }} src={image} />
                <Footer like={like} share={share} />
            </div>
        )
    }
}