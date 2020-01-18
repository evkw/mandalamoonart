import { useState } from 'react';

export const useLoginForm = (callback) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.id]: event.target.value}));
      }

    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}

export default useLoginForm;