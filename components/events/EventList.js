import EventItem from "./EventItem";

import styles from './EventList.module.css'

export default function EventList(props) {
  const { items } = props;
  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          date={event.date}
          location={event.location}
          image={event.image}
          title={event.title}
        />
      ))}
    </ul>
  );
}
