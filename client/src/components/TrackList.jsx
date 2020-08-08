import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'

const TrackList = props => {
  return (
    <div id='trackList'>
      <Container>
        <Row xl={10} lg={5} sm={2} xs={2}>
          {props.recs.tracks &&
            props.recs.tracks.map(t => (
              <Col key={t.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{t.name}</Card.Title>
                    {t.artists.map(a => (
                      <Card.Subtitle key={a.id}>{a.name}</Card.Subtitle>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      {console.log(props.recs.tracks)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    recs: state.recs,
  }
}

export default connect(mapStateToProps)(TrackList)
