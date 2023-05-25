import { useState } from "react"



const useForm = ({ initialState, onSubmit }) => {
   const [state, setState] = useState({
      ...initialState,
   });

   const handleChange = ({ target }) => {
      const { value, name } = target;
      setState(prevState => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSubmit = e => {
      e.preventDefault();
      onSubmit({ ...state });
      reset();
   };

   const reset = () => {
      setState({
         search: '',
      });
   };

   return { state, setState, handleChange, handleSubmit }
}

export default useForm