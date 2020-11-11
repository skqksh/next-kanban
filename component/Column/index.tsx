import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'

import Issue from '../Card'
import IssueModel from '../../model/IssueModel'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const IssueList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`

const InnerList = React.memo(
  ({ issueList }: { issueList: IssueModel[] }): JSX.Element => {
    return (
      <>
        {_.map(issueList, (issue, index) => (
          <Issue key={issue.id} issue={issue} index={index} />
        ))}
      </>
    )
  },
  (prevProps, nextProps) => nextProps.issueList === prevProps.issueList
)

const Column = ({ column, issueList, index }): JSX.Element => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="issue">
            {(provided, snapshot) => (
              <IssueList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList issueList={issueList} />
                {provided.placeholder}
              </IssueList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column
