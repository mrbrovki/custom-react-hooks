import { useEffect, useReducer} from "react";

interface State<T>{
  data?: T;
  error?: Error
};

type Action<T> = 
  | {type: 'FETCHING'}
  | {type: 'FETCHED', value: T}
  | {type: 'ERROR', value: Error};

const useFetch = <T = unknown> (url?:string) => {
  const initState: State<T> = {data: undefined, error: undefined};

  const reducer = (state: State<T>, action: Action<T>): State<T> =>{
    switch(action.type){
      case 'FETCHING':
        return state
      case "FETCHED":
        return {...state, data: action.value}
      case 'ERROR':
        return {...state, error: action.value};
      default:
        return state
    }
  };
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    if(!url) return;

    const fetchData = async () =>{
      dispatch({type: 'FETCHING'});
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const data = <T>(await response.json());
        dispatch({type: 'FETCHED', value: data});
      }catch(error){
        dispatch({type: 'ERROR', value: error as Error});
      }
    }
    fetchData();
  }, [url]);
  return state
}


export default useFetch;