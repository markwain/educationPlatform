import { styles, muiStyles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { css } from 'aphrodite'
import Book from 'material-ui/svg-icons/action/book'
import Remove from 'material-ui/svg-icons/content/backspace'
import { DropDownMenu, MenuItem, List, ListItem } from 'material-ui'

import { fetchSubjects } from 'actions/subjects'
import { removeAddedCourse, addCourseToGroup } from 'actions/courses'


class InputSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rebuiltSubjects: null,
    }
  }

  @autobind
  handleInput(event, index, value) {
    const { subjectsStore, addCourseToGroup } = this.props
    addCourseToGroup(subjectsStore.data[index]._id)
  }

  @autobind
  removeAddedCourse(courseId) {
    const { removeAddedCourse, coursesStore } = this.props
    const { initiallyCreatedCourses } = coursesStore

    removeAddedCourse(courseId)
  }

  componentWillMount() {
    const { fetchSubjects } = this.props
    fetchSubjects()
  }

  componentWillReceiveProps(nextProps) {
    const subjects = nextProps.subjectsStore.data
    if(!subjects) return null
    const rebuiltSubjects = {}
    subjects.forEach(subject => { rebuiltSubjects[subject._id] = subject.name })
    this.setState({ rebuiltSubjects })
  }

  render() {
    const subjects = this.props.subjectsStore.data
    const { rebuiltSubjects } = this.state
    const { initiallyCreatedCourses } = this.props.coursesStore

    if(!subjects || !rebuiltSubjects) return (<div>Loading subjects list...</div>) // Waiting for fetch to end

    return(
      <div>
        {
          <div>
            <label htmlFor='new-group-subject'>Pick some subjects:</label><br/>
            <DropDownMenu
              maxHeight={300}
              autoWidth={true}
              value={subjects[0]._id}
              onChange={this.handleInput}
              menuStyle={muiStyles.dropDownMenu}
            >
              {
                subjects.length === initiallyCreatedCourses.length ? null :
                  subjects.map((subject, i) => {
                    let subjectAlreadyInUse = false

                    initiallyCreatedCourses.some( course => {
                      return course.subject === subject._id ? subjectAlreadyInUse = true : false
                    })

                    return(
                      <MenuItem
                        disabled={subjectAlreadyInUse}
                        className={css(styles.listItem)}
                        value={subject._id}
                        primaryText={subject.name}
                        key={i}
                      />
                    )
                  })
              }
            </DropDownMenu>
          </div>
        }
        <List className={css(styles.subjectsList)}>
          {
            initiallyCreatedCourses.map((course, i) => (
              <ListItem
                className={css(styles.listItem)}
                key={i}
                primaryText={rebuiltSubjects[course.subject]}
                leftIcon={<Book />}
                rightIcon={<Remove />}
                onTouchTap={() => {this.removeAddedCourse(course._id)}}
              />
            ))
          }
        </List>
      </div>
    )
  }
}

export default connect(store => ({
  subjectsStore: store.subjects,
  coursesStore: store.courses,
}), {
  fetchSubjects,
  addCourseToGroup,
  removeAddedCourse,
})(InputSection)
