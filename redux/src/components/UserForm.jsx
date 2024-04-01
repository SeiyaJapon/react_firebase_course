import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import CustomInput from './CustomInput';

const validate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = 'Campo obligaotorio'
    }


    if (!values.lastname) {
        errors.lastname = 'Campo obligaotorio'
    }

    return errors
}

class UserForm extends Component {
    render() {
        const { handleSubmit } = this.props
        console.log(this.props)
        return (
            <form onSubmit={handleSubmit}>
                <Field name="name" component={CustomInput} placeholder="Nomber" title="Nombre"/>
                <Field name="lastname" component={CustomInput} placeholder="Apellido" title="Apellido"/>
                <input type="submit" value="Enviar" />
            </form>
        )
    }
}

export default reduxForm({
    form: 'user', // nombre del formulario y tiene que se único
    validate,
})(UserForm)