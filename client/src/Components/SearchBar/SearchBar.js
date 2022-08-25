

const SearchBar = ({ action, searchValue }) => {
    return (
        <div className="col-12 d-flex">

            <div className='col-12'>
            <input className="rounded border py-1 px-2 col-12 " placeholder='Search' value={searchValue} onChange={action}></input>

            </div>

            {/* <div className='d-flex col-4'>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label class="form-check-label ms-2" for="flexCheckDefault">
                Fly to
                </label>
            </div> */}


        </div>
    )
}

export default SearchBar