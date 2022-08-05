import {AiOutlineSearch} from 'react-icons/ai'

const SearchBar = ({action, searchValue}) => {
    return(
        <div className="col-12">
           <input className="rounded border py-1 px-2 col-12" placeholder='Search' value={searchValue} onChange={action}></input>
        </div>
    )
}

export default SearchBar