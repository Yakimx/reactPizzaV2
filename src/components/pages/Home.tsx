import React from 'react';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from "../Categories";
import Sort, { listPopUp } from "../Sort";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import SkeletonPizza from "../PizzaBlock/SkeletonPizza";
import Pagination from "../Pagination/Pagination";

import { useSelector } from 'react-redux';
import { selectFilter, setCurrentPage, setFilters, setActiveCategory } from '../../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../../redux/slices/pizzasSlice';
import { useAppDispatch } from '../../redux/store';



const Home: React.FC = () => {   

  import("../../utils/math").then(math => {
    console.log(math.add(16, 26));
  });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const {items, status} = useSelector(selectPizzaData);  
    const {activeCategory, activeSort, currentPage, searchValue} = useSelector(selectFilter);
       
  const onChangePage = (num:number)=>{
    dispatch(setCurrentPage(num))
  };

  const onChangeCategories = React.useCallback( (i:number)=>{
    dispatch(setActiveCategory(i));
  },[]);

  const getPizzas = async ()=>{
    const sortBy = activeSort.sortProperty.replace('-','');      
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';      
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';  
      
      dispatch(        
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }));    
  };

    React.useEffect(()=>{
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;        
        const activeSort = listPopUp.find( obj => obj.sortProperty == params.sortBy); 
        
        dispatch(setFilters({
        searchValue: params.search,
        activeCategory: Number(params.category),
        currentPage: Number(params.currentPage),
        activeSort: activeSort || listPopUp[0],
        }));
        isSearch.current = true;
      }      
      isMounted.current = true;
    },[]);

    React.useEffect(() => {      
      getPizzas();     
      isSearch.current = false;
      window.scrollTo(0,0);
    }, [activeCategory, activeSort, searchValue, currentPage]);


    React.useEffect(()=>{
      if(isMounted.current){
        const queryString = qs.stringify({
          sortProperty: activeSort.sortProperty,
          activeCategory,
          currentPage,
        })
        
        navigate(`?${queryString}`);
      }
      
      if (!window.location.search){
        dispatch(fetchPizzas({} as SearchPizzaParams))
      }

      
    },[activeCategory, activeSort, searchValue, currentPage]);
    
    const pizzas = items.map((obj: any) =>    
    <PizzaBlock key={obj.id} {...obj} />
    );
    const skeletons = [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />);

  return (
    <div> 
 <div className="content__top">
            <Categories  onChangeCategories={onChangeCategories} activeCategory={activeCategory}/>
            <Sort value={activeSort}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {status == 'error' 
          ? (<div className='content__error-info'>
            <h2>Ошибка 😭</h2>
            <p>
            Не удалось загрузить пиццы(((
            </p>
          </div>)      
          :(<div className="content__items">
            {status == 'loading' ? skeletons : pizzas}
          </div>)}
<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
          

    </div>
  )
}

export default Home