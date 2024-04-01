import * as React from 'react';

const style = {
    backgroundColor: '#FFF',
    border: '1px solid #DDD',
    padding: '10px 15px',
}

export default class Card extends React.Component {
    public render() {
        const { children } = this.props
        
        return (
            <div style={style}>
                {children}
            </div>
        )
    }
}