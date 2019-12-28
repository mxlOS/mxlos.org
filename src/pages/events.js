import React from "react"
import { Link, graphql } from "gatsby"

import SiteInfo from "../components/siteInfo"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Events = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const events = data.allMeetupEvent.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All Events"
        keywords={[`blog`, `gatsby`, `javascript`, `react`, `opensource`, `mexicali`, `mexico`]}
      />
      <SiteInfo />
      <h2>Eventos:</h2>
      {events.map(({ node }) => {
        return (
          <div key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={`event/${node.local_date}`}>
                {node.fields.name}
              </Link>
            </h3>
            <small>{node.local_date}</small>
          </div>
        )
      })}
    </Layout>
  )
}

export default Events

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    # Meetup Events
    allMeetupEvent(filter: {name: {ne: "Reunión Mensual"}}, limit:100) {
      edges {
        node {
          id
          name
          local_date
          local_time
          description
          link
          fields {
            name
          }
          venue {
            id
            name
          }
        }
      }
    }
  }
`
