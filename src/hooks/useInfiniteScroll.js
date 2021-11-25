import {useState, useEffect} from 'react';
import {STORY_INCIDENT, MAX_STORIES} from '../constants/index';
import { debounce } from '../utils/debounce';

export const useInfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(STORY_INCIDENT);

    const handleScroll = debounce(() => {
       if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading){
          return false;
       }

       setLoading(true);
    }, 500);

   useState(()=> {
          if(!loading){return;}

          if(count + STORY_INCIDENT >= MAX_STORIES){
              setCount(MAX_STORIES);
          }else{
           setCount(count + STORY_INCIDENT);
          }

          setLoading(false);
   }, [loading]);


   useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
   }, []);
 
   return {count};
};

