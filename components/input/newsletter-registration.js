import classes from './newsletter-registration.module.css';
import {useRef, useContext} from 'react'
import NotificationContext from '../../store/notification-context'

function NewsletterRegistration() {
  const emailRef = useRef()
  const {showNotification} = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();
    
    // fetch user input (state or refs)
    const email = emailRef.current.value

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    })
    
    const reqBody = {
      email 
    }
    // optional: validate input
    if(!email) return false
    // send valid data to API
    fetch('./api/newsletter',{
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }

      return res.json().then(data => {
        console.log(data)
        throw new Error(data.message || 'Something went wrong!')
      })
    })
    .then(data => {
      showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;