// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details
  return (
    <li className="card-item">
      <img src={avatarUrl} className="card-img" alt={name} />
      <h1 className="item-name">{name}</h1>
      <div className="details-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon-size"
          alt="stars"
        />
        <p className="content">{starsCount} stars</p>
      </div>
      <div className="details-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon-size"
          alt="forks"
        />
        <p className="content">{forksCount} forks</p>
      </div>
      <div className="details-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon-size"
          alt="open issues"
        />
        <p className="content">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
