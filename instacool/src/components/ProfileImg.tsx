import * as React from 'react'
import { Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form'

const style = {
    file: {
        display: 'none',
    },
    img: {
        borderRadius: '100%',
        height: '100px',
        width: '100px',
    },
}

const handleChange = (submitProfileImg: () => void, input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    
    const { onChange } = input
    const { files } = e.target

    if (files) {
        await onChange(files[0])
        submitProfileImg()
    }
}

interface IProfileImg {
    submitProfileImg: () => void
    profileImage: string
}

// En el tutorial ponía que teníamos que usar StatelessComponent, pero esta deprecated
// y el IDE indica que se debe de sustituir por FunctionComponent:
    // const RenderField: React.StatelessComponent<WrappedFieldProps> = ({ input }) => 
const RenderField: React.FunctionComponent<WrappedFieldProps & IProfileImg> = ({ input, submitProfileImg, profileImage }) => 
    <div>
        <input onChange={handleChange(submitProfileImg, input)} style={style.file} type='file' id='profileImage' />
        <label htmlFor="profileImage">
            <img style={style.img} src={profileImage} />
        </label>
    </div>

class ProfileImg extends React.Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
    public render() {
        const { handleSubmit, submitProfileImg, profileImage } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name='profileImg'
                    profileImage={profileImage}
                    component={RenderField}
                    submitProfileImg={submitProfileImg}
                />
            </form>
        )
    }
}

export default reduxForm<{}, IProfileImg>({
    form: 'profileImg'
})(ProfileImg)