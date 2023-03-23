import Loader from 'react-loader-spinner'
import {Component} from 'react'
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
const result = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    selectedLanguageId: languageFiltersData[0].id,
    presentResult: '',
    presentData: {},
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {selectedLanguageId} = this.state
    this.setState({presentResult: result.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedLanguageId}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    console.log(response)
    if (response.status === 200) {
      this.setState({presentData: updatedData, presentResult: result.success})
    } else {
      this.setState({presentResult: result.failure})
    }
  }

  getSelectedId = selectedLanguageId => {
    this.setState({selectedLanguageId}, this.getData)
  }

  getPresentData = () => {
    const {presentResult, presentData} = this.state
    switch (presentResult) {
      case result.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case result.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="failure-img"
            />
            <p className="failure-text">Something Went Wrong</p>
          </div>
        )
      case result.success:
        return (
          <ul className="repository-list">
            {presentData.map(eachItem => (
              <RepositoryItem repositoryItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const {selectedLanguageId} = this.state
    return (
      <div className="container">
        <h1 className="main-heading">popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              filterItem={eachItem}
              key={eachItem.id}
              selectedLanguageId={selectedLanguageId}
              getSelectedId={this.getSelectedId}
            />
          ))}
        </ul>
        {this.getPresentData()}
      </div>
    )
  }
}

export default GithubPopularRepos
