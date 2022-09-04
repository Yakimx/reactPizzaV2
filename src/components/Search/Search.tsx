import React from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import searchSvg from '../../assets/img/search.svg'
import closeSvg from '../../assets/img/close.svg'

import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'


const Search: React.FC = () => {

  const dispatch = useDispatch();  
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
   
  

  const onClickClear = ()=>{
    dispatch(setSearchValue(''));
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  const updateSearchValue = React.useCallback(
    debounce((str)=>{
      dispatch(setSearchValue(str));
      }, 250),
      [],
  );

  return (
    <div className={styles.root}>
        <img className = {styles.search} src={searchSvg}></img> 
        <input 
        ref={inputRef}
        placeholder='Поиск пиццы...'
        className={styles.input} 
        value={value}
        onChange={(e)=>onChangeInput(e)}  />
        {value && <img onClick={()=>onClickClear()} className = {styles.close} src={closeSvg}></img>}
    </div>
  )
}

export default Search

