export const Spinner = () => {
  return (
    <div id="spinner-container" className='w-fit m-auto pt-20 justify-self-center'>
      <div className='bg-blue-300 w-40 h-40 rounded-full overflow-hidden earth-spin' />
      <p className='dark:text-slate-200 font-lato italic text-center text-slate-800 mt-2'>Loading</p>
    </div>
  )
}