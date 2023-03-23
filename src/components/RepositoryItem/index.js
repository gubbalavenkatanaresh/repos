// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repositoryItem
  return (
    <li>
      <div className="repository-container">
        <img src={avatarUrl} alt={name} className="image" />
        <h1 className="heading">{name}</h1>
        <div className="information">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="information">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="information">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
