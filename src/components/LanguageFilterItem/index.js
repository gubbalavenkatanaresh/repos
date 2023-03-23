// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {selectedLanguageId, filterItem, getSelectedId} = props
  const {id, language} = filterItem
  const btnClassName = selectedLanguageId === id ? 'btn select-btn' : 'btn'
  const clickLanguage = () => {
    getSelectedId(id)
  }

  return (
    <li>
      <button type="button" className={btnClassName} onClick={clickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
