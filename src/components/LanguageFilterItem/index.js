// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {showTab, details, isActive} = props
  const {language, id} = details

  const onClickTab = () => {
    console.log('btn clicked==========')
    showTab(id)
  }
  const activeTabClassName = isActive ? 'active-tab' : ''
  console.log(activeTabClassName)
  return (
    <li className="tab-item">
      <button
        type="button"
        // className={`tab-btn ${activeTabClassName}`}
        className={`tab-btn ${activeTabClassName}`}
        onClick={onClickTab}
      >
        {language}
        {/* <p className="tab-name">{language}</p> */}
      </button>
    </li>
  )
}

export default LanguageFilterItem
