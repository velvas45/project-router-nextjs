import { useEffect, useState , useContext} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const {notification,showNotification} = useContext(NotificationContext)

  useEffect(() => {
    setDataLoading(true)
    if(showComments){
      fetch('/api/comments/' + eventId)
      .then(res => res.json())
      .then(data => {
        setDataLoading(false)
        setComments(data.comments)
      })
      .catch(err => setDataLoading(false))
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Sending comments...',
      message: 'Your comment is currently being saved',
      status: 'pending'
    })

    // send data to API
    fetch('/api/comments/' + eventId,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.ok){
        return res.json()
      }

      return res.json().then(data => {
        throw new Error(data.message.name || 'Something went wrong!')
      })
    })
    .then(data => {
      showNotification({
        title: 'Success!',
        message: 'Comment has been saved!',
        status: 'success'
      })
    })
    .catch(err => {
      showNotification({
        title: 'Error!',
        message: err.message || "Something went wrong!",
        status: 'error'
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {showComments && dataLoading ? (<p>Loading ...</p>) : (<CommentList items={comments} />)}
    </section>
  );
}

export default Comments;        