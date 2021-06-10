import EventItem from "./EventItem";

export default function EventList(props) {
  const { items } = props;
  return (
    <ul>
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
