import React from "react";

const titleCategories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
]

type CategoriesProps = {
  activeCategory: number,
  onChangeCategories: (index: number)=>void,
};

const Categories:React.FC<CategoriesProps> = React.memo(({onChangeCategories, activeCategory})=>{  
      return(
        <div className="categories">
        <ul>
          {
          titleCategories.map((name, index)=>(
          <li key = {index} onClick = {()=>onChangeCategories(index)} className = {activeCategory == index ? "active" : ""}>{name}</li>
          ))
          }          
          
        </ul>
      </div>
    )
})

export default Categories;