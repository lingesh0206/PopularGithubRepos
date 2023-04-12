import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    showTabId: languageFiltersData[0].id,
    theDataList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguages()
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getLanguages = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {showTabId} = this.state
    console.log('changeg============', showTabId)
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${showTabId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedArray = data.popular_repos.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        theDataList: updatedArray,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  showTab = id => {
    console.log('btn clicked==========idd', id)
    this.setState({showTabId: id}, this.getLanguages)
  }

  renderItemsInTab = () => {
    const {theDataList} = this.state
    return (
      <ul className="items-container">
        {theDataList.map(eachCard => (
          <RepositoryItem key={eachCard.id} details={eachCard} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-img"
      />
    </div>
  )

  render() {
    const {showTabId, apiStatus} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="tab-container">
          {languageFiltersData.map(eachFilter => (
            <LanguageFilterItem
              key={eachFilter.id}
              showTab={this.showTab}
              details={eachFilter}
              isActive={eachFilter.id === showTabId}
            />
          ))}
        </ul>

        {apiStatus === apiStatusConstants.success && this.renderItemsInTab()}
        {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
        {apiStatus === apiStatusConstants.inProgress && this.renderLoading()}
      </div>
    )
  }
}
export default GithubPopularRepos
