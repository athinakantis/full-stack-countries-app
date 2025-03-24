import { useSearch } from '../context/SearchContext'

export const ToolBar = () => {
  const { setFilter, setSearch, search } = useSearch();

  return (
    <div id='toolbar' className='flex h-fit items-center justify-center my-auto'>
      <label htmlFor="regionFilter" className='font-lato text-sm mr-2 dark:text-slate-200'>Filter by region</label>
      <select onChange={(e) => setFilter(e.target.value)} className='rounded-full bg-white py-1 px-2 text-sm mr-4 font-lato dark:bg-slate-200' name="regionFilter" id="regionFilter">
        <option value="">All Regions</option>
        <option value="europe">Europe</option>
        <option value="africa">Africa</option>
        <option value="asia">Asia</option>
        <option value="americas">Americas</option>
        <option value="oceania">Oceania</option>
      </select>

      <label htmlFor="searchBar" className='font-lato text-sm mr-2 dark:text-slate-200'>Search</label>
      <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-white rounded-full py-1 px-2 text-sm mr-6 font-lato dark:bg-slate-200' type="text" name="searchBar" id="searchBar" />
    </div>
  )
}