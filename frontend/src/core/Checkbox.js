import React,{useEffect,useState} from 'react';


const Checkbox=({categories,handleFilters})=>{
    const[checked,setChecked]=useState([])

    const handleToggle=c=>()=>{
        const currentCategoryId=checked.indexOf(c)
        const newCheckedCategoryId=[...checked]
        if(currentCategoryId===-1){
            newCheckedCategoryId.push(c)
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        //console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    return categories.map((c,i)=>(
        <li className='list-unstyled' key={i}>
            <input type='checkbox' className='form-check-input' onChange={handleToggle(c._id)}value={checked.indexOf(c._id===-1)}/>
            <label className='form-check-label'>{c.name}</label>
        </li>
    ))
}

export default Checkbox;