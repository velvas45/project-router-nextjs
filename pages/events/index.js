import { Fragment } from "react";
import {useRouter} from 'next/router'
import Head from 'next/head'

import { getAllEvents } from "../../helpers/api-util";
import EventSearch from "../../components/events/EventSearch";
import EventList from './../../components/events/EventList'

function AllEventsPage({events}) {
  const router = useRouter();

  function findEventHandler(year,month){
    const fullPath = `/events/${year}/${month}`


    router.push(fullPath);
  }


  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..."/>
      </Head>
      <EventSearch onSearch={findEventHandler}/>
      <EventList items={events}/>
    </Fragment>
  );
}

export async function getStaticProps(){
  const events = await getAllEvents()

  return {
    props: {
      events
    },
    revalidate: 60
  }
}
export default AllEventsPage;
    