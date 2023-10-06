import { useState } from "react"
import { Pagination } from "./component/pagination"
import { useAdmins } from "./hooks/useAdmin"
import usePagination from "./hooks/usePagination"
// import { Admin } from "./types/admin"

const App = () => {
  // const [current, setCurrent] = useState<Admin[]>([])
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const PER_PAGE = 10
  const { admins, deleteFromList } = useAdmins()
  const { currentData, maxPage, currentPage, jump, } = usePagination(admins, PER_PAGE, query)
  const onCheckBoxChange = (a: true | false, id: string) => {
    const ab = a ? [...selected, id] : selected.filter(a => a != id)
    setSelected(ab)

  }
  const isExist = (a: string[], i: string) => {
    return a.includes(i)
  }
  const onCheckBoxBulkChange = (a: true | false, ids: string[]) => {
    if (a) {
      const ab = [...selected, ...ids]
      setSelected(ab)
    } else {
      // const items =
      const ab = selected.filter(i => isExist(ids, i) === false)
      setSelected(ab)
    }

  }

  return <>
    <div className="admins-data-wrapper">
      <div className="search-filter">
        <input className="search-input" placeholder="Search " onKeyUp={(e) => {
          // console.log(e.currentTarget.value)
          setQuery(e.currentTarget.value)
        }} />
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <input type="checkbox" onChange={e => onCheckBoxBulkChange(e.target.checked, currentData.map(a => a.id))} />
            </td>
            <td>
              <p>Name</p>
            </td>
            <td>
              <p>Email</p>
            </td>
            <td>
              <p>Role</p>
            </td>
            <td>
              <p>Actions</p>
            </td>
          </tr>
        </thead>
        <tbody>
          {currentData.map((a, index) => <tr key={index}>

            <td>
              <input type="checkbox" checked={selected.find(b => b === a.id) !== undefined} onChange={e => {
                onCheckBoxChange(e.target.checked, a.id)
              }} />
            </td>
            <td><p>{a.name}</p></td>
            <td><p>{a.email}</p></td>
            <td><p>{a.role}</p></td>
            <td>actions</td>
          </tr>)}
        </tbody>
      </table>
      <div className="footer">
        <div className="delete-button">
          <button disabled={selected.length < 1} onClick={() => {
            deleteFromList(selected)
            setSelected([])
          }}>Delete selected</button>
        </div>
        <Pagination onPaginationClick={(a) => jump(a)} total={maxPage} current={currentPage} />
      </div>
    </div>


  </>
}
export default App