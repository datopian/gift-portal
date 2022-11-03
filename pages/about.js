/* eslint-disable max-len */
import React from 'react'

function About() {
  return (
    <div id='aboutPage'>
      <article>
        <h1 className='text-4xl'>ABOUT US</h1>
        <h2 className='text-2xl pb-4 pt-8'>What is the GIFT Data Portal?</h2>
        <p>
          The GIFT Data Portal is a free, open, and comprehensive platform
          designed by the Global Initiative for Fiscal Transparency (
          <a
            href='http://www.fiscaltransparency.net/'
            target='_blank'
            rel='noopener noreferrer'
          >
            GIFT
          </a>
          ) and developed by{' '}
          <a
            href='https://www.datopian.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Datopian
          </a>
          . Governments can standardize and publish their fiscal data on this
          platform, for users to freely access through open-source formats such
          as CSV and JSON. It is an enabling tool for the{' '}
          <a
            href='https://fiscaltransparency.net/gift-principles/'
            target='_blank'
            rel='noopener noreferrer'
          >
            High-level Principles of Fiscal Transparency, Participation, and
            Accountability
          </a>
          , that highlight the importance of the right to seek and receive
          information on fiscal policies, as well as of governments publishing,
          and reporting progress against clear and measurable fiscal policy
          objectives.
        </p>
        <p>
          This tool is also useful for the analysis and better understanding of
          the Sustainable Development Goals (SDGs), including their costing. The
          SDGs have specific targets, such as those related to poverty
          eradication, inequality reduction and environmental protection.
          Governments mobilize a significant number of public resources towards
          their attainment, however, the details of this are not always
          available and/or clear. The GIFT Data Portal provides a tool for the
          publication of this detailed tagged data, data that can be used to
          better understand how governments are practically aiming to achieve
          their SDG targets.
        </p>
        <p>
          In addition, this tool is instrumental for the implementation of SDG
          16 which focuses on promoting peaceful and inclusive societies and
          building effective, accountable, and inclusive institutions. This, by
          advancing access to information in open formats which promote in depth
          evidence-based analysis of budget allocations, using efficiency,
          effectiveness, equity, and integrity considerations, as well as
          multiplying the entry points for public oversight. It also fosters
          digital innovation which in turns has a great potential to improve the
          design, implementation, and evaluation of fiscal policy.
        </p>
        <h2 className='text-2xl pb-4 pt-8'>How does it work?</h2>
        <p>
          Users can download standardized, open data that they can use to do
          their own analyses and ask further questions. This enables them to
          establish contexts and develop knowledge as a basis for evidence-based
          approaches to inform their work/activities.
        </p>
        <p>
          To do this, the tool uses{' '}
          <a href='#github' aria-describedby='footnote-label' id='github-ref'>
            GitHub
          </a>{' '}
          as an engine to operate and manage the information.
        </p>
        <p>
          Having standardized and open fiscal data is a useful foundation for
          presenting information in{' '}
          <a href='#portals' aria-describedby='footnote-label' id='portals-ref'>
            fiscal transparency portals
          </a>
          , to construct visualizations or to power up other open data
          repositories. It also greatly facilitates the provision of the data
          required for effective emergency{' '}
          <a
            href='#fiscal-response'
            aria-describedby='footnote-label'
            id='fiscal-response-ref'
          >
            fiscal responses
          </a>
          .
        </p>
        <h2 className='text-2xl pb-4 pt-8'>Who can use this information?</h2>
        <p>
          Anyone trying to understand government&rsquo;s public financial
          management:
        </p>
        <ul>
          <li>
            <strong>Officials at all levels of government</strong> (ministries
            of finance, line ministries, subnational governments) who want
            standardized information for evidence-based decision making and
            intergovernmental coordination.
          </li>
          <li>
            <strong>Legislators</strong> to explore and timely analyze the
            executive&apos;s fiscal policy, including its budget proposals,
            assisting them in undertaking their budget approval and oversight
            roles.
          </li>
          <li>
            <strong>Auditing institutions </strong>toassist them in performing
            checks related to their audit oversight function.
          </li>
          <li>
            <strong>Journalists</strong> want to know how public sector budgets
            are structured and to perform in-depth analyses.
          </li>
          <li>
            <strong>Developers or data scientists create</strong> software, apps
            or tools that organize and present the information extracted from
            the data in different forms, for example in visualizations or
            trends.
          </li>
          <li>
            {' '}
            <strong>Civil society organizations</strong> to carry out the timely
            analyses required to make effective proposals for improvements in
            the administration of resources.
          </li>
          <li>
            <strong>International development agencies</strong> to
            comprehensively understand the fiscal policy of governments, as
            expressed in their budgets.
          </li>
          <li>
            <strong>Academia and students</strong>as a basis for their analyses,
            facilitating innovative, timely, and creative research products.
          </li>
        </ul>

        <p className='pt-8 pb-8'>
          <strong>Be a Fiscal Transparency Champion!</strong>
        </p>
        <p>
          Are you a Minister of Finance representative interested in using this
          tool?
        </p>
        <p>
          Do you have creative ideas or examples on how to use the information
          disclosed?
        </p>
        <p>
          If you have great data to share and disclose, we can help you do it!
          It is free of charge!
        </p>
        <p>
          Contact us:{' '}
          <a href='mailto:info@fiscaltransparency.net'>
            info@fiscaltransparency.net
          </a>
        </p>
      </article>

      <hr />
      <footer id='aboutPageFooter'>
        <h3 className='text-xl pb-4 pt-8'>Footnotes</h3>
        <h3 className='visually-hidden' id='footnote-label'>
          Footnotes
        </h3>
        <ol>
          <li id='github'>
            <a
              href='https://github.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>{' '}
            is a code hosting platform for version control and collaboration.{' '}
            <a href='#github-ref' aria-label='Back to content'>
              ↩
            </a>
          </li>

          <li id='portals'>
            If you are interested in how to develop or update a transparency
            portal, go to our{' '}
            <a href='https://fiscaltransparency.net/tutorial-on-fiscal-transparency-portals-2/'>
              Tutorial on Budget Transparency Portals - User-Centered
              Development
            </a>
            .{' '}
            <a href='#portals-ref' aria-label='Back to content'>
              ↩
            </a>
          </li>

          <li id='fiscal-response'>
           If you are interested in Fiscal data for emergency response, go to our{' '}
            <a href='https://fiscaltransparency.net/fiscal-data-for-emergency-response-guide-for-covid-19/'>
              Fiscal Data for Emergency Response: Guide for COVID19
            </a>
            .{' '}
            <a href='#fiscal-response-ref' aria-label='Back to content'>
              ↩
            </a>
          </li>
        </ol>
      </footer>
    </div>
  )
}

export default About
